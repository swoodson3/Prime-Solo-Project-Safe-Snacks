import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, MenuItem, Box } from '@mui/material';



const EditDog = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const dogs = useSelector(store => store.dogs);
    const dog = dogs.find(dog => dog.id === Number(id));

    // State variables for storing dog details
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [birthday, setBirthday] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [notes, setNotes] = useState('');
    const [favorite, setFavorite] = useState('');
    const [description, setDescription] = useState('');
    const [favFoods, setFavFoods] = useState([]);


    useEffect(() => {
        if (dog) {
            console.log('my dog', dog)
            // If the dog is already available in the state, set the initial values
            setName(dog.name);
            setBreed(dog.breed);
            setBirthday(dog.birthday);
            setWeight(dog.weight);
            setGender(dog.gender);
            setNotes(dog.notes);
            setFavorite(dog.favorite);
            setDescription(dog.description);
            setFavFoods(dog.food)

        } else {
            // Fetch the dog details if not available in the state
            console.log('DO YOU SEEMEEEE')
            axios
                .get(`/api/dogs/${id}`)
                .then(response => {
                    console.log('dstrstrstrstrstrstrstrstsrtrstrst', response.data)
                    const { name, breed, birthday, weight, gender, notes, favorite, description, food } = response.data;
                    setName(name);
                    setBreed(breed);
                    setBirthday(birthday);
                    setWeight(weight);
                    setGender(gender);
                    setNotes(notes);
                    setFavorite(favorite);
                    setDescription(description);
                    setFavFoods(food)
                })
                .catch(error => {
                    console.log('Error fetching dog details:', error);
                });
        }
    }, [id, dog]);



    // Event handlers for input field changes
    const handleNameChange = event => {
        setName(event.target.value);
    };

    const handleBreedChange = event => {
        setBreed(event.target.value);
    };


    const handleBirthdayChange = event => {
        setBirthday(event.target.value);
    };

    const handleWeightChange = event => {
        setWeight(event.target.value);
    };

    const handleGenderChange = event => {
        setGender(event.target.value);
    };

    const handleNotesChange = event => {
        setNotes(event.target.value);
    };

    const handleFoodDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleFavoriteFoodChange = (event) => {
        setFavorite(event.target.value);
    };

    // Update the dog details
    const updateDog = event => {
        event.preventDefault();
        axios
            .put(`/api/dogs/${id}`, {
                name,
                breed,
                birthday,
                weight,
                gender,
                notes,
                favorite,
                description,
            })
            .then(result => {
                dispatch({ type: 'FETCH_DOGS' });
                history.push(`/dogs/${id}`); // Redirect to the dogs details page
            })
            .catch(error => {
                console.log(`Error in PUT: ${error}`);
                alert('Failed to update dog!');
            });
    };

    const handleDelete = (dogid, foodid ) => {
        if (window.confirm('Are you sure you want to delete this food?')) {
            axios
                .delete(`/api/food/${foodid}`)
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
            <h1 style={{ textAlign: 'center' }}>Edit Dog</h1>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={updateDog}>
                {/* Input fields for dog details */}
                <TextField
                    type="text"
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                    style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    required
                />
                <TextField
                    type="text"
                    label="Breed"
                    value={breed}
                    onChange={handleBreedChange}

                    style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    required
                />
                <TextField
                    type="date"
                    label="Birthday"
                    value={birthday}
                    onChange={handleBirthdayChange}
                    style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    required
                />
                <TextField
                    type="number"
                    label="Weight"
                    value={weight}
                    onChange={handleWeightChange}
                    style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    required
                />
                <TextField
                    select
                    label="Gender"
                    value={gender}
                    onChange={handleGenderChange}
                    style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    required
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <TextField
                    type="text"
                    label="Food Description"
                    value={description}
                    onChange={handleFoodDescriptionChange}
                    style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    required
                />
                <TextField
                    type="text"
                    label="Favorite Food"
                    value={favorite}
                    onChange={handleFavoriteFoodChange}
                    style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    required
                />
                <TextField
                    type="text"
                    label="Notes"
                    value={notes}
                    onChange={handleNotesChange}
                    style={{ fontSize: '16px', padding: '8px', width: '210px' }}
                />
                <br />
                <br />
                <br />
                <br />
                <br />
                {favFoods.map(food => {
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          type="text"
                          label="food description"
                          value={food.description}
                          onChange={handleFoodDescriptionChange}
                          style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                        />
                        <Button
                          style={{ backgroundColor: "#00acb0", color: 'white', padding: '15px' }}
                          onClick={() => handleDelete(dog.id, food.id)}
                          aria-label="delete"
                        >
                          Delete
                        </Button>
                      </Box>
                    )
                })}
                <Button type="submit" variant="contained" style={{backgroundColor: "#00acb0", margin: '10px'}}>Update Dog</Button>
                <Link to="/dogs/1" style={{ textDecoration: 'none' }}>
                <Button variant="contained" style={{ backgroundColor: "#00acb0" }}>
                    Dogs Details
                </Button>
            </Link>
            </form>
            </Box>
        </div>
    );
};


export default EditDog;