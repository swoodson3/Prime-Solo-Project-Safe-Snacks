import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';





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
                    const { name, breed, birthday, weight, gender, notes } = response.data;
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
                notes
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
                        style={{ fontSize: '16px', padding: '8px', width: '200px' }}
                    >
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
                    <Button type="submit" variant="contained" color="primary">Update Dog</Button>
                </form>
            </div>
        );
    };


    export default EditDog;