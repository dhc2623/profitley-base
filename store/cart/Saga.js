import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Q } from '@nozbe/watermelondb';

import {
    GET_CART_INITIATE,
    getCartSuccess,
    getCartFailure,
    ADD_TO_CART_INITIATE,
    addToCartSuccess,
    addToCartFailure,
    UPDATE_TO_CART_INITIATE,
    REMOVE_FROM_CART_INITIATE,
    getRetailerForCartSuccess,
    getRetailerForCartFailure,
    SELECT_RETAILER_INITIATE,
    setRetailerDrawer,
    setRetailerDrawerSuccess,
    SET_RETAILER_DRAWER,
    ADD_MULTI_ITEM_INITIATE,
    addMultiItemSuccess,
    addMultiItemFailure,
    getCart,
    CLEAR_CART_INITIATE,
    clearCartSuccess,
    clearCartFailure,
    ASSIGN_ORGANIZATION_INITIATE,
    assignRetailerSuccess,
    assignRetailerFailure
} from './Action';
import {
    getCartListService,
    addToCartService,
    updateToCartService,
    removeFromCartService,
    getRetailerSelectionService,
    addMultipleItemsToCartService,
    clearCartService,
    assignOrganizationService
} from './Service';
import {
    convertStringPriceintoFloat,
    errorResponse,
    getConfirmPromise,
    getDataInCookies,
    setDataInCookies,
    showNotification
} from '../../helper/Utils';
import { NOTIFICATION_TYPE, USER_ROLES } from '../../config/Constant';
import { langs } from '../../localization';
import { checkUserRole, getUserDetails } from '../../helper/AuthActions';
import { removeOrderFailureMessage } from '../order/Action';
import localDb from '../../config/localDb';
const { confirm } = Modal;

export function* getCartlist(action) {
    try {
        const data = yield call(() => getCartListService());
        yield put(getCartSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getCartFailure(error));
    }
}

// wrap
export function* addToCart(action) {
    try {
        let postData = {
            item_id: action.product.id,
            original_price: action.product.regular_price,
            price: convertStringPriceintoFloat(action.product.price),
            quantity: action.product.quantity,
            sku_code: action.product.sku_code,
            moq: action.product.moq
        };

        if (getUserDetails().role.name != USER_ROLES.BUYER.name) {
            if (getDataInCookies('selectedRetailer')) {
                const data = yield call(() => addToCartService(postData));
                yield put(addToCartSuccess(data));
                yield put(removeOrderFailureMessage());
                showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.addedToCart);
            } else {
                const confi = yield getConfirmPromise({
                    title: 'Select Buyer',
                    content: 'Please select the buyer first before add product in cart.'
                });
                if (confi) {
                    yield put(setRetailerDrawer(true));
                }
            }
        } else {
            const data = yield call(() => addToCartService(postData));
            yield put(addToCartSuccess(data));
            yield put(removeOrderFailureMessage());
            showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.addedToCart);
        }
    } catch (error) {
        errorResponse(error, action.type);
        yield put(addToCartFailure(error));
    }
}

export function* addMultipleItems(action) {
    try {
        const data = yield call(() => addMultipleItemsToCartService(action.postData));
        yield put(getCart());
        yield put(addMultiItemSuccess(data));
        yield put(removeOrderFailureMessage());
        showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.multiaddedToCart);
    } catch (error) {
        errorResponse(error, action.type);
        yield put(addMultiItemFailure(error));
    }
}

export function* clearCartItems(action) {
    try {
        const data = yield call(() => clearCartService(action.params));
        yield put(getCart());
        yield put(clearCartSuccess());
        yield put(removeOrderFailureMessage());
    } catch (error) {
        errorResponse(error, action.type);
        yield put(clearCartFailure(error));
    }
}

export function* updateToCart(action) {
    try {
        const data = yield call(() => updateToCartService(action.postData));
        yield put(addToCartSuccess(data));
        yield put(removeOrderFailureMessage());
        showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.updatedInCart);
    } catch (error) {
        errorResponse(error, action.type);
        yield put(addToCartFailure(error));
    }
}

export function* removeFromCart(action) {
    try {
        const data = yield call(() => removeFromCartService(action.postData));
        yield put(addToCartSuccess(data));
        yield put(removeOrderFailureMessage());
        showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.removedFromCart);
    } catch (error) {
        errorResponse(error, action.type);
        yield put(addToCartFailure(error));
    }
}

export function* getRetailerSelection(action) {
    const term = action.params ? action.params.searchKey : ''
    try {
        
        const db = yield localDb();
        const dbFetch = yield db
            .get('buyers')
            .query(
               
                Q.or(
                    Q.where(
                        'shop_name',
                        Q.like(`%${Q.sanitizeLikeString(term)}%`)
                    ),
                    Q.where(
                        'full_name',
                        Q.like(`%${Q.sanitizeLikeString(term)}%`)
                    )
                )
            )
            .fetch();
        yield put(getRetailerForCartSuccess({ data: dbFetch }));
        // const data = yield call(() => getRetailerSelectionService(action.params));
        // yield put(getRetailerForCartSuccess(data));
    } catch (error) {
        errorResponse(error, action.type);
        yield put(getRetailerForCartFailure(error));
    }
}

export function* selectRetailerForPlaceOrder(action) {
    try {
        yield put(setRetailerDrawerSuccess(action.payload));
    } catch (error) {
        errorResponse(error, action.type);
    }
}

export function* assignRetailerToBuyer(action) {
    try {
        const data = yield call(() => assignOrganizationService(action.payload));
        yield put(assignRetailerSuccess());
    } catch (error) {
        errorResponse(error, action.type);
        yield put(assignRetailerFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeLatest(GET_CART_INITIATE, getCartlist);
    yield takeLatest(ADD_TO_CART_INITIATE, addToCart);
    yield takeLatest(UPDATE_TO_CART_INITIATE, updateToCart);
    yield takeLatest(REMOVE_FROM_CART_INITIATE, removeFromCart);
    yield takeLatest(SELECT_RETAILER_INITIATE, getRetailerSelection);
    yield takeLatest(SET_RETAILER_DRAWER, selectRetailerForPlaceOrder);
    yield takeLatest(ADD_MULTI_ITEM_INITIATE, addMultipleItems);
    yield takeLatest(CLEAR_CART_INITIATE, clearCartItems);
    yield takeLatest(ASSIGN_ORGANIZATION_INITIATE, assignRetailerToBuyer);
}
