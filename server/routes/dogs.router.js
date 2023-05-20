const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to retrieve dogs
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "dogs" ORDER BY "id" ASC;`;
  pool.query(queryText).then(result => {
    res.send(result.rows)
  })
  .catch(error => {
    console.log(`Error is GET all dogs, ${error}`)
    res.sendStatus(500);
  })
});


//POST route to create a new dog
router.post('/', (req, res) => {
  console.log(req.user.id)
  const newDog = req.body;
  const queryText = `INSERT INTO "dogs" ("user_id", "notes", "breed", "weight", "birthday", "gender")
                    VALUES ($1, $2, $3, $4, $5, $6)`;
  const queryValues = [
    req.user.id,
    newDog.notes,
    newDog.breed,
    newDog.weight,
    newDog.birthday,
    newDog.gender
  ];
  pool.query(queryText, queryValues)
  .then(() => {res.sendStatus(201) })
  .catch((error) => {
    console.log(`Error adding new dog in router`, error);
    res.sendStatus(500);
  });
});


module.exports = router;

