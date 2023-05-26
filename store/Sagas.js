import { all, fork } from 'redux-saga/effects';

const req = require.context('.', true, /\.\/.+\/Saga\.js$/);

const sagas = req.keys().map((key) => req(key).default);

export default function* saga(services = {}) {
    yield all(sagas.map((saga) => fork(saga, services)));
}
