export const GET_RETAILER_LIST_INITIATE = 'GET_RETAILER_LIST_INITIATE';
export const GET_RETAILER_LIST_SUCCESS = 'GET_RETAILER_LIST_SUCCESS ';
export const GET_RETAILER_LIST_FAILURE = 'GET_RETAILER_LIST_FAILURE ';

export const GET_RETAILER_DETAILS_INITIATE = 'GET_RETAILER_DETAILS_INITIATE';
export const GET_RETAILER_DETAILS_SUCCESS = 'GET_RETAILER_DETAILS_SUCCESS ';
export const GET_RETAILER_DETAILS_FAILURE = 'GET_RETAILER_DETAILS_FAILURE ';

export const GET_RETAILER_INSIGHTS_INITIATE = 'GET_RETAILER_INSIGHTS_INITIATE';
export const GET_RETAILER_INSIGHTS_SUCCESS = 'GET_RETAILER_INSIGHTS_SUCCESS ';
export const GET_RETAILER_INSIGHTS_FAILURE = 'GET_RETAILER_INSIGHTS_FAILURE ';

export const GET_RETAILER_ORDERS_INITIATE = 'GET_RETAILER_ORDERS_INITIATE';
export const GET_RETAILER_ORDERS_SUCCESS = 'GET_RETAILER_ORDERS_SUCCESS ';
export const GET_RETAILER_ORDERS_FAILURE = 'GET_RETAILER_ORDERS_FAILURE ';

export const GET_RETAILER_LEDGER_INITIATE = 'GET_RETAILER_LEDGER_INITIATE';
export const GET_RETAILER_LEDGER_SUCCESS = 'GET_RETAILER_LEDGER_SUCCESS ';
export const GET_RETAILER_LEDGER_FAILURE = 'GET_RETAILER_LEDGER_FAILURE ';

export const GET_RETAILER_INVOICE_INITIATE = 'GET_RETAILER_INVOICE_INITIATE';
export const GET_RETAILER_INVOICE_SUCCESS = 'GET_RETAILER_INVOICE_SUCCESS ';
export const GET_RETAILER_INVOICE_FAILURE = 'GET_RETAILER_INVOICE_FAILURE ';

export const GET_RETAILER_VISITS_INITIATE = 'GET_RETAILER_VISITS_INITIATE';
export const GET_RETAILER_VISITS_SUCCESS = 'GET_RETAILER_VISITS_SUCCESS ';
export const GET_RETAILER_VISITS_FAILURE = 'GET_RETAILER_VISITS_FAILURE ';

export const GET_BUYERS_ADDRESS_INITIATE = 'GET_BUYERS_ADDRESS_INITIATE';
export const GET_BUYERS_ADDRESS_SUCCESS = 'GET_BUYERS_ADDRESS_SUCCESS';
export const GET_BUYERS_ADDRESS_FAILURE = 'GET_BUYERS_ADDRESS_FAILURE';

export const GET_RETAILER_COLLECTION_INITIATE = 'GET_RETAILER_COLLECTION_INITIATE';
export const GET_RETAILER_COLLECTION_SUCCESS = 'GET_RETAILER_COLLECTION_SUCCESS ';
export const GET_RETAILER_COLLECTION_FAILURE = 'GET_RETAILER_COLLECTION_FAILURE ';

export const UPDATE_RETAILER_COLLECTION_INITIATE = 'UPDATE_RETAILER_COLLECTION_INITIATE';
export const UPDATE_RETAILER_COLLECTION_SUCCESS = 'UPDATE_RETAILER_COLLECTION_SUCCESS ';
export const UPDATE_RETAILER_COLLECTION_FAILURE = 'UPDATE_RETAILER_COLLECTION_FAILURE ';


export const getRetailerList = (params) => ({
    type: GET_RETAILER_LIST_INITIATE,
    params
});

export const getRetailerListSuccess = (payload) => ({
    type: GET_RETAILER_LIST_SUCCESS,
    payload
});

