const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET route to retrieve dogs
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "dogs" ORDER BY "id" ASC;`;
  pool.query(queryText).then(result => {
    console.log('Query result:', result.rows);
    res.send(result.rows)
  })
  .catch(error => {
    console.log(`Error is GET all dogs, ${error}`)
    res.sendStatus(500);
  })
});


// GET route to fetch a single dog by ID
router.get('/:id', (req, res) => {
  const dogId = req.params.id;
  const queryText = 'SELECT * FROM dogs WHERE id = $1';
  pool.query(queryText, [dogId])
    .then((result) => {
      console.log(result.rows[0]);
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log('Error fetching dog', error);
      res.sendStatus(500);
    });
});



//POST route to create a new dog
router.post('/', (req, res) => {
  const newDog = req.body;
  console.log('newDog.birthday', newDog.birthday)
  const queryText = `INSERT INTO "dogs" ("user_id", "name", "notes", "breed", "weight", "birthday", "gender")
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "id"`;
  // const queryValues = 
  pool.query(queryText, [
    req.user.id,
    newDog.name,
    newDog.notes,
    newDog.breed,
    newDog.weight,
    newDog.birthday,
    newDog.gender
  ])
  .then(() => {
    console.log('New dog added successfully')
    res.sendStatus(201) })
  .catch((error) => {
    console.log(`Error adding new dog in router`, error);
    res.sendStatus(500);
  });
});


router.delete('/:id', (req, res) => {
  const dogId = req.params.id;

  const query = 'DELETE FROM "dogs" WHERE "id" = $1';
  const values = [dogId];

  pool.query(query, values)
    .then(() => {
      res.sendStatus(204); // Send a 204 No Content response if successful
    })
    .catch((error) => {
      console.log(`Error in DELETE /dogs/${dogId}:`, error);
      res.sendStatus(500);
    });
});


module.exports = router;

