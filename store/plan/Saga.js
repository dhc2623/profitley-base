import { put, call, takeLatest } from 'redux-saga/effects';
import {
    GET_VISITS_INITIATE,
    getVisitsSuccess,
    getVisitsFailure,
    UNAPPROVED_VISITS_INITIATE,
    unapprovedVisitsSuccess,
    unapprovedVisitsFailure,
    POST_VISITS_INITIATE,
    postVisitsSuccess,
    postVisitsFailure,
    CHECK_IN_INITIATE,
    checkInSuccess,
    checkInFailure,
    CHECK_OUT_INITIATE,
    checkOutSuccess,
    checkOutFailure,
    CANCEL_VISITS_INITIATE,
    cancelVisitSuccess,
    cancelVisitFailure,
    getVisits,
    unapprovedVisits,
    RE_SCHEDULE_INITIATE,
    reScheduleVisitSuccess,
    reScheduleVisitFailure
} from './Action';
import {
    getVisitService,
    unapprovedVisitService,
    postVisitService,
    checkInService,
    checkOutService,
    cancelVisitService,
    reScheduleService
} from './Service';
import { errorResponse, showNotification } from '../../helper/Utils';
import { NOTIFICATION_TYPE } from '../../config/Constant';
import { removeLabelFromFilterObj } from '../../helper/FilterUtils';

import { langs } from '../../localization';

export function* getAllVisits(action) {
    try {
        const data = yield call(() =>
            getVisitService(action.payload)
        );
        yield put(getVisitsSuccess(data.success));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getVisitsFailure(error));
    }
}

export function* getUnapprovedVisits(action) {
    try {
        const data = yield call(() =>
            unapprovedVisitService(action.payload)
        );
        yield put(unapprovedVisitsSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(unapprovedVisitsFailure(error));
    }
}

export function* postVisit(action) {
    try {
        const data = yield call(() => postVisitService(action.payload.values));
        if (action.payload.planDate) {
            yield put(getVisits({ planDate: action.payload.planDate }));
        }
        yield put(postVisitsSuccess(data));
        if (data.successMessage) {
            showNotification(NOTIFICATION_TYPE.SUCCESS, data.successMessage);
        }
        if (data.errorMessage) {
            showNotification(NOTIFICATION_TYPE.ERROR, data.errorMessage);
        }
        if (data.existsPlanBuyers) {
            showNotification(NOTIFICATION_TYPE.ERROR, data.existsPlanBuyers);
        }
        if(action.payload.callBack){
            yield action.payload.callBack();    
        }
    } catch (error) {
        errorResponse(error, action.type);
        yield put(postVisitsFailure(error));
    }
}

export function* checkIn(action) {
    try {
        const message = yield call(() => checkInService(action.payload.id, action.payload.position));
        yield put(getVisits({ planDate: action.payload.planDate }));
        // yield put(checkInSuccess(data));
        yield showNotification(NOTIFICATION_TYPE.SUCCESS, message);
    } catch (error) {
        errorResponse(error, action.type);
        yield put(checkInFailure(error));
    }
}

export function* checkOut(action) {
    try {
        const message = yield call(() => checkOutService(action.payload.id, action.payload.remark));
        yield put(getVisits({ planDate: action.payload.planDate }));
        // yield put(checkOutSuccess(action.postData));
        yield showNotification(NOTIFICATION_TYPE.SUCCESS, message);
    } catch (error) {
        errorResponse(error, action.type);
        yield put(checkOutFailure(error));
    }
}

export function* cancelVisit(action) {
    try {
        const message = yield call(() => cancelVisitService(action.payload.id, action.payload.remark));
        yield put(getVisits({ planDate: action.payload.planDate }));
        yield put(cancelVisitSuccess(action.postData));
        showNotification(NOTIFICATION_TYPE.SUCCESS, message);
    } catch (error) {
        errorResponse(error, action.type);
        yield put(cancelVisitFailure(error));
    }
}

export function* reSchedule(action) {
    try {
        const response = yield call(() => reScheduleService(action.payload.visitId, action.payload.values));
        yield put(reScheduleVisitSuccess());
        yield put(getVisits({ planDate: action.payload.planDate }));
        yield action.payload.callBack();
        if (response.successMessage) {
            showNotification(NOTIFICATION_TYPE.SUCCESS, response.successMessage);
        } else if(response.existsPlanBuyers) {
            showNotification(NOTIFICATION_TYPE.SUCCESS, response.existsPlanBuyers);
        }
    } catch (error) {
        errorResponse(error, action.type);
        yield put(reScheduleVisitFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeLatest(GET_VISITS_INITIATE, getAllVisits);
    yield takeLatest(UNAPPROVED_VISITS_INITIATE, getUnapprovedVisits);
    yield takeLatest(POST_VISITS_INITIATE, postVisit);
    yield takeLatest(CHECK_IN_INITIATE, checkIn);
    yield takeLatest(CHECK_OUT_INITIATE, checkOut);
    yield takeLatest(CANCEL_VISITS_INITIATE, cancelVisit);
    yield takeLatest(RE_SCHEDULE_INITIATE, reSchedule);
}
