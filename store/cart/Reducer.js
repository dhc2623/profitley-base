import {
    GET_CART_INITIATE,
    GET_CART_FAILURE,
    GET_CART_SUCCESS,
    ADD_TO_CART_INITIATE,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    ADD_MULTI_ITEM_INITIATE,
    ADD_MULTI_ITEM_SUCCESS,
    ADD_MULTI_ITEM_FAILURE,
    UPDATE_TO_CART_INITIATE,
    REMOVE_FROM_CART_INITIATE,
    SELECT_RETAILER_INITIATE,
    SELECT_RETAILER_SUCCESS,
    SELECT_RETAILER_FAILURE,
    SET_RETAILER_DRAWER,
    SET_RETAILER_DRAWER_SUCCESS,
    CLEAR_CART_INITIATE,
    CLEAR_CART_SUCCESS,
    CLEAR_CART_FAILURE,
    ASSIGN_ORGANIZATION_INITIATE,
    ASSIGN_ORGANIZATION_SUCCESS,
    ASSIGN_ORGANIZATION_FAILURE,
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    cartDetails: {
        order_items: []
    },
    getRetailerLoading: true,
    getRetailerList: [],
    getRetailerMeta: {},
    retailerDrawer: false
};

/* Reducer for invoices */
export default function cartReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CART_INITIATE:
        case UPDATE_TO_CART_INITIATE:
        case REMOVE_FROM_CART_INITIATE:
        case ADD_MULTI_ITEM_INITIATE:
        case ADD_TO_CART_INITIATE:
        case CLEAR_CART_INITIATE:
        case ASSIGN_ORGANIZATION_INITIATE:
            return { ...state, loading: true };
        case GET_CART_SUCCESS:
            return { ...state, loading: false, cartDetails: action.payload };
        case CLEAR_CART_SUCCESS:
            return { ...state, loading: false, cartDetails: INITIAL_STATE.cartDetails };
        case ASSIGN_ORGANIZATION_SUCCESS:
        case ASSIGN_ORGANIZATION_FAILURE:
        case GET_CART_FAILURE:
        case CLEAR_CART_FAILURE:
            return { ...state, loading: false };
        case ADD_TO_CART_SUCCESS:
        case ADD_MULTI_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartDetails: action.payload
            };
        case ADD_TO_CART_FAILURE:
        case ADD_MULTI_ITEM_FAILURE:
            return { ...state, loading: false };
        case SELECT_RETAILER_INITIATE:
            return { ...state, getRetailerLoading: true };
        case SELECT_RETAILER_SUCCESS:
            return {
                ...state,
                getRetailerLoading: false,
                getRetailerList: action.payload.data,
                getRetailerMeta: action.payload.meta
            };
        case SELECT_RETAILER_FAILURE:
            return { ...state, getRetailerLoading: false };
        case SET_RETAILER_DRAWER:
            return { ...state, retailerDrawer: false };
        case SET_RETAILER_DRAWER_SUCCESS:
            return { ...state, retailerDrawer: action.payload };
        default:
            return state;
    }
}
