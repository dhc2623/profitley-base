import { put, call, takeEvery } from 'redux-saga/effects';
import { NOTIFICATION_TYPE } from '../../config/Constant';
import { showNotification } from '../../helper/Utils';
import { langs } from '../../localization';
import { CONTACT_REQUEST_INITIATE, contactRequestSuccess, contactRequestFailure } from './Action';
import { contactRequestService } from './Service';

export function* contactRequest(action) {
    try {
        const data = yield call(() => contactRequestService(action.postData));
        action.form.resetFields(['subject', 'message']);
        action.router.push('contact-us/thankyou');
        yield put(contactRequestSuccess(data));
    } catch (error) {
        yield put(contactRequestFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeEvery(CONTACT_REQUEST_INITIATE, contactRequest);
}
