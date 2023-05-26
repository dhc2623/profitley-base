import {
    GET_DISTRIBUTOR_DETAILS_INITIATE,
    GET_DISTRIBUTOR_DETAILS_SUCCESS,
    GET_DISTRIBUTOR_DETAILS_FAILURE,
    GET_SELLERS_INITIATE,
    GET_SELLERS_SUCCESS,
    GET_SELLERS_FAILURE,
    SET_SELLER_DRAWER,
    SET_SELLER_DRAWER_SUCCESS
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    distributorDetails: {},
    sellers: [],
    sellersDrawer: false
};

/* Reducer for invoices */
export default function sellerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_DISTRIBUTOR_DETAILS_INITIATE:
        case GET_SELLERS_INITIATE:
            return { ...state, loading: true };
        case GET_DISTRIBUTOR_DETAILS_SUCCESS:
        case GET_SELLERS_SUCCESS:
            return {
                ...state,
                loading: false,
                distributorDetails: action.payload,
                sellers: action.payload.success
            };
        case GET_DISTRIBUTOR_DETAILS_FAILURE:
        case GET_SELLERS_FAILURE:
            return {
                ...state,
                loading: false
            };
        case SET_SELLER_DRAWER:
            return { ...state, sellersDrawer: false };
        case SET_SELLER_DRAWER_SUCCESS:
            return { ...state, sellersDrawer: action.payload };
        default:
            return state;
    }
}
