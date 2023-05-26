import {
    GET_ORDERS_LIST_INITIATE,
    GET_ORDERS_LIST_FAILURE,
    GET_ORDERS_LIST_SUCCESS,
    GET_ORDER_DETAILS_INITIATE,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_FAILURE,
    POST_ORDER_INITIATE,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILURE,
    POST_ORDER_FAILURE_MESSAGE,
    CANCEL_ORDER_INITIATE,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAILURE
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    orderList: [],
    orderListMeta: {
        pagination: {
            total: 0,
            count: 0,
            per_page: 0,
            current_page: 1,
            total_pages: 1,
            links: {}
        }
    },
    orderDetails: {
        items: []
    },
    lastPlacedOrder: {},
    placedOrderErrorMessage: '',
    placedOrderLoading: false
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ORDERS_LIST_INITIATE:
        case CANCEL_ORDER_INITIATE:
            return { ...state, loading: true };
        case GET_ORDERS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orderList: action.payload.data,
                orderListMeta: action.payload.meta
            };
        case GET_ORDERS_LIST_FAILURE:
            return { ...state, loading: false };
        case CANCEL_ORDER_SUCCESS:
            let temp = state.orderDetails;
            temp.status = action.payload.status;
            let list = [...state.orderList];
            list.map((order) => {
                if (order.id == action.payload.order_id) {
                    order.status = action.payload.status;
                }
            });
            return { ...state, loading: false, orderDetails: temp, orderList: list };
        case GET_ORDER_DETAILS_INITIATE:
            return { ...state, loading: true };
        case GET_ORDER_DETAILS_SUCCESS:
            // let details = action.payload.order;
            // details.items = action.payload.items;
            return { ...state, loading: false, orderDetails: action.payload };
        case GET_ORDER_DETAILS_FAILURE:
            return { ...state, loading: false };
        case POST_ORDER_INITIATE:
            return { ...state, placedOrderLoading: true };
        case POST_ORDER_SUCCESS:
            return {
                ...state,
                placedOrderLoading: false,
                lastPlacedOrder: action.payload,
                placedOrderErrorMessage: ''
            };
        case POST_ORDER_FAILURE:
            return { ...state, placedOrderLoading: false, placedOrderErrorMessage: action.payload };
        case POST_ORDER_FAILURE_MESSAGE:
            return { ...state, placedOrderLoading: false, placedOrderErrorMessage: '' };
        case CANCEL_ORDER_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
