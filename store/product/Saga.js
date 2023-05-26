import { put, call, takeEvery, takeLatest, all } from 'redux-saga/effects';
import {
    GET_PRODUCTS_LIST_INITIATE,
    getProductsListSuccess,
    getProductsListFailure,
    GET_PRODUCT_DETAILS_INITIATE,
    getProductDetailsSuccess,
    getProductDetailsFailure,
    GET_PRODUCTS_META_LIST_INITIATE,
    getProductsMetaSuccess,
    getProductsMetaFailure,
    getProductsListNextPage,
    quickViewSuccess,
    QUICK_VIEW_INITIATE
} from './Action';
import {
    getProductsListService,
    getProductDetailsService,
    getProductsMetaBrands,
    getProductsMetaCategories,
    getProductsMetaModels,
    getProductsMetaSegments,
    getProductsMetaManufacturers
} from './Service';
import { errorResponse } from '../../helper/Utils';
import { removeLabelFromFilterObj } from '../../helper/FilterUtils';
import localDb from '../../config/localDb';

export function* getProducts(action) {
    try {
        const data = yield call(() =>
            getProductsListService(removeLabelFromFilterObj({ ...action.payload }))
        );
        if (action.page && action.page > 1) {
            yield put(getProductsListNextPage(data));
        } else {
            yield put(getProductsListSuccess(data));
        }
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getProductsListFailure(error));
    }
}

export function* getProductDetails(action) {
    try {
        const data = yield call(() => getProductDetailsService(action.productId));
        yield put(getProductDetailsSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getProductDetailsFailure(error));
    }
}

export function* getProductsMeta(action) {
    try {
        const db = yield localDb();
       
        const [brandsData, categoriesData, modelsData, segmentsData, manufacturersData] = yield all(
            [
                db.get('brands').query().fetch(),
                db.get('categories').query().fetch(),
                db.get('models').query().fetch(),
                db.get('segments').query().fetch(),
                db.get('manufacturers').query().fetch(),
                // call(() => getProductsMetaTags()),
            ]
        );
        yield put(
            getProductsMetaSuccess({
                brandsData:{ success: { data: brandsData } },
                categoriesData:{ success: { data: categoriesData } },
                modelsData:{ success: { data: modelsData } },
                segmentsData:{ success: { data: segmentsData } },
                manufacturersData:{ success: { data: manufacturersData } }
            })
        );
        // const [brandsData, categoriesData, modelsData, segmentsData, manufacturersData] = yield all(
        //     [
        //         call(() => getProductsMetaBrands()),
        //         call(() => getProductsMetaCategories()),
        //         call(() => getProductsMetaModels()),
        //         call(() => getProductsMetaSegments()),
        //         call(() => getProductsMetaManufacturers()),
        //         // call(() => getProductsMetaTags()),
        //     ]
        // );
        // yield put(
        //     getProductsMetaSuccess({
        //         brandsData,
        //         categoriesData,
        //         modelsData,
        //         segmentsData,
        //         manufacturersData
        //     })
        // );
       
    } catch (error) {
        console.log(error)
        errorResponse(error, action.type);
        yield put(getProductsMetaFailure(error));
    }
}

export function* quickView(action) {
    try {
        yield put(quickViewSuccess(action.payload));
    } catch (error) {
        errorResponse(error, action.type);
    }
}

//watchers
export default function* watchList() {
    yield takeLatest(GET_PRODUCTS_LIST_INITIATE, getProducts);
    yield takeLatest(GET_PRODUCT_DETAILS_INITIATE, getProductDetails);
    yield takeLatest(GET_PRODUCTS_META_LIST_INITIATE, getProductsMeta);
    yield takeLatest(QUICK_VIEW_INITIATE, quickView);
}
