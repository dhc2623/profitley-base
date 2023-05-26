import { put, call, takeLatest } from 'redux-saga/effects';
import { GET_HOME_DATA_INITIATE, getHomeDataSuccess, getHomeDataFailure } from './Action';
import { errorResponse } from '../../helper/Utils';
import { getHomeDataService } from './Service';

export function* getHomeData(action) {
    try {
        const data = yield call(() => getHomeDataService());
        yield put(getHomeDataSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getHomeDataFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeLatest(GET_HOME_DATA_INITIATE, getHomeData);
}
