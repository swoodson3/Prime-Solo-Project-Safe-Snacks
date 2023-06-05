import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { Typography } from '@mui/material';
const luxon = require('luxon');
const dateTime = luxon.DateTime;

 


function DogsDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const dogs = useSelector((store) => store.dogs);
    const food = useSelector((store) => store.food);
    const dog = dogs.find((dog) => dog.id === Number(id));
    const history = useHistory();
    // const [description, setDescription] = useState('');
    // const [favorite, setFavorite] = useState(false);
    // const [notes, setNotes] = useState('');
    // const [newFoodDescription, setNewFoodDescription] = useState('')


    // Fetch dogs data when the component mounts
    useEffect(() => {
        dispatch({ type: 'FETCH_DOGS' });
    }, []);

    // Fetch the dog details if not available in the state
    useEffect(() => {
        if (!dog) {
            axios
                .get(`/api/dogs/${id}`)
                .then((response) => {
                    dispatch({ type: 'SET_DOG', payload: response.data });
                })
                .catch((error) => {
                    console.log('Error fetching dog details:', error);
                });
        }
    }, [id, dog, dispatch]);

    if (!dog) {
        return <div>Loading...</div>;
    }

    // Function to transform the date format
    function transformDate(date) {
        let time = dateTime.fromISO(date);
        let year = `${time.year}`;
        let slice = year.slice(2);
        return `${time.month}/${time.day}/${slice}`;
    }

    // Navigate to the edit dog page
    const handleEdit = () => {
        history.push(`/dogs/${dog.id}/edit`); // Navigate to the edit dog page
    };

    // const handleAddFoods = () => {
    //     const newFood = {
    //         description: description,
    //         favorite: favorite,
    //         notes: notes,
    //     };
    //     dispatch({ type: 'ADD_FOOD', payload: newFood });

    //     // Clear the form fields
    //     setDescription('');
    //     setFavorite(false);
    //     setNotes('');
    // };

    // const handleFoodDescriptionChange = (event) => {
    //     setNewFoodDescription(event.target.value);
    //   };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Dog Details</h1>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                    </TableHead>
                    <TableBody >
                        <TableRow>
                            <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px' }}>Name</TableCell>
                            <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px' }}>{dog.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px'  }}>Breed</TableCell>
                            <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px'  }}>{dog.breed}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px'  }}>Birthday</TableCell>
                            <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px'  }}>{transformDate(dog.birthday)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px'  }}>Weight</TableCell>
                            <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px'  }}>{dog.weight}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px'  }}>Gender</TableCell>
                            <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px'  }}>{dog.gender}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px'  }}>Notes</TableCell>
                            <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px'  }}>{dog.notes}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Foods</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    </TableHead>
                    <TableBody>
                        {dog.food.map((foodItem) => (
                            <React.Fragment key ={foodItem.id}>
                                <TableRow>
                                    <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '820px'  }}>Description</TableCell>
                                    <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '780px'    }}>{foodItem.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontSize: '20px', textAlign: 'center', width: '800px' }}>Favorite</TableCell>
                                    <TableCell>
                                        {foodItem.favorite ? (
                                            <Typography variant="body1" style={{ fontSize: '20px', textAlign: 'center'  }}>True</Typography>
                                        ) : (
                                            <Typography variant="body1" style={{ fontSize: '20px', textAlign: 'center' }}>False</Typography>
                                        )}
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
            </Button>
        </div>
    );
}

export default DogsDetail;

