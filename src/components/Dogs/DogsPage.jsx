import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DogsPage() {
  const dispatch = useDispatch();
  const dogs = useSelector(store => store.dogsReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_DOGS' });
  }, [dispatch]);

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
      {dogs && dogs.length > 0 ? (
        dogs.map(dog => (
          <div key={dog.id}>
            <h4>{dog.name}</h4>
            <h5>{dog.notes}</h5>
            <h5>{dog.breed}</h5>
            <h5>{dog.weight}</h5>
            <h5>{dog.birthday}</h5>
            <h5>{dog.gender}</h5>
          </div>
        ))
      ) : (
        <p>No dogs found.</p>
      )}
    </div>
  );
}

export default DogsPage;
