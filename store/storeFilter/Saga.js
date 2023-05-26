import { put, takeLatest } from 'redux-saga/effects';
import { errorResponse } from '../../helper/Utils';
import { updateFilterSuccess, UPDATE_FILTRES } from './Action';

export function* updateFilters(action) {
    try {
        yield put(updateFilterSuccess(action.filterName, action.payload));
    } catch (error) {
        errorResponse(error, action.type);
    }
}

//watchers
export default function* watchList() {
    yield takeLatest(UPDATE_FILTRES, updateFilters);
}
