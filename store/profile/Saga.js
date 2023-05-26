import { put, call, takeEvery } from 'redux-saga/effects';
import {
    UPDATE_PROFILE_INITIATE,
    updateProfileSuccess,
    updateProfileFailure,
    ADD_ADDRESS_INITIATE,
    addAddressSuccess,
    addAddressFailure,
    UPDATE_ADDRESS_INITIATE,
    updateAddressSuccess,
    updateAddressFailure,
    // GET_PROFILE_INITIATE,
    // getProfileSuccess,
    // getProfileFailure,
    DELETE_ADDRESS_INITIATE,
    deleteAddressSuccess,
    deleteAddressFailure,
    UPDATE_PASSWORD_INITIATE,
    changePasswordSuccess,
    changePasswordFailure,
    RESET_PASSWORD_INITIATE,
    resetPasswordSuccess,
    resetPasswordFailure,
    FCM_TOKEN_INITIATE
} from './Action';
import {
    postUpdateProfile,
    postAddress,
    updateAddressService,
    getProfileService,
    deleteAddressService,
    updatePasswordService,
    updateFCMTokenService,
    resetPasswordService
} from './Service';
import { setUserDetails } from '../../helper/AuthActions';
import { errorResponse, showNotification } from '../../helper/Utils';
import { NOTIFICATION_TYPE } from '../../config/Constant';
import { langs } from '../../localization';
import { meUpdate } from '../auth/Action';

export function* updateProfile(action) {
    try {
        const data = yield call(() => postUpdateProfile(action.postData));
        setUserDetails(data);
        showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.profileUpdated);
        yield put(meUpdate()); 
        yield put(updateProfileSuccess());
    } catch (error) {
        errorResponse(error, action.type);
        yield put(updateProfileFailure());
    }
}

export function* addAddress(action) {
    try {
        const param = action.param;
        const data = yield call(() => postAddress(param));
        yield put(meUpdate()); 
        yield showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.addressAdded);
        yield put(addAddressSuccess());
        yield action.callback(data.address);
    } catch (error) {
        errorResponse(error, action.type);
        yield put(addAddressFailure());
    }
}

export function* updateAddress(action) {
    try {
        const data = yield call(() => updateAddressService(action.id, action.param));
        yield put(meUpdate()); 
        yield put(updateAddressSuccess());
        yield action.callback();
    } catch (error) {
        errorResponse(error, action.type);
        yield put(updateAddressFailure());
    }
}

// export function* getProfile(action) {
//     try {
//         const data = yield call(() => getProfileService());
//         let appData = {}
//         appData.General = _.keyBy(data.settings.General, 'code');
//         yield localStorage.setItem('appData', JSON.stringify(appData));
//         data && setUserDetails(data.user);
//         yield put(setFavouriteIds(data.favouriteListIds ? data.favouriteListIds : []));
//         yield put(getProfileSuccess(data.user));
//     } catch (error) {
//         errorResponse(error);
//         yield put(getProfileFailure(error));
//     }
// }

export function* deleteAddress(action) {
    try {
        const data = yield call(() => deleteAddressService(action.id));
        yield put(meUpdate()); 
        action.callback();
        yield put(deleteAddressSuccess());
    } catch (error) {
        errorResponse(error, action.type);
        yield put(deleteAddressFailure());
    }
}

export function* updatePassword(action) {
    try {
        const data = yield call(() => updatePasswordService(action.postData));
        showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.passwordUpdated);
        action.router.push('/');
        action.form.resetFields();
        yield put(changePasswordSuccess());
    } catch (error) {
        errorResponse(error, action.type);
        yield put(changePasswordFailure());
    }
}

export function* resetPassword(action) {
    try {
        const data = yield call(() => resetPasswordService(action.postData));
        showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.passwordUpdated);
        // action.router.push('/login');
        action.form.resetFields();
        yield put(resetPasswordSuccess());
    } catch (error) {
        errorResponse(error, action.type);
        yield put(resetPasswordFailure());
    }
}

export function* setFCMToken(action) {
    try {
        yield call(() => updateFCMTokenService(action.token));
    } catch (error) {
        errorResponse(error, action.type);
    }
}

//watchers
export default function* watchList() {
    yield takeEvery(UPDATE_PROFILE_INITIATE, updateProfile);
    yield takeEvery(ADD_ADDRESS_INITIATE, addAddress);
    yield takeEvery(UPDATE_ADDRESS_INITIATE, updateAddress);
    // yield takeEvery(GET_PROFILE_INITIATE, getProfile);
    yield takeEvery(DELETE_ADDRESS_INITIATE, deleteAddress);
    yield takeEvery(UPDATE_PASSWORD_INITIATE, updatePassword);
    yield takeEvery(RESET_PASSWORD_INITIATE, resetPassword);
    yield takeEvery(FCM_TOKEN_INITIATE, setFCMToken);
}
