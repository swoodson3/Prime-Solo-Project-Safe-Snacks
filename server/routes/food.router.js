const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to retrieve food options
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "food" ORDER BY "id" ASC;`;
    pool.query(queryText)
        .then(result => {
            console.log('Food query result:', result.rows);
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Error in GET all food: ${error}`);
            res.sendStatus(500);
        });
});

// GET route to retrieve single food options
router.get('/:id', (req, res) => {
    const queryText = `SELECT * FROM "food" WHERE "dog_id" = $1 `;
    
    pool.query(queryText, [req.params.id])
        .then(result => {
            console.log('Food query result:', result.rows);
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Error in GET all food: ${error}`);
            res.sendStatus(500);
        });
});


// PUT route to update food information for a dog
router.put('/:id', (req, res) => {
    const foodId = req.params.id;
    const foodToUpdate = req.body;
    const values = [foodToUpdate.description, foodToUpdate.favorite, foodToUpdate.notes, foodId];
    const sqlText = `UPDATE "food" SET "description" = $1, "favorite" = $2, "notes" = $3 
                    WHERE "id" = $4;`;
    pool.query(sqlText, values)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error in PUT /food/${foodId}: ${error}`);
            res.sendStatus(500);
        });
});

// POST route to create a new food option
router.post('/', (req, res) => {
    const newFood = req.body;
    const queryText = `INSERT INTO "food" ("description", "favorite", "notes") 
                       VALUES ($1, $2, $3) RETURNING "id";`;
    const queryValues = [newFood.description, newFood.favorite, newFood.notes];
    pool.query(queryText, queryValues)
        .then(() => {
            console.log('New food added successfully');
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error adding new food: ${error}`);
            res.sendStatus(500);
        });
});


// DELETE route to delete a food option
router.delete('/:id', (req, res) => {
    const foodId = req.params.id;
    const queryText = `DELETE FROM "food" WHERE "id" = $1;`;
    const queryValues = [foodId];
    pool.query(queryText, queryValues)
        .then(() => {
            res.sendStatus(204);
        })
        .catch((error) => {
            console.log(`Error in DELETE /food/${foodId}: ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;