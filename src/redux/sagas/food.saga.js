import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga to fetch food options
function* fetchFoodSaga( action ) {
  try {
    console.log('seth')
    const response = yield axios.get(`/api/food/${action.payload}`);
    yield put({ type: 'SET_FOOD', payload: response.data });
  } catch (error) {
    console.log('Error in fetchFoodSaga:', error);
  }
}

// Saga to update food information
function* updateFoodSaga(action) {
  try {
    yield axios.put(`/api/food/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_FOOD' });
  } catch (error) {
    console.log('Error in updateFoodSaga:', error);
  }
}

// Saga to create a new food option
function* addFoodSaga(action) {
  try {
    yield axios.post('/api/food', action.payload);
    yield put({ type: 'FETCH_FOOD' });
  } catch (error) {
    console.log('Error in addFoodSaga:', error);
  }
}

// Saga to delete a food option
function* deleteFoodSaga(action) {
  try {
    yield axios.delete(`/api/food/${action.payload}`);
    yield put({ type: 'FETCH_FOOD' });
  } catch (error) {
    console.log('Error in deleteFoodSaga:', error);
  }
}

// Watcher saga
function* foodSaga() {
  yield takeLatest('FETCH_FOOD', fetchFoodSaga);
  yield takeLatest('UPDATE_FOOD', updateFoodSaga);
  yield takeLatest('ADD_FOOD', addFoodSaga);
  yield takeLatest('DELETE_FOOD', deleteFoodSaga);
}

export default foodSaga;