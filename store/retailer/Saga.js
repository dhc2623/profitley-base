import { put, call, takeLatest } from 'redux-saga/effects';
import { NOTIFICATION_TYPE, paginationMeta, USER_TYPE } from '../../config/Constant';
import localDb from '../../config/localDb';
import { Q } from '@nozbe/watermelondb';

import { removeLabelFromFilterObj } from '../../helper/FilterUtils';
import { errorResponse, showNotification } from '../../helper/Utils';
import { langs } from '../../localization';
import {
    GET_RETAILER_LIST_INITIATE,
    getRetailerListSuccess,
    getRetailerListFailure,
    GET_RETAILER_DETAILS_INITIATE,
    getRetailerDetailsSuccess,
    getRetailerDetailsFailure,
    GET_RETAILER_INSIGHTS_INITIATE,
    getRetailerInsightsSuccess,
    getRetailerInsightsFailure,
    GET_RETAILER_ORDERS_INITIATE,
    getRetailerOrdersSuccess,
    getRetailerOrdersFailure,
    GET_RETAILER_LEDGER_INITIATE,
    getRetailerLedgerSuccess,
    getRetailerLedgerFailure,
    GET_RETAILER_INVOICE_INITIATE,
    getRetailerInvoiceSuccess,
    getRetailerInvoiceFailure,
    GET_RETAILER_VISITS_INITIATE,
    getRetailerVisitsSuccess,
    getRetailerVisitsFailure,
    GET_BUYERS_ADDRESS_INITIATE,
    getRetailerAddressSuccess,
    getRetailerAddressFailure,
    getRetailerCollectionSuccess,
    getRetailerCollectionFailure,
    GET_RETAILER_COLLECTION_INITIATE,
    UPDATE_RETAILER_COLLECTION_INITIATE,
    updateRetailerCollectionSuccess,
    updateRetailerCollectionFailure,
    getRetailerCollection
} from './Action';
import {
    getDetailsService,
    getRetailerInsightsService,
    getRetailerListService,
    getUserAddressService,
    getOrdersService,
    getLedgerService,
    getInvoiceService,
    getVisitsService,
    getCollectionService,
    postCollectionService,
    putCollectionService
} from './Service';
import _ from 'lodash';

export function* getRetailerList(action) {
    const tarms = removeLabelFromFilterObj({ ...action.params });
    console.log(tarms.sort);
    try {
        const db = yield localDb();
        const dbFetch = yield db
            .get('buyers')
            .query(
                Q.or(Q.where('shop_name', Q.like(`%${tarms.shop_name ? tarms.shop_name : ''}%`))),
                Q.or(Q.where('full_name', Q.like(`%${tarms.full_name ? tarms.full_name : ''}%`))),
                Q.or(Q.where('mobile', Q.like(`%${tarms.mobile ? tarms.mobile : ''}%`))),
                Q.or(Q.where('category', Q.like(`%${tarms.category ? tarms.category : ''}%`)))
            )
            .fetch();

        const fatchOrder = tarms.sort
            ? _.orderBy(dbFetch, tarms.sort.substring(1), tarms.sort[0] == '+' ? 'asc' : 'desc')
            : dbFetch;
        yield put(
            getRetailerListSuccess({
                data: fatchOrder,
                meta: { ...paginationMeta, pagination: { total: fatchOrder.length } }
            })
        );

        // const data = yield call(() =>
        //     getRetailerListService(removeLabelFromFilterObj({ ...action.params }))
        // );
        // yield put(getRetailerListSuccess(data));
    } catch (error) {
        console.log(error);
        errorResponse(error, action.type);
        yield put(getRetailerListFailure(error));
    }
}

export function* getRetailerDetails(action) {
    try {
        const data = yield call(() => getDetailsService(action.retailerId));
        if (action.callback) {
            action.callback(data);
        }
        yield put(getRetailerDetailsSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getRetailerDetailsFailure(error));
    }
}

export function* getRetailerInsights(action) {
    try {
        const data = yield call(() => getRetailerInsightsService(action));
        yield put(getRetailerInsightsSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getRetailerInsightsFailure(error));
    }
}

export function* getRetailerOrders(action) {
    try {
        const data = yield call(() => getOrdersService(removeLabelFromFilterObj(action.params)));
        yield put(getRetailerOrdersSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getRetailerOrdersFailure(error));
    }
}

export function* getLedger(action) {
    try {
        const data = yield call(() => getLedgerService(action.params));
        yield put(getRetailerLedgerSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getRetailerLedgerFailure(error));
    }
}

export function* getInvoice(action) {
    try {
        const data = yield call(() => getInvoiceService(action.params));
        yield put(getRetailerInvoiceSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getRetailerInvoiceFailure(error));
    }
}

export function* getVisits(action) {
    try {
        const data = yield call(() => getVisitsService(action.retailerId, action.params));
        yield put(getRetailerVisitsSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getRetailerVisitsFailure(error));
    }
}

export function* getCollection(action) {
    try {
        const data = yield call(() => getCollectionService(action.retailerId, action.params));
        yield put(getRetailerCollectionSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getRetailerCollectionFailure(error));
    }
}

export function* updateCollection(action) {
    const { params, retailerId } = action;
    try {
        let data;
        if (params.collected_id) {
            data = yield call(() => putCollectionService(params.collected_id, params));
            yield showNotification(
                NOTIFICATION_TYPE.SUCCESS,
                langs.notificationMessages.collectionUpdated
            );
        } else {
            data = yield call(() => postCollectionService(params));
            yield showNotification(
                NOTIFICATION_TYPE.SUCCESS,
                langs.notificationMessages.collectionAdded
            );
        }
        yield put(updateRetailerCollectionSuccess(data));
        yield put(getRetailerCollection(retailerId));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(updateRetailerCollectionFailure(error));
    }
}

export function* getAddress(action) {
    try {
        const data = yield call(() => getUserAddressService(action.buyerId));
        yield put(getRetailerAddressSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getRetailerAddressFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeLatest(GET_RETAILER_LIST_INITIATE, getRetailerList);
    yield takeLatest(GET_RETAILER_DETAILS_INITIATE, getRetailerDetails);
    yield takeLatest(GET_RETAILER_INSIGHTS_INITIATE, getRetailerInsights);
    yield takeLatest(GET_RETAILER_ORDERS_INITIATE, getRetailerOrders);
    yield takeLatest(GET_RETAILER_LEDGER_INITIATE, getLedger);
    yield takeLatest(GET_RETAILER_INVOICE_INITIATE, getInvoice);
    yield takeLatest(GET_RETAILER_VISITS_INITIATE, getVisits);
    yield takeLatest(GET_RETAILER_COLLECTION_INITIATE, getCollection);
    yield takeLatest(UPDATE_RETAILER_COLLECTION_INITIATE, updateCollection);
    yield takeLatest(GET_BUYERS_ADDRESS_INITIATE, getAddress);
}
