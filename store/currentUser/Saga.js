import { put, call, takeLatest } from 'redux-saga/effects';
import { UPDATE_CURRENT_USER, GET_CURRENT_USER, updateCurrentUser } from './Action';
import { setUserDetails } from '../../helper/AuthActions';
import { errorResponse, showNotification } from '../../helper/Utils';
import { NOTIFICATION_TYPE } from '../../config/Constant';
import { langs } from '../../localization';

export function* updateProfile(action) {
    // try {
    // 	yield put(updateProfileSuccess());
    // } catch (error) {
    // 	errorResponse(error);
    // 	yield put(updateProfileFailure());
    // }
}

export function* getProfile(action) {
    // try {
    // 	const data = yield call(() => getProfileService());
    // 	data && setUserDetails(data);
    // 	yield put(updateCurrentUser(data));
    // } catch (error) {
    // 	errorResponse(error);
    // 	yield put(getProfileFailure(error));
    // }
}

//watchers
export default function* watchList() {
    yield takeLatest(UPDATE_CURRENT_USER, updateProfile);
    yield takeLatest(GET_CURRENT_USER, getProfile);
}
