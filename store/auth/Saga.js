import { put, call, all, takeEvery } from 'redux-saga/effects';
import { ME_INITIATE, meSuccess, meFailure, ME_UPDATE_INITIATE } from './Action';
import { meService } from './Service';
import { setUserDetails } from '../../helper/AuthActions';
import { errorResponse } from '../../helper/Utils';
import { setFavouriteIds } from '../favourite/Action';
import { getProductsMeta } from '../product/Action';
import { getCart } from '../cart/Action';

export function* me(action) {
    try {
        const data = yield call(() => meService());
        let appData = {};
        appData.General = _.keyBy(data.settings.General, 'code');
        appData.Ecommerce = _.keyBy(data.settings.Ecommerce, 'code');
        yield localStorage.setItem('appData', JSON.stringify(appData));

        data && setUserDetails(data.user);
        yield all([
            put(getProductsMeta()),
            put(setFavouriteIds(data.favouriteIds ? data.favouriteIds : [])),
            put(getCart())
        ]);
        yield put(meSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(meFailure(error));
    }
}

export function* meUpdate(action, updateItems = {}) {
    const defaultOptions = {
        updateProductMeta: false,
        updateFavouriteIds: false,
        updateCart: false,
        ...updateItems
    };
    try {
        const data = yield call(() => meService());
        let appData = {};
        appData.General = _.keyBy(data.settings.General, 'code');
        appData.Ecommerce = _.keyBy(data.settings.Ecommerce, 'code');
        yield localStorage.setItem('appData', JSON.stringify(appData));

        data && setUserDetails(data.user);
        yield all([
            defaultOptions.updateProductMeta && put(getProductsMeta()),
            defaultOptions.updateFavouriteIds &&
                put(setFavouriteIds(data.favouriteIds ? data.favouriteIds : [])),
            defaultOptions.updateCart && put(getCart())
        ]);
        yield put(meSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(meFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeEvery(ME_INITIATE, me);
    yield takeEvery(ME_UPDATE_INITIATE, meUpdate);
}
