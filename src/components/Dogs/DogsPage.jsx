import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
const luxon = require('luxon');
const dateTime = luxon.DateTime;



function DogsPage() {
  const dispatch = useDispatch();
  const dogs = useSelector(store => store.dogs);
  const history = useHistory();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [birthday, setBirthday] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [notes, setNotes] = useState('');
  const [weightUnit, setWeightUnit] = useState('lbs');
  
  

  useEffect(() => {
    console.log('Inside useEffect');
    dispatch({ type: 'FETCH_DOGS' });
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

  const convertWeight = () => {
    if (weightUnit === 'lbs') {
      // Convert weight from lbs to kg
      const kgWeight = Number(weight) / 2.205;
      return kgWeight.toFixed(2);
    } else {
      // Convert weight from kg to lbs
      const lbsWeight = Number(weight) * 2.205;
      return lbsWeight.toFixed(2);
    }
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
      })
      .then((result) => {
        dispatch({ type: 'FETCH_DOGS' });
        clearForm();
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
  };


  const handleDelete = (dogId) => {
    if (window.confirm('Are you sure you want to delete this dog?')) {
      axios
        .delete(`/api/dogs/${dogId}`)
        .then((result) => {
          dispatch({ type: 'FETCH_DOGS' });
        })
        .catch((error) => {
          console.log(`Error in DELETE: ${error}`);
          alert(`Failed to delete dog!`);
        });
    }
  };

  function transformDate(date) {
    let time = dateTime.fromISO(date);
    let year = `${time.year}`;
    let slice = year.slice(2);
    console.log(`${time.month}/${time.day}/${slice}`)
    return `${time.month}/${time.day}/${slice}`;
  }


  return (
    <div>
      <h1>Dogs</h1>
      <nav className="dogsPage">
        Categories
        <ul>
          <li>Small Breeds</li>
          <li>Medium Breeds</li>
          <li>Large Breeds</li>
        </ul>
      </nav>

      {/* Add Dog Form */}
      <div>
        <h2>Add a Dog</h2>
        <form onSubmit={addDog}>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
          />
          <input
            type="text"
            value={breed}
            onChange={handleBreedChange}
            placeholder="Breed"
          />
          <input
            type="date"
            value={birthday}
            onChange={handleBirthdayChange}
            placeholder="Birthday"
          />
          <input
            type="number"
            value={weight}
            onChange={handleWeightChange}
            placeholder="Weight"
          />
           <select value={gender} onChange={handleGenderChange} placeholder="Gender">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            value={notes}
            onChange={handleNotesChange}
            placeholder="Notes"
          />
          <button type="submit">Add Dog</button>
          <button type="button" onClick={handleReturn}>Return Home</button>
        </form>
      </div>

      {/* Display Dogs */}
      {/* {dogs && dogs.length > 0 ? ( */}
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Breed</TableCell>
        <TableCell>Birthday</TableCell>
        <TableCell>Weight</TableCell>
        <TableCell>Gender</TableCell>
        <TableCell>Notes</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {dogs.map((dog) => (
        <TableRow key={dog.id}>
          <TableCell>{dog.name}</TableCell>
          <TableCell>{dog.breed}</TableCell>
          <TableCell>{transformDate(dog.birthday)}</TableCell>
          <TableCell>{dog.weight}</TableCell>
          <TableCell>{dog.gender}</TableCell>
          <TableCell>{dog.notes}</TableCell>
          <TableCell>
          <IconButton
            aria-label="Delete"
            onClick={() => handleDelete(dog.id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
{/* ) : (
  <p>No dogs found.</p>
)} */}

    </div>
  );
}

export default DogsPage;











  


