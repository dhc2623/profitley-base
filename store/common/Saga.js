import { takeEvery } from 'redux-saga/effects';
import { SET_CHILD } from './Action';

export function* setChild(action) {}

//watchers
export default function* watchList() {
    yield takeEvery(SET_CHILD, setChild);
}
