import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Typography, Button, Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

function DogsList() {
    const dispatch = useDispatch();
    const dogs = useSelector((store) => store.dogs);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_DOGS' });
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this dog?')) {
            axios
                .delete(`/api/dogs/${id}`)
                .then((result) => {
                    dispatch({ type: 'FETCH_DOGS' });
                })
                .catch((error) => {
                    console.log(`Error in DELETE: ${error}`);
                    alert(`Failed to delete dog!`);
                });
        }
    };


    return (
        <div>
            <h1 style={{ textAlign: 'center' }} >
                Dogs List
            </h1>
            <Grid container spacing={2} style={{ textAlign: 'center' }} sx={{ margin: '0 auto' }}  >
                {dogs.map((dog) => (
                    <Grid item key={dog.id} xs={12} sm={6} md={4}>
                        <div>
                            <Typography variant="h4">{dog.name}</Typography>
                            <Button
                                component={Link}
                                to={`/dogs/${dog.id}`}
                                variant="contained"
                                style={{
                                    backgroundColor: "#00acb0",
                                    color: "#fff",
                                    fontSize: '16px',
                                    padding: '5px',
                                    width: '200px'
                                }}
                            >
                                View Details
                            </Button>
                            <IconButton
                                onClick={() => handleDelete(dog.id)}
                                aria-label="delete"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </Grid>
                ))}
            </Grid>
            <br />
            <br />
            <Button
                component={Link}
                to="/NewDog"
                variant="contained"
                style={{
                    backgroundColor: "#00acb0",
                    color: "#fff",
                    fontSize: '16px',
                    padding: '5px',
                    width: '200px',
                    position: 'fixed',
                    bottom: '60%',
                    right: '200px',
                    transform: 'translateY(20%)',
                }}

            >
                Add Dog
            </Button>
        </div>
    );
}

export default DogsList;


