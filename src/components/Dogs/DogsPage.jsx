import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function DogsPage() {
  const dispatch = useDispatch();
  const dogs = useSelector(store => store.dogs);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [birthday, setBirthday] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    console.log('Inside useEffect');
    dispatch({ type: 'FETCH_DOGS' });
  }, [dispatch]);

  const handleNameChange = (event) => {
    console.log('Name changed:', event.target.value);
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
    // console.log('Add dog button clicked');
    // console.log('Name:', name);
    // console.log('Breed:', breed);
    // console.log('Birthday:', birthday);
    // console.log('Weight:', weight);
    // console.log('Gender:', gender);
    // console.log('Notes:', notes);

    axios.post('/api/dogs', {
      name: name,
      breed: breed,
      birthday: birthday,
      weight: weight,
      gender: gender,
      notes: notes,
    })
      .then((result) => {
        dispatch({ type: 'FETCH_DOGS' });
        setName('');
        setBreed('');
        setBirthday('');
        setWeight('');
        setGender('');
        setNotes('');
      })
      .catch((error) => {
        console.log(`Error in POST: ${error}`);
        alert(`Failed to add dog!`);
      });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setName('');
    setBreed('');
    setBirthday('');
    setWeight('');
    setGender('');
    setNotes('');
  };

  console.log('Dogs:', dogs);

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
          <input
            type="text"
            value={gender}
            onChange={handleGenderChange}
            placeholder="Gender"
          />
          <input
            type="text"
            value={notes}
            onChange={handleNotesChange}
            placeholder="Notes"
          />
          <button type="submit">Add Dog</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>

      {/* Display Dogs */}
      {dogs && dogs.length > 0 ? (
        dogs.map((dog) => (
          <div key={dog.id}>
            <h4>{dog.name}</h4>
            <h5>{dog.breed}</h5>
            <h5>{dog.birthday}</h5>
            <h5>{dog.weight}</h5>
            <h5>{dog.gender}</h5>
            <h5>{dog.notes}</h5>
          </div>
        ))
      ) : (
        <p>No dogs found.</p>
      )}

      {/* Temporary Debugging Info */}
      <div>
        <h3>Temporary Debugging Info:</h3>
        <p>Name: {name}</p>
        <p>Breed: {breed}</p>
        <p>Birthday: {birthday}</p>
        <p>Weight: {weight}</p>
        <p>Gender: {gender}</p>
        <p>Notes: {notes}</p>
      </div>
    </div>
  );
}

export default DogsPage;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';

// function DogsPage() {
//   const dispatch = useDispatch();

//   // Selecting the dogs state from the Redux store
//   const dogs = useSelector(store => store.dogsReducer);

//   // State variables to manage the form inputs
//   const [name, setName] = useState('');
//   const [breed, setBreed] = useState('');
//   const [birthday, setBirthday] = useState('');
//   const [weight, setWeight] = useState('');
//   const [gender, setGender] = useState('');
//   const [notes, setNotes] = useState('');

//   // Fetching the dogs data when the component mounts or when the dispatch function changes
//   useEffect(() => {
//     dispatch({ type: 'FETCH_DOGS' });
//   }, [dispatch]);

  
//   // Event handlers for input changes
//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleBreedChange = (event) => {
//     setBreed(event.target.value);
//   };

//   const handleBirthdayChange = (event) => {
//     setBirthday(event.target.value);
//   };

//   const handleWeightChange = (event) => {
//     setWeight(event.target.value);
//   };

//   const handleGenderChange = (event) => {
//     setGender(event.target.value);
//   };

//   const handleNotesChange = (event) => {
//     setNotes(event.target.value);
//   };

  
//   // Function to add a dog
//   const addDog = () => {
//     console.log('seth', name)
//       axios.post('/api/dogs', {
//         name: name,
//         breed: breed,
//         birthday: birthday,
//         weight: weight,
//         gender: gender,
//         notes: notes,
//       })
//       .then((result) => {
//         // Dispatching an action to fetch the updated dogs data
//         dispatch({ type: 'FETCH_DOGS' });

//         // Resetting the form inputs
//         setName('');
//         setBreed('');
//         setBirthday('');
//         setWeight('');
//         setGender('');
//         setNotes('');
//       })
//       .catch((error) => {
//         console.log(`Error in POST: ${error}`);
//         alert(`Failed to add dog!`);
//       });
//   };

//   // Function to handle cancel button click
//   const handleCancel = (event) => {
//     event.preventDefault();
//     setName('');
//     setBreed('');
//     setBirthday('');
//     setWeight('');
//     setGender('');
//     setNotes('');
//   };


//   console.log(dogs)
  
//   return (
//     <div>
//       <h1>Dogs</h1>
//       <nav className="dogsPage">
//         Categories
//         <ul>
//           <li>Small Breeds</li>
//           <li>Medium Breeds</li>
//           <li>Large Breeds</li>
//         </ul>
//       </nav>

