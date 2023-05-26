import { put, call, takeLatest } from 'redux-saga/effects';
import {
    GET_ORDERS_LIST_INITIATE,
    getOrdersListSuccess,
    getOrdersListFailure,
    getOrderDetailsSuccess,
    getOrderDetailsFailure,
    GET_ORDER_DETAILS_INITIATE,
    POST_ORDER_INITIATE,
    postOrderSuccess,
    postOrderFailure,
    CANCEL_ORDER_INITIATE,
    cancelOrderSuccess,
    cancelOrderFailure
} from './Action';
import {
    getOrdersListService,
    getOrderDetailsService,
    placeOrderService,
    cancelOrderService,
    postOrderNotificationService,

} from './Service';
import { errorResponse, formatToCurrency, showNotification } from '../../helper/Utils';
import { NOTIFICATION_TYPE } from '../../config/Constant';
import { removeLabelFromFilterObj } from '../../helper/FilterUtils';

import { langs } from '../../localization';
import { checkBuyerCreditLimit } from '../cart/Service';
import { accessCriditLimit } from '../cart/Action';

export function* getOrders(action) {
    try {
        const data = yield call(() =>
            getOrdersListService(removeLabelFromFilterObj({ ...action.payload }))
        );
        yield put(getOrdersListSuccess(data.success));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getOrdersListFailure(error));
    }
}

export function* getOrderDetails(action) {
    try {
        const data = yield call(() => getOrderDetailsService(action.orderId));
        yield put(getOrderDetailsSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getOrderDetailsFailure(error));
    }
}

export function* placeOrder(action) {
    try {
        if (action.postData.userIdLimit) {
            const getLimit = yield call(() => checkBuyerCreditLimit(action.postData.userIdLimit));
            if (parseFloat(getLimit.creditLimit) > parseFloat(action.postData.amount)) {
                const data = yield call(() => placeOrderService(action.postData));
                yield put(postOrderSuccess(data.success));
                showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.orderSuccessfull);
                action.callback(data.success);
                yield call(() => postOrderNotificationService({ order_ids: data.success.order_ids }));
            } else {
                yield put(postOrderFailure(`You have crossed the remaining credit limit, please place order less than ${formatToCurrency(getLimit.creditLimit)}`));
            }
        } else {
            const data = yield call(() => placeOrderService(action.postData));
            yield put(postOrderSuccess(data.success));
            showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.orderSuccessfull);
            action.callback(data.success);
            yield call(() => postOrderNotificationService({ order_ids: data.success.order_ids }));
        }
    } catch (error) {
        if(error.response.status == 403){
            yield put(postOrderFailure(error.response.data.error));
        }else{
            errorResponse(error, action.type);
            yield put(postOrderFailure(''));
        }
        
    }
}

export function* cancelOrder(action) {
    try {
        const data = yield call(() => cancelOrderService(action.postData));
        yield put(cancelOrderSuccess(action.postData));
        showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.orderCancelled);
    } catch (error) {
        errorResponse(error, action.type);
        yield put(cancelOrderFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeLatest(GET_ORDERS_LIST_INITIATE, getOrders);
    yield takeLatest(GET_ORDER_DETAILS_INITIATE, getOrderDetails);
    yield takeLatest(POST_ORDER_INITIATE, placeOrder);
    yield takeLatest(CANCEL_ORDER_INITIATE, cancelOrder);
}
