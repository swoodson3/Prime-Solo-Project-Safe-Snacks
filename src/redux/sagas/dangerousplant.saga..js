import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getDangerousPlants() {
    try {
        const response = yield axios.get('/api/dangerousplants');
        yield put({ type: 'SET_DANGEROUS_PLANTS', payload: response.data });
    } catch (error) {
        console.log('Error fetching dangerous plants:', error);
    }
}

function* createDangerousPlant(action) {
    try {
        yield axios.post('/api/dangerousplants', action.payload);
        yield put({ type: 'FETCH_DANGEROUS_PLANTS' });
        action.setNewDangerousPlant('');
    } catch (error) {
        console.log('Error creating dangerous plant:', error);
        alert('Something went wrong!');
    }
}

function* deleteDangerousPlant(action) {
    try {
        yield axios.delete(`/api/dangerousplants/${action.payload}`);
        yield put({ type: 'FETCH_DANGEROUS_PLANTS' });
    } catch (error) {
        console.log('Error deleting dangerous plant:', error);
    }
}

function* dangerousplantsSaga() {
    yield takeEvery('FETCH_DANGEROUS_PLANTS', getDangerousPlants);
    yield takeEvery('CREATE_DANGEROUS_PLANT', createDangerousPlant);
    yield takeEvery('DELETE_DANGEROUS_PLANT', deleteDangerousPlant);
}

export default dangerousplantsSaga;