import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { USER_TYPE } from '../../config/Constant';
import { errorResponse } from '../../helper/Utils';
import {
    GET_STATE_INITIATE,
    getStateDataSuccess,
    getDataFailure,
    GET_CITIES_INITIATE,
    getCitiesDataSuccess,
    GET_DISTRICT_INITIATE,
    getDistrictDataSuccess,
    GET_USER_BY_ROLE_INITIATE,
    getDSPDataSuccess,
    getRetailerDataSuccess,
    GET_RETAILER_CATEGORIES_INITIATE,
    getRetailerCategoriesSuccess,
    getAllCategoriesSuccess,
    GET_ALL_CATEGORIES_INITIATE,
    getAllBrandsSuccess,
    getAllModelsSuccess,
    GET_ALL_MODELS_INITIATE,
    GET_ALL_BRANDS_INITIATE
} from './Action';
import {
    getStateService,
    getCityService,
    getDistrictService,
    getUserByRoleService,
    getRetailerCategorirsService,
    getAllCategorirsService,
    getBrandsService,
    getModelsService
} from './Service';

export function* getStateData(action) {
    try {
        const data = yield call(() => getStateService());
        yield put(getStateDataSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getDataFailure(error));
    }
}

export function* getCitiesData(action) {
    try {
        const data = yield call(() => getCityService(action.districtId));
        yield put(getCitiesDataSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getDataFailure(error));
    }
}

export function* getDistrictData(action) {
    try {
        const data = yield call(() => getDistrictService(action.stateId));
        yield put(getDistrictDataSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getDataFailure(error));
    }
}

export function* getUserByRoleData(action) {
    try {
        const data = yield call(() => getUserByRoleService(action.userType));
        if (action.userType == USER_TYPE.DSP) {
            yield put(getDSPDataSuccess(data));
        } else {
            yield put(getRetailerDataSuccess(data));
        }
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getDataFailure(error));
    }
}

export function* getRetailerCategoriesData(action) {
    try {
        const data = yield call(() => getRetailerCategorirsService());
        yield put(getRetailerCategoriesSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getDataFailure(error));
    }
}

export function* getAllCategoriesData(action) {
    try {
        const data = yield call(() => getAllCategorirsService());
        yield put(getAllCategoriesSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getDataFailure(error));
    }
}

export function* getAllBrandData(action) {
    try {
        const data = yield call(() => getBrandsService());
        yield put(getAllBrandsSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getDataFailure(error));
    }
}

export function* getAllModelData(action) {
    try {
        const data = yield call(() => getModelsService());
        yield put(getAllModelsSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getDataFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeEvery(GET_STATE_INITIATE, getStateData);
    yield takeEvery(GET_DISTRICT_INITIATE, getDistrictData);
    yield takeEvery(GET_CITIES_INITIATE, getCitiesData);
    yield takeEvery(GET_USER_BY_ROLE_INITIATE, getUserByRoleData);
    yield takeEvery(GET_RETAILER_CATEGORIES_INITIATE, getRetailerCategoriesData);
    yield takeEvery(GET_ALL_CATEGORIES_INITIATE, getAllCategoriesData);
    yield takeEvery(GET_ALL_MODELS_INITIATE, getAllModelData);
    yield takeEvery(GET_ALL_BRANDS_INITIATE, getAllBrandData);
}
