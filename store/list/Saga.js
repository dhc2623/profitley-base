import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_LIST_INITIATE, getListSuccess, getListFailure } from './Action';
import { getInvoiceList } from './Service';
import { errorResponse } from '../../helper/Utils';

export function* handleGetList(params) {
    try {
        // const data = yield call(getInvoiceList);
        // yield put(getListSuccess(data.data.success.invoices));
        let data = [];
        yield put(getListSuccess(data));
    } catch (error) {
        errorResponse(error, params.type);
        yield put(getListFailure());
    }
}

//watchers
export default function* watchList() {
    yield takeEvery(GET_LIST_INITIATE, handleGetList);
}
