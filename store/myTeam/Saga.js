import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { NOTIFICATION_TYPE, USER_TYPE } from '../../config/Constant';
import { removeLabelFromFilterObj } from '../../helper/FilterUtils';
import { errorResponse, showNotification } from '../../helper/Utils';
import { langs } from '../../localization';
import {
    getDSPList,
    GET_DSP_LIST_INITIATE,
    getDSPListSuccess,
    getDSPListFailure,
    GET_DSP_DETAILS_INITIATE,
    getDSPDetailsSuccess,
    getDSPDetailsFailure,
    ASSIGN_RETAILER_TO_DSP_INITIATE,
    assignRetailerSuccess,
    assignRetailerFailure,
    CHANGE_STATUS_INITIATE,
    changeStatusSuccess,
    changeStatusFailure,
    GET_DSP_INSIGHTS_INITIATE,
    getDSPInsightsSuccess,
    getDSPInsightsFailure
} from './Action';
import {
    assignRetailersService,
    getDetailsService,
    getDSPListService,
    changeStatusService,
    getDSPInsightsService
} from './Service';

export function* getDspList(action) {
    try {
        const data = yield call(() =>
            getDSPListService(removeLabelFromFilterObj({ ...action.params }))
        );
        yield put(getDSPListSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getDSPListFailure(error));
    }
}

export function* getDSPDetails(action) {
    try {
        const data = yield call(() => getDetailsService(action.dspId));
        yield put(getDSPDetailsSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getDSPDetailsFailure(error));
    }
}

export function* assignRetailers(action) {
    try {
        const data = yield call(() => assignRetailersService(action.postData));
        yield put(getDSPList(action.postData.dsp));
        showNotification(
            NOTIFICATION_TYPE.SUCCESS,
            langs.notificationMessages.retailerAssignedSuccessfully
        );
        yield put(assignRetailerSuccess());
    } catch (error) {
        errorResponse(error, action.type);
        yield put(assignRetailerFailure(error));
    }
}

export function* changeStatus(action) {
    try {
        const data = yield call(() => changeStatusService(action.postData));
        let message = action.postData.status
            ? langs.notificationMessages.activated
            : langs.notificationMessages.deActivated;
        showNotification(NOTIFICATION_TYPE.SUCCESS, message);
        yield put(changeStatusSuccess(action.postData));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(changeStatusFailure(error));
    }
}

export function* getDSPInsights(action) {
    try {
        const data = yield call(() => getDSPInsightsService(action.dspId));
        yield put(getDSPInsightsSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getDSPInsightsFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeEvery(GET_DSP_LIST_INITIATE, getDspList);
    yield takeEvery(GET_DSP_DETAILS_INITIATE, getDSPDetails);
    yield takeEvery(ASSIGN_RETAILER_TO_DSP_INITIATE, assignRetailers);
    yield takeEvery(CHANGE_STATUS_INITIATE, changeStatus);
    yield takeLatest(GET_DSP_INSIGHTS_INITIATE, getDSPInsights);
}
