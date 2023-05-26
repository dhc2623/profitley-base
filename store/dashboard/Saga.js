import { put, call, takeLatest } from 'redux-saga/effects';
import {
    GET_DASHBOARD_DATA_INITIATE,
    getDashboardDataSuccess,
    getDashboardDataFailure,
    GET_SUMMARY_INITIATE,
    getSummarySuccess,
    getSummaryFailure,
    GET_SELLER_SUMMARY_INITIATE,
    getSellerSummarySuccess,
    getSellerSummaryFailure
} from './Action';
import { errorResponse } from '../../helper/Utils';
import { getDashboardDataService, getSellerSummaryService, getSummaryService } from './Service';

export function* getDashboardData(action) {
    try {
        const data = yield call(() => getDashboardDataService(action.role, action.date));
        yield put(getDashboardDataSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getDashboardDataFailure(error));
    }
}

export function* getSellerSummaryData(action) {
    try {
        const data = yield call(() => getSellerSummaryService(action.params));
        yield put(getSellerSummarySuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getSellerSummaryFailure(error));
    }
}

export function* getSummaryData(action) {
    try {
        const data = yield call(() => getSummaryService(action.role, action.date));
        yield put(getSummarySuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getSummaryFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeLatest(GET_DASHBOARD_DATA_INITIATE, getDashboardData);
    yield takeLatest(GET_SUMMARY_INITIATE, getSummaryData);
    yield takeLatest(GET_SELLER_SUMMARY_INITIATE, getSellerSummaryData);
}
