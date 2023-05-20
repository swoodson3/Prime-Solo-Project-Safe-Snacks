import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Generator function that handles fetching dogs from the server
function* getDogs() {
    try {
        const dogs = yield axios.get('/api/dogs');
        //Dispatching an action with the retrieved dog data to update the state
        yield put({ type: 'SET_DOGS', payload: dogs.data });
    } catch {
        console.log('GET all Error');
    }
}

// Generator function that handles creating a new dog
function* createDog(action) {
    try {
        yield axios.post('/api/dogs', action.payload);
        // Dispatching an action to trigger the fetching of all dogs again
        yield put({ type: 'FETCH_DOGS' });
        // Clearing the input field by calling a function passed in the action object
        action.setNewDog('')
    } catch (error) {
        console.log('POST error:', error);
        alert('Something went wrong!');
    }
}

// Generator function that handles the main flow of the dogs saga
function* dogsSaga() {
    // Attaching a watcher to the 'FETCH_DOGS' action and calling getDogs generator function when triggered
    yield takeEvery('FETCH_DOGS', getDogs);
    // Attaching a watcher to the 'CREATE_DOG' action and calling createDog generator function when triggered
    yield takeEvery('CREATE_DOG', createDog);
}

export default dogsSaga;
