import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_ITEM_LIST_INITIATE, getListSuccess, getListFailure } from './Action';
import { getInvoiceList } from './Service';
import { errorResponse } from '../../helper/Utils';

export function* handleGetList(params) {
    try {
        const data = yield call(getInvoiceList);
        yield put(getListSuccess(data.data.success.item));
    } catch (error) {
        errorResponse(error, params.type);
        yield put(getListFailure());
    }
}

//watchers
export default function* watchList() {
    yield takeEvery(GET_ITEM_LIST_INITIATE, handleGetList);
}