export const getRetailerListFailure = (data) => ({
    type: GET_RETAILER_LIST_FAILURE,
    payload: data
});

export const getRetailerDetails = (params) => ({
    type: GET_RETAILER_DETAILS_INITIATE,
    params
});

export const getRetailerDetailsSuccess = (payload) => ({
    type: GET_RETAILER_DETAILS_SUCCESS,
    payload
});

export const getRetailerDetailsFailure = (data) => ({
    type: GET_RETAILER_DETAILS_FAILURE,
    payload: data
});

export const getRetailerInsights = (params ={}) => ({
    type: GET_RETAILER_INSIGHTS_INITIATE,
    ...params
});

export const getRetailerInsightsSuccess = (payload) => ({
    type: GET_RETAILER_INSIGHTS_SUCCESS,
    payload
});

export const getRetailerInsightsFailure = (data) => ({
    type: GET_RETAILER_INSIGHTS_FAILURE,
    payload: data
});

export const getRetailerOrders = (params) => ({
    type: GET_RETAILER_ORDERS_INITIATE,
    params
});

export const getRetailerOrdersSuccess = (payload) => ({
    type: GET_RETAILER_ORDERS_SUCCESS,
    payload
});

export const getRetailerOrdersFailure = (data) => ({
    type: GET_RETAILER_ORDERS_FAILURE,
    payload: data
});

export const getRetailerLedger = (params) => ({
    type: GET_RETAILER_LEDGER_INITIATE,
    params
});

export const getRetailerLedgerSuccess = (payload) => ({
    type: GET_RETAILER_LEDGER_SUCCESS,
    payload
});

export const getRetailerLedgerFailure = (data) => ({
    type: GET_RETAILER_LEDGER_FAILURE,
    payload: data
});

export const getRetailerInvoice = (params) => ({
    type: GET_RETAILER_INVOICE_INITIATE,
    params
});

export const getRetailerInvoiceSuccess = (payload) => ({
    type: GET_RETAILER_INVOICE_SUCCESS,
    payload
});

export const getRetailerInvoiceFailure = (data) => ({
    type: GET_RETAILER_INVOICE_FAILURE,
    payload: data
});

export const getRetailerVisits = (retailerId, params = {}) => ({
    type: GET_RETAILER_VISITS_INITIATE,
    params,
    retailerId
});

export const getRetailerVisitsSuccess = (payload) => ({
    type: GET_RETAILER_VISITS_SUCCESS,
    payload
});

export const getRetailerVisitsFailure = (data) => ({
    type: GET_RETAILER_VISITS_FAILURE,
    payload: data
});

export const getRetailerCollection = (retailerId, params = {}) => ({
    type: GET_RETAILER_COLLECTION_INITIATE,
    params,
    retailerId
});

export const getRetailerCollectionSuccess = (payload) => ({
    type: GET_RETAILER_COLLECTION_SUCCESS,
    payload
});

export const getRetailerCollectionFailure = (data) => ({
    type: GET_RETAILER_COLLECTION_FAILURE,
    payload: data
});

export const updateRetailerCollection = (retailerId, params = {}) => ({
    type: UPDATE_RETAILER_COLLECTION_INITIATE,
    params,
    retailerId,
});

export const updateRetailerCollectionSuccess = (payload) => ({
    type: UPDATE_RETAILER_COLLECTION_SUCCESS,
    payload
});

export const updateRetailerCollectionFailure = (data) => ({
    type: UPDATE_RETAILER_COLLECTION_FAILURE,
    payload: data
});

export const getRetailerAddress = (params) => ({
    type: GET_BUYERS_ADDRESS_INITIATE,
    params
});

export const getRetailerAddressSuccess = (payload) => ({
    type: GET_BUYERS_ADDRESS_SUCCESS,
    payload
});

export const getRetailerAddressFailure = (data) => ({
    type: GET_BUYERS_ADDRESS_FAILURE,
    payload: data
});
