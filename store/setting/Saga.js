import { put, call, takeEvery } from 'redux-saga/effects';
import { NOTIFICATION_TYPE } from '../../config/Constant';
import { showNotification } from '../../helper/Utils';
import { langs } from '../../localization';
import {
    GET_SETTINGS_INITIATE,
    getSettingsSuccess,
    getSettingsFailure,
    UPDATE_SETTINGS_INITIATE,
    updateSettingsSuccess,
    updateSettingsFailure
} from './Action';
import { getSettingsService, updateSettingsService } from './Service';

export function* getSettings(action) {
    try {
        const data = yield call(() => getSettingsService());
        yield put(getSettingsSuccess(data));
    } catch (error) {
        yield put(getSettingsFailure(error));
    }
}

export function* updateSettings(action) {
    try {
        const data = yield call(() => updateSettingsService(action.postData));
        showNotification(
            NOTIFICATION_TYPE.SUCCESS,
            langs.notificationMessages.homesettingsUpdated,
            action.notificationMessage
        );
        yield put(updateSettingsSuccess(data));
    } catch (error) {
        yield put(updateSettingsFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeEvery(GET_SETTINGS_INITIATE, getSettings);
    yield takeEvery(UPDATE_SETTINGS_INITIATE, updateSettings);
}
