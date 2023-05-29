import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getDangerousFoods() {
  try {
    const response = yield axios.get('/api/dangerousfoods');
    yield put({ type: 'SET_DANGEROUS_FOODS', payload: response.data });
  } catch (error) {
    console.log('Error fetching dangerous foods:', error);
  }
}

function* createDangerousFood(action) {
  try {
    yield axios.post('/api/dangerousfoods', action.payload);
    yield put({ type: 'FETCH_DANGEROUS_FOODS' });
    action.setNewDangerousFood('');
  } catch (error) {
    console.log('Error creating dangerous food:', error);
    alert('Something went wrong!');
  }
}

function* deleteDangerousFood(action) {
  try {
    yield axios.delete(`/api/dangerousfoods/${action.payload}`);
    yield put({ type: 'FETCH_DANGEROUS_FOODS' });
  } catch (error) {
    console.log('Error deleting dangerous food:', error);
  }
}

function* dangerousfoodsSaga() {
  yield takeEvery('FETCH_DANGEROUS_FOODS', getDangerousFoods);
  yield takeEvery('CREATE_DANGEROUS_FOOD', createDangerousFood);
  yield takeEvery('DELETE_DANGEROUS_FOOD', deleteDangerousFood);
}

export default dangerousfoodsSaga;
