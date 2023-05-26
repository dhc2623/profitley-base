import {
    GET_DASHBOARD_DATA_INITIATE,
    GET_DASHBOARD_DATA_FAILURE,
    GET_DASHBOARD_DATA_SUCCESS,
    GET_SELLER_SUMMARY_INITIATE,
    GET_SELLER_SUMMARY_SUCCESS,
    GET_SELLER_SUMMARY_FAILURE,
    GET_SUMMARY_INITIATE,
    GET_SUMMARY_SUCCESS,
    GET_SUMMARY_FAILURE
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    sellerSummaryloading: false,
    dashboardData: {},
    sellerSummary: {
        averageOrder: '0.00',
        totalOrders: 0,
        totalSales: '0.00'
    },
    summary: {}
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_DASHBOARD_DATA_INITIATE:
        case GET_SUMMARY_INITIATE:
            return { ...state, loading: true };
        case GET_SELLER_SUMMARY_INITIATE:
            return { ...state, sellerSummaryloading: true };
        case GET_DASHBOARD_DATA_SUCCESS:
            return { ...state, loading: false, dashboardData: action.payload };
        case GET_SELLER_SUMMARY_SUCCESS:
            return { ...state, sellerSummaryloading: false, sellerSummary: action.payload };
        case GET_SUMMARY_SUCCESS:
            return { ...state, loading: false, summary: action.payload };
        case GET_DASHBOARD_DATA_FAILURE:
        case GET_SUMMARY_FAILURE:
            return { ...state, loading: false };
        case GET_SELLER_SUMMARY_FAILURE:
            return { ...state, sellerSummaryloading: false };
        default:
            return state;
    }
}
