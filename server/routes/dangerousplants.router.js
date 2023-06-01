const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for retrieving all dangerous plants
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "dangerous_plants"`;
    pool
      .query(queryText)
      .then((result) => {
        console.log('Query result for dangerous plants:', result.rows);
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('Error retrieving dangerous plants:', error);
        res.sendStatus(500);
      });
  });
  
  // GET route for retrieving a specific dangerous plant by ID
  router.get('/:id', (req, res) => {
    const plantId = req.params.id;
    const queryText = 'SELECT * FROM dangerous_plants WHERE id = $1';
    pool
      .query(queryText, [plantId])
      .then((result) => {
        console.log('Query result for dangerous plant:', result.rows[0]);
        res.send(result.rows[0]);
      })
      .catch((error) => {
        console.log('Error retrieving dangerous plant:', error);
        res.sendStatus(500);
      });
  });

  router.post('/', (req, res) => {
    const { name, details, symptoms } = req.body;
    const queryText = `INSERT INTO "dangerous_plants" ("name", "details", "symptoms") 
                       VALUES ($1, $2, $3);`
    const values = [name, details, symptoms];
    pool
    .query(queryText, values)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error adding dangerous plant:', error);
      res.sendStatus(500);
    });
})

router.delete('/:id', (req, res) => {
    const plantId = req.params.id;
  
    const query = 'DELETE FROM "dangerous_plants" WHERE "id" = $1';
    const values = [plantId];
  
    pool.query(query, values)
      .then(() => {
        res.sendStatus(204); // Send a 204 No Content response if successful
      })
      .catch((error) => {
        console.log(`Error in DELETE /dangerousfoods/${plantId}:`, error);
        res.sendStatus(500);
      });
  });



module.exports = router;