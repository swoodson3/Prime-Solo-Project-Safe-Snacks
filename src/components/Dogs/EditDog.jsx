import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, MenuItem } from '@mui/material';



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
    const [favoriteFood, setFavoriteFood] = useState('');
    const [foodDescription, setFoodDescription] = useState('');


    useEffect(() => {
        if (dog) {
            // If the dog is already available in the state, set the initial values
            setName(dog.name);
            setBreed(dog.breed);
            setBirthday(dog.birthday);
            setWeight(dog.weight);
            setGender(dog.gender);
            setNotes(dog.notes);
        } else {
            // Fetch the dog details if not available in the state
            axios
                .get(`/api/dogs/${id}`)
                .then(response => {
                    const { name, breed, birthday, weight, gender, notes} = response.data;
                    setName(name);
                    setBreed(breed);
                    setBirthday(birthday);
                    setWeight(weight);
                    setGender(gender);
                    setNotes(notes);
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
        setFoodDescription(event.target.value);
    };

    const handleFavoriteFoodChange = (event) => {
        setFavoriteFood(event.target.value);
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


    return (

        <div>
            <h1 style={{ textAlign: 'center' }}>Edit Dog</h1>
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
          value={foodDescription}
          onChange={handleFoodDescriptionChange}
          style={{ fontSize: '16px', padding: '8px', width: '200px' }}
          required
        />
        <TextField
          type="text"
          label="Favorite Food"
          value={favoriteFood}
          onChange={handleFavoriteFoodChange}
          style={{ fontSize: '16px', padding: '8px', width: '200px' }}
          required
        />
        <TextField
          type="text"
          label="Notes"
          value={notes}
          onChange={handleNotesChange}
          style={{ fontSize: '16px', padding: '8px', width: '200px' }}
          required
        />
                <Button type="submit" variant="contained" color="primary">Update Dog</Button>
            </form>
        </div>
    );
};


export default EditDog;