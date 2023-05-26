import { put, call, takeLatest } from 'redux-saga/effects';
import {
    GET_FAV_LIST_INITIATE,
    getFavouriteSuccess,
    getFavouriteFailure,
    ADD_TO_FAVOURITE_INITIATE,
    addToFavouriteSuccess,
    addToFavouriteFailure,
    REMOVE_FROM_FAVOURITE_INITIATE,
    removeFromFavouriteSuccess,
    removeFromFavouriteFailure
} from './Action';
import { getFavouriteService, addToFavouriteService, removeFromFavouriteService } from './Service';
import { errorResponse, showNotification } from '../../helper/Utils';
import { NOTIFICATION_TYPE } from '../../config/Constant';
import { langs } from '../../localization';

export function* getFavourite() {
    try {
        const data = yield call(() => getFavouriteService());
        yield put(getFavouriteSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getFavouriteFailure(error));
    }
}

export function* addToFavourite(action) {
    try {
        let isAdd = true;
        const ids = action.favouriteIds;
        const prodId = action.payload;
        const index = ids.indexOf(prodId.toString());
        if (index === -1) {
            ids.push(prodId.toString());
        } else {
            ids.splice(index, 1);
            isAdd = false;
        }

        if (isAdd) {
            yield call(() => addToFavouriteService(prodId));
        } else {
            yield call(() => removeFromFavouriteService(prodId));
        }
        yield put(addToFavouriteSuccess(ids));
        showNotification(
            NOTIFICATION_TYPE.SUCCESS,
            isAdd
                ? langs.notificationMessages.addedToFavourite
                : langs.notificationMessages.removedToFavourite
        );

        if (action.callback) {
            action.callback();
        }
    } catch (error) {
        errorResponse(error, action.type);
        yield put(addToFavouriteFailure(error));
    }
}

export function* removeFromFavourite(action) {
    try {
        yield call(() => removeFromFavouriteService(action.id));
        yield put(removeFromFavouriteSuccess(action.id));
        showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.removedToFavourite);
    } catch (error) {
        errorResponse(error, action.type);
        yield put(removeFromFavouriteFailure(error));
    }
}
//watchers
export default function* watchList() {
    yield takeLatest(GET_FAV_LIST_INITIATE, getFavourite);
    yield takeLatest(ADD_TO_FAVOURITE_INITIATE, addToFavourite);
    yield takeLatest(REMOVE_FROM_FAVOURITE_INITIATE, removeFromFavourite);
}
