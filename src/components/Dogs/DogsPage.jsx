import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { IconButton, Button } from '@mui/material';
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
      {/* Add Dog Form */}
      <div>
        <h1 style={{ textAlign: "center"}}>Add a Dog</h1>
        <form onSubmit={addDog}>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            style={{ fontSize: '16px', padding: '8px', width: '200px' }}
          />
          <input
            type="text"
            value={breed}
            onChange={handleBreedChange}
            placeholder="Breed"
            style={{ fontSize: '16px', padding: '8px', width: '200px' }}
          />
          <input
            type="date"
            value={birthday}
            onChange={handleBirthdayChange}
            placeholder="Birthday"
            style={{ fontSize: '16px', padding: '8px', width: '200px' }}
          />
          <input
            type="number"
            value={weight}
            onChange={handleWeightChange}
            placeholder="Weight"
            style={{ fontSize: '16px', padding: '8px', width: '200px' }}
          />
           <select value={gender} onChange={handleGenderChange} placeholder="Gender"
           style={{ fontSize: '16px', padding: '8px', width: '200px' }}>
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
            style={{ fontSize: '16px', padding: '8px', width: '200px' }}
          />
          <Button variant="contained" style={{ backgroundColor: "#00acb0", color: "#fff",  fontSize: '16px', padding: '5px', width: '200px', marginRight: '10px' }} className="btn">
              Add Dog
            </Button> 
            <Button variant="contained" style={{ backgroundColor: "#00acb0", color: "#fff",  fontSize: '16px', padding: '5px', width: '200px' }} className="btn" onClick={handleReturn}Return Home>
              Return Home
            </Button>
        </form>
      </div>

      {/* Display Dogs */}
      {/* {dogs && dogs.length > 0 ? ( */}
  <Table>
    <TableHead>
      <TableRow>
        <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Name</TableCell>
        <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Breed</TableCell>
        <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Birthday</TableCell>
        <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Weight</TableCell>
        <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Gender</TableCell>
        <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Notes</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {dogs.map((dog) => (
        <TableRow key={dog.id}>
          <TableCell style={{ fontSize: '20px' }}>{dog.name}</TableCell>
          <TableCell style={{ fontSize: '20px' }}>{dog.breed}</TableCell>
          <TableCell style={{ fontSize: '20px' }}>{transformDate(dog.birthday)}</TableCell>
          <TableCell style={{ fontSize: '20px' }}>{dog.weight}</TableCell>
          <TableCell style={{ fontSize: '20px' }}>{dog.gender}</TableCell>
          <TableCell style={{ fontSize: '20px' }}>{dog.notes}</TableCell>
          <TableCell style={{ fontSize: '20px' }}>
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











  