//       {/* Add Dog Form */}
//       <div>
//         <h2>Add a Dog</h2>
//         <form onSubmit={addDog}>
//           <input
//             type="text"
//             value={name}
//             onChange={handleNameChange}
//             placeholder="Name"
//           />
//           <input
//             type="text"
//             value={breed}
//             onChange={handleBreedChange}
//             placeholder="Breed"
//           />
//           <input
//             type="date"
//             value={birthday}
//             onChange={handleBirthdayChange}
//             placeholder="birthday"
//           />
//           <input
//             type="number"
//             value={weight}
//             onChange={handleWeightChange}
//             placeholder="Weight"
//           />
//           <input
//             type="text"
//             value={gender}
//             onChange={handleGenderChange}
//             placeholder="Gender"
//           />
//           <input
//             type="text"
//             value={notes}
//             onChange={handleNotesChange}
//             placeholder="Notes"
//           />
//           <button type="submit">Add Dog</button>
//           <button type="button" onClick={handleCancel}>Cancel</button>
//         </form>
//       </div>

//       {/* Display Dogs */}
//       {dogs && dogs.length > 0 ? (
//         dogs.map((dog) => (
//           <div key={dog.id}>
//             <h4>{dog.name}</h4>
//             <h5>{dog.breed}</h5>
//             <h5>{dog.birthday}</h5>
//             <h5>{dog.weight}</h5>
//             <h5>{dog.gender}</h5>
//             <h5>{dog.notes}</h5>
//           </div>
//         ))
//       ) : (
//         <p>No dogs found.</p>
//       )}
//     </div>
//   );
// }

// export default DogsPage;

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';

// function DogsPage() {
//   const dispatch = useDispatch();

//   // Selecting the dogs state from the Redux store
//   const dogs = useSelector(store => store.dogsReducer);

//   // State variables to manage the form inputs
  
//   const [name, setName] = useState('');
//   const [breed, setBreed] = useState('');
//   const [birthday, setBirthday] = useState('');
//   const [weight, setWeight] = useState('');
//   const [gender, setGender] = useState('');
//   const [notes, setNotes] = useState('');

//   // Fetching the dogs data when the component mounts or when the dispatch function changes
//   useEffect(() => {
//     dispatch({ type: 'FETCH_DOGS' });
//   }, [dispatch]);

  
//   // Event handlers for input changes
//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleBreedChange = (event) => {
//     setBreed(event.target.value);
//   };

//   const handleBirthdayChange = (event) => {
//     setBirthday(event.target.value);
//   };

//   const handleWeightChange = (event) => {
//     setWeight(event.target.value);
//   };

//   const handleGenderChange = (event) => {
//     setGender(event.target.value);
//   };

//   const handleNotesChange = (event) => {
//     setNotes(event.target.value);
//   };

//   // Function to add a dog
//   const addDog = () => {
//     console.log('Seth')
//     axios.post('/api/dogs', {
//       name: name,
//       breed: breed,
//       birthday: birthday,
//       weight: weight,
//       gender: gender,
//       notes:notes,
//     })
//       .then((result) => {
//         console.log(`result:`, result.data);

//         // Dispatching an action to fetch the updated dogs data
//         dispatch({ type: 'FETCH_DOGS' });

//         // Resetting the form inputs
//         setName('');
//         setBreed('');
//         setBirthday('');
//         setWeight('');
//         setGender('');
//         setNotes('');
//       })
//       .catch((error) => {
//         console.log(`Error in POST: ${error}`);
//         alert(`Failed to add dog!`);
//       });
//   };

//   console.log(dogs)
//   return (
//     <div>
//       <h1>Dogs</h1>
//       <nav className="dogsPage">
//         Categories
//         <ul>
//           <li>Small Breeds</li>
//           <li>Medium Breeds</li>
//           <li>Large Breeds</li>
//         </ul>
//       </nav>

//       {/* Add Dog Form */}
//       <div>
//         <h2>Add a Dog</h2>
//         <form onSubmit={addDog}>
//           <input
//             type="text"
//             value={name}
//             onChange={handleNameChange}
//             placeholder="Name"
//           />
//           <input
//             type="text"
//             value={breed}
//             onChange={handleBreedChange}
//             placeholder="Breed"
//           />
//           <input
//             type="date"
//             value={birthday}
//             onChange={handleBirthdayChange}
//             placeholder="birthday"
//           />
//           <input
//             type="number"
//             value={weight}
//             onChange={handleWeightChange}
//             placeholder="Weight"
//           />
//           <input
//             type="text"
//             value={gender}
//             onChange={handleGenderChange}
//             placeholder="Gender"
//           />
//           <input
//             type="text"
//             value={notes}
//             onChange={handleNotesChange}
//             placeholder="Notes"
//           />
//           <button type="submit">Add Dog</button>
//           <button type="submit">Cancel</button>
//         </form>
//       </div>

//       {/* Display Dogs */}
//       {dogs && dogs.length > 0 ? (
//         dogs.map(dog => (
//           <div key={dog.id}>
//             <h4>{dog.name}</h4>
//             <h5>{dog.breed}</h5>
//             <h5>{dog.birthday}</h5>
//             <h5>{dog.weight}</h5>
//             <h5>{dog.gender}</h5>
//             <h5>{dog.notes}</h5>
//           </div>
//         ))
//       ) : (
//         <p>No dogs found.</p>
//       )}
//     </div>
//   );
// }

// export default DogsPage;







  


