import { put, call, takeLatest } from 'redux-saga/effects';
import { errorResponse } from '../../helper/Utils';
import { me } from '../auth/Action';
import {
    GET_SELLERS_INITIATE,
    SET_SELLER_INITIATE,
    SET_SELLER_DRAWER,
    getSellersSuccess,
    getSellersFailure,
    setSellerDrawerSuccess,
    setSellerDrawer
} from './Action';
import { getSellersService, setSellerService } from './Service';

export function* getSellersSaga(action) {
    try {
        const data = yield call(() => getSellersService());
        yield put(getSellersSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getSellersFailure(error));
    }
}

export function* setSellerSaga(action) {
    try {
        const data = yield call(() => setSellerService(action.params));
        yield put(setSellerDrawer(false));
        yield put(me());
    } catch (error) {
        errorResponse(error, action.type);
    }
}

export function* selectSellerForPlaceOrder(action) {
    try {
        yield put(setSellerDrawerSuccess(action.payload));
    } catch (error) {
        errorResponse(error, action.type);
    }
}

//watchers
export default function* watchList() {
    yield takeLatest(GET_SELLERS_INITIATE, getSellersSaga);
    yield takeLatest(SET_SELLER_INITIATE, setSellerSaga);
    yield takeLatest(SET_SELLER_DRAWER, selectSellerForPlaceOrder);
}
