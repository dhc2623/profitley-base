import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_BANNERS_DATA_INITIATE, getBannersDataSuccess, getBannersDataFailure } from './Action';
import { getBannersDataService } from './Service';

export function* getBannersData(action) {
    try {
        const data = yield call(() => getBannersDataService());
        yield put(getBannersDataSuccess(data));
    } catch (error) {
        yield put(getBannersDataFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeEvery(GET_BANNERS_DATA_INITIATE, getBannersData);
}
