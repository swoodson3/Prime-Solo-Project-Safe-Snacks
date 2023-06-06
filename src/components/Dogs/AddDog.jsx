import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, MenuItem, Box} from '@mui/material';

const AddDog = () => {
  const dispatch = useDispatch();
  const dogs = useSelector(store => store.dogs);
  const foodOptions = useSelector(store => store.food);
  const history = useHistory();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [birthday, setBirthday] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [notes, setNotes] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');
  const [foodDescription, setFoodDescription] = useState('');


  useEffect(() => {
    console.log('Inside useEffect');
  }, [dispatch]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleFoodDescriptionChange = (event) => {
    setFoodDescription(event.target.value);
  };

  const handleFavoriteFoodChange = (event) => {
    setFavoriteFood(event.target.value);
  };

  const addDog = (event) => {
    event.preventDefault();
    axios
      .post('/api/dogs', {
        name: name,
        breed: breed,
        birthday: birthday,
        weight: weight,
        gender: gender,
        notes: notes,
        description: foodDescription,
        favorite: favoriteFood
      })
      .then((result) => {
        dispatch({ type: 'FETCH_DOGS' });
        clearForm();
        history.push('/dogsList')
      })
      .catch((error) => {
        console.log(`Error in POST: ${error}`);
        alert(`Failed to add dog!`);
      });
  };

  const handleReturn = () => {
    clearForm();
    history.push('/'); // Redirect to the home page
  };

  const clearForm = () => {
    setName('');
    setBreed('');
    setBirthday('');
    setWeight('');
    setGender('');
    setNotes('');
    setFavoriteFood('');
    setFoodDescription('');
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add a Dog</h1>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={addDog}>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '9px'}}>
        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: "#00acb0",
            color: "#fff",
            fontSize: '16px',
            padding: '5px',
            width: '200px',
            marginRight: '15px'
          }}
          className="btn"
        >
          Add Dog
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#00acb0",
            color: "#fff",
            fontSize: '16px',
            padding: '5px',
            width: '200px',
          }}
          className="btn"
          onClick={handleReturn}
        >
          Return Home
        </Button>
        </div>
      </form>
      </Box>
    </div>
  );
}

export default AddDog;



















