import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AddDog = () => {
  const dispatch = useDispatch();
  const [user_id, setUserId] = useState(0);
  const [notes, setNotes] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState(0);
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const addItem = () => {
    axios.post('/api/dogs', {
      user_id: user_id,
      notes: notes,
      breed: breed,
      weight: weight,
      birthday: birthday,
      gender: gender,
    })
    .then((result) => {
      console.log(`result:`, result.data);
      dispatch({ type: 'FETCH_DOGS' });
      setUserId('');
      setNotes('');
      setBreed('');
      setWeight('');
      setBirthday('');
      setGender('');
    })
    .catch((error) => {
      console.log(`Error in POST: ${error}`);
      alert(`Failed to add dog!`);
    });
  };

  return (
    <div>
      <form onSubmit={addItem}>
        {/* Input fields */}
        <input
          type="text"
          value={user_id}
          onChange={handleUserIdChange}
          placeholder="User ID"
        />
        <input
          type="text"
          value={notes}
          onChange={handleNotesChange}
          placeholder="Notes"
        />
        <input
          type="text"
          value={breed}
          onChange={handleBreedChange}
          placeholder="Breed"
        />
        <input
          type="number"
          value={weight}
          onChange={handleWeightChange}
          placeholder="Weight"
        />
        <input
          type="date"
          value={birthday}
          onChange={handleBirthdayChange}
          placeholder="Birthday"
        />
        <input
          type="text"
          value={gender}
          onChange={handleGenderChange}
          placeholder="Gender"
        />

        <button type="submit">Create Dog</button>
      </form>

      {/* <p>{message}</p> */}
    </div>
  );
};

export default AddDog;

