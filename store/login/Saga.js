import _ from 'lodash';
import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    LOGIN_INITIATE,
    loginSuccess,
    loginFailure,
    FORGOT_PASSWORD_INITIATE,
    forgotPasswordFailure,
    forgotPasswordSuccess,
    RETAILER_SIGNUP_INITIATE,
    retailerSignupSuccess,
    retailerSignupFailure
} from './Action';
import {
    postLogin,
    postForgotPassword,
    retailerSignupService
} from './Service';
import { setAuthToken, setUserDetails } from '../../helper/AuthActions';
import {  APP_URL } from '../../config/Constant';
import {  errorResponse } from '../../helper/Utils';
import { UPDATE_CURRENT_USER } from '../currentUser/Action';
import { setFavouriteIds } from '../favourite/Action';
import { meService } from '../auth/Service';

export function* login(action) {
    try {
        let param = action.param;
        var bodyFormData = new FormData();
        bodyFormData.append('username', param.username);
        bodyFormData.append('password', param.password);
        const data = yield call(() => postLogin(bodyFormData));
        yield setAuthToken(data.token);
        const me = yield call(() => meService(data.token));
        let appData = {};
        appData.General = _.keyBy(me.settings.General, 'code');
        yield localStorage.setItem('appData', JSON.stringify(appData));
        yield localStorage.setItem('navigation', JSON.stringify(me.navigation));
        yield delete data.token;
        yield delete data.navigation;
        yield put({ type: UPDATE_CURRENT_USER, action: data });
        // yield delete data.permissions;
        yield delete data.address;
        yield setUserDetails(data);
        yield put(setFavouriteIds(data.favouriteListIds ? data.favouriteListIds : []));
        yield put(loginSuccess());
        action.callback(data);
    } catch (error) {
        errorResponse(error, action.type);
        yield put(loginFailure());
    }
}

export function* forgotPassword(action) {
    try {
        let param = action.param;
        var bodyFormData = new FormData();
        bodyFormData.append('email', param.email);
        bodyFormData.append('appUrl', `${APP_URL}/reset-password`);
        const data = yield call(() => postForgotPassword(bodyFormData));
        yield put(forgotPasswordSuccess());
        action.callback(data.success.message);
    } catch (error) {
        errorResponse(error, action.type);
        yield put(forgotPasswordFailure());
    }
}

export function* retailerSignup(action) {
    try {
        const data = yield call(() => retailerSignupService(action.postData));
        yield put(retailerSignupSuccess());
        yield action.callback();
    } catch (error) {
        errorResponse(error, action.type);
        yield put(retailerSignupFailure());
    }
}

//watchers
export default function* watchList() {
    yield takeLatest(LOGIN_INITIATE, login);
    yield takeLatest(FORGOT_PASSWORD_INITIATE, forgotPassword);
    yield takeLatest(RETAILER_SIGNUP_INITIATE, retailerSignup);
}
