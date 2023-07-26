const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for retrieving all dangerous foods
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "dangerous_foods"`;
  pool
    .query(queryText)
    .then((result) => {
      console.log('Query result for dangerous foods:', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error retrieving dangerous foods:', error);
      res.sendStatus(500);
    });
});

// GET route for retrieving a specific dangerous food by ID
router.get('/:id', (req, res) => {
  const foodId = req.params.id;
  const queryText = 'SELECT * FROM dangerous_foods WHERE id = $1';
  pool
    .query(queryText, [foodId])
    .then((result) => {
      console.log('Query result for dangerous food:', result.rows[0]);
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log('Error retrieving dangerous food:', error);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    const { name, details, symptoms } = req.body;
    const queryText = `INSERT INTO "dangerous_foods" ("name", "details", "symptoms") 
                       VALUES ($1, $2, $3);`
    const values = [name, details, symptoms];
    pool
    .query(queryText, values)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error adding dangerous food:', error);
      res.sendStatus(500);
    });
})

router.delete('/:id', (req, res) => {
    const foodId = req.params.id;
  
    const query = 'DELETE FROM "dangerous_foods" WHERE "id" = $1';
    const values = [foodId];
  
    pool.query(query, values)
      .then(() => {
        res.sendStatus(204); // Send a 204 No Content response if successful
      })
      .catch((error) => {
        console.log(`Error in DELETE /dangerousfoods/${foodId}:`, error);
        res.sendStatus(500);
      });
  });

module.exports = router;