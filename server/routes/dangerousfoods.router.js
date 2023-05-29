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

module.exports = router;