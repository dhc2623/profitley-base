export const GET_DASHBOARD_DATA_INITIATE = 'GET_DASHBOARD_DATA_INITIATE';
export const GET_DASHBOARD_DATA_SUCCESS = 'GET_DASHBOARD_DATA_SUCCESS';
export const GET_DASHBOARD_DATA_FAILURE = 'GET_DASHBOARD_DATA_FAILURE';

export const GET_SELLER_SUMMARY_INITIATE = 'GET_SELLER_SUMMARY_INITIATE';
export const GET_SELLER_SUMMARY_SUCCESS = 'GET_SELLER_SUMMARY_SUCCESS';
export const GET_SELLER_SUMMARY_FAILURE = 'GET_SELLER_SUMMARY_FAILURE';

export const GET_SUMMARY_INITIATE = 'GET_SUMMARY_INITIATE';
export const GET_SUMMARY_SUCCESS = 'GET_SUMMARY_SUCCESS';
export const GET_SUMMARY_FAILURE = 'GET_SUMMARY_FAILURE';

export const getDashboardData = (params) => ({
    type: GET_DASHBOARD_DATA_INITIATE,
    date:params.date,
    role: params.role
});

export const getDashboardDataSuccess = (data) => ({
    type: GET_DASHBOARD_DATA_SUCCESS,
    payload: data
});

export const getDashboardDataFailure = (data) => ({
    type: GET_DASHBOARD_DATA_FAILURE,
    payload: data
});

export const getSellerSummary = (params) => ({
    type: GET_SELLER_SUMMARY_INITIATE,
    params
});

export const getSellerSummarySuccess = (data) => ({
    type: GET_SELLER_SUMMARY_SUCCESS,
    payload: data
});

export const getSellerSummaryFailure = (data) => ({
    type: GET_SELLER_SUMMARY_FAILURE,
    payload: data
});

export const getSummary = (params) => ({
    type: GET_SUMMARY_INITIATE,
    date:params.date,
    role: params.role
});

export const getSummarySuccess = (data) => ({
    type: GET_SUMMARY_SUCCESS,
    payload: data
});

export const getSummaryFailure = (data) => ({
    type: GET_SUMMARY_FAILURE,
    payload: data
});
