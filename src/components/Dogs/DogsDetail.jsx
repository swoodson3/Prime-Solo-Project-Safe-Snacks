import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
const luxon = require('luxon');
const dateTime = luxon.DateTime;

function DogsDetail() {
const { id } = useParams();
const dispatch = useDispatch();
const dogs = useSelector((store) => store.dogs);
const dog = dogs.find((dog) => dog.id === Number(id));
const history = useHistory();

useEffect(() => {
  dispatch({ type: 'FETCH_DOGS' });
}, [dispatch]);

useEffect(() => {
  if (!dog) {
    // Fetch the dog details if not available in the state
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


  function transformDate(date) {
    let time = dateTime.fromISO(date);
    let year = `${time.year}`;
    let slice = year.slice(2);
    return `${time.month}/${time.day}/${slice}`;
  }

  const handleEdit = () => {
    history.push(`/dogs/${dog.id}/edit`); // Navigate to the edit dog page
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Dog Details</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{dog.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Breed</TableCell>
              <TableCell>{dog.breed}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Birthday</TableCell>
              <TableCell>{transformDate(dog.birthday)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Weight</TableCell>
              <TableCell>{dog.weight}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{dog.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Notes</TableCell>
              <TableCell>{dog.notes}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={handleEdit}>
        Edit
      </Button>
    </div>
  );
};

export default DogsDetail;
