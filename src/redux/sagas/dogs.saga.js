import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getDogs() {
  try {
    const dogs = yield axios.get('/api/dogs');
    yield put({ type: 'SET_DOGS', payload: dogs.data });
  } catch {
    console.log('GET all Error');
  }
}

function* createDog(action) {
  try {
    yield axios.post('/api/dogs', action.payload);
    yield put({ type: 'FETCH_DOGS' });
    action.setNewDog('')
  } catch (error) {
    console.log('POST error:', error);
    alert('Something went wrong!');
  }
}

function* dogsSaga() {
  yield takeEvery('FETCH_DOGS', getDogs);
  yield takeEvery('CREATE_DOG', createDog);
}

export default dogsSaga;
