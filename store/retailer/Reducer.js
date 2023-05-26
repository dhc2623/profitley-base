import { paginationMeta } from '../../config/Constant';
import {
    GET_RETAILER_LIST_INITIATE,
    GET_RETAILER_LIST_SUCCESS,
    GET_RETAILER_LIST_FAILURE,
    GET_RETAILER_DETAILS_INITIATE,
    GET_RETAILER_DETAILS_SUCCESS,
    GET_RETAILER_DETAILS_FAILURE,
    GET_RETAILER_INSIGHTS_INITIATE,
    GET_RETAILER_INSIGHTS_SUCCESS,
    GET_RETAILER_INSIGHTS_FAILURE,
    GET_RETAILER_ORDERS_INITIATE,
    GET_RETAILER_ORDERS_SUCCESS,
    GET_RETAILER_ORDERS_FAILURE,
    GET_RETAILER_LEDGER_INITIATE,
    GET_RETAILER_LEDGER_SUCCESS,
    GET_RETAILER_LEDGER_FAILURE,
    GET_RETAILER_INVOICE_INITIATE,
    GET_RETAILER_INVOICE_SUCCESS,
    GET_RETAILER_INVOICE_FAILURE,
    GET_RETAILER_VISITS_INITIATE,
    GET_RETAILER_VISITS_SUCCESS,
    GET_RETAILER_VISITS_FAILURE,
    GET_BUYERS_ADDRESS_INITIATE,
    GET_BUYERS_ADDRESS_SUCCESS,
    GET_BUYERS_ADDRESS_FAILURE,
    GET_RETAILER_COLLECTION_INITIATE,
    GET_RETAILER_COLLECTION_SUCCESS,
    GET_RETAILER_COLLECTION_FAILURE,
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    retailerList: [],
    retailerListMeta: paginationMeta,
    retailerOrderList: [],
    retailerOrderListMeta: paginationMeta,
    retailerDetails: {},
    retailerInsights: {
        user:{}
    },
    retailerAddress: [],
    ledgerDetails: {
        ledger: []
    },
    ledgerMeta: paginationMeta,
    invoiceDetails: {
        invoice: []
    },
    invoiceMeta: paginationMeta,
    visitsDetails:[],
    visitsMeta: paginationMeta,
    retailerCollection: [],
    retailerCollectionMeta: paginationMeta
};

/* Reducer for invoices */
export default function retailerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_RETAILER_LIST_INITIATE:
        case GET_RETAILER_DETAILS_INITIATE:
        case GET_RETAILER_INSIGHTS_INITIATE:
        case GET_RETAILER_ORDERS_INITIATE:
        case GET_RETAILER_LEDGER_INITIATE:
        case GET_RETAILER_INVOICE_INITIATE:
        case GET_RETAILER_VISITS_INITIATE:
        case GET_RETAILER_COLLECTION_INITIATE:
        case GET_BUYERS_ADDRESS_INITIATE:
            return { ...state, loading: true };
        case GET_RETAILER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                retailerList: action.payload.data,
                retailerListMeta: action.payload.meta
            };
        case GET_RETAILER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                retailerDetails: action.payload
            };
        case GET_RETAILER_INSIGHTS_SUCCESS:
            return {
                ...state,
                loading: false,
                retailerInsights: action.payload
            };
        case GET_RETAILER_LEDGER_SUCCESS:
            return {
                ...state,
                loading: false,
                ledgerMeta: action.payload.meta,
                ledgerDetails: action.payload
            };
        case GET_RETAILER_INVOICE_SUCCESS:
            return {
                ...state,
                loading: false,
                invoiceMeta: action.payload.meta,
                invoiceDetails: action.payload
            };
        case GET_RETAILER_VISITS_SUCCESS:
            return {
                ...state,
                loading: false,
                visitsDetails: action.payload.data,
                visitsMeta: action.payload.meta
            };
        case GET_RETAILER_COLLECTION_SUCCESS:
            return {
                ...state,
                loading: false,
                retailerCollection: action.payload.data,
                retailerCollectionMeta: action.payload.meta
            };
        case GET_RETAILER_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                retailerOrders: action.payload
            };
        case GET_BUYERS_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: false,
                retailerAddress: action.payload
            };
        case GET_RETAILER_LIST_FAILURE:
        case GET_RETAILER_DETAILS_FAILURE:
        case GET_RETAILER_INSIGHTS_FAILURE:
        case GET_RETAILER_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                retailerOrderList: action.payload.data,
                retailerOrderListMeta: action.payload.meta
            };
        case GET_RETAILER_LEDGER_FAILURE:
        case GET_RETAILER_INVOICE_FAILURE:
        case GET_RETAILER_VISITS_FAILURE:
        case GET_RETAILER_COLLECTION_FAILURE:
        case GET_BUYERS_ADDRESS_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
