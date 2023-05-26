export const GET_DSP_LIST_INITIATE = 'GET_DSP_LIST_INITIATE';
export const GET_DSP_LIST_SUCCESS = 'GET_DSP_LIST_SUCCESS ';
export const GET_DSP_LIST_FAILURE = 'GET_DSP_LIST_FAILURE ';

export const GET_DSP_DETAILS_INITIATE = 'GET_DSP_DETAILS_INITIATE';
export const GET_DSP_DETAILS_SUCCESS = 'GET_DSP_DETAILS_SUCCESS ';
export const GET_DSP_DETAILS_FAILURE = 'GET_DSP_DETAILS_FAILURE ';

export const ASSIGN_RETAILER_TO_DSP_INITIATE = 'ASSIGN_RETAILER_TO_DSP_INITIATE';
export const ASSIGN_RETAILER_TO_DSP_SUCCESS = 'ASSIGN_RETAILER_TO_DSP_SUCCESS ';
export const ASSIGN_RETAILER_TO_DSP_FAILURE = 'ASSIGN_RETAILER_TO_DSP_FAILURE ';

export const CHANGE_STATUS_INITIATE = 'CHANGE_STATUS_INITIATE';
export const CHANGE_STATUS_SUCCESS = 'CHANGE_STATUS_SUCCESS ';
export const CHANGE_STATUS_FAILURE = 'CHANGE_STATUS_FAILURE ';

export const GET_DSP_INSIGHTS_INITIATE = 'GET_DSP_INSIGHTS_INITIATE';
export const GET_DSP_INSIGHTS_SUCCESS = 'GET_DSP_INSIGHTS_SUCCESS ';
export const GET_DSP_INSIGHTS_FAILURE = 'GET_DSP_INSIGHTS_FAILURE ';

export const getDSPList = (params) => ({
    type: GET_DSP_LIST_INITIATE,
    params
});

export const getDSPListSuccess = (payload) => ({
    type: GET_DSP_LIST_SUCCESS,
    payload
});

export const getDSPListFailure = (data) => ({
    type: GET_DSP_LIST_FAILURE,
    payload: data
});

export const getDSPDetails = (params) => ({
    type: GET_DSP_DETAILS_INITIATE,
    params
});

export const getDSPDetailsSuccess = (payload) => ({
    type: GET_DSP_DETAILS_SUCCESS,
    payload
});

export const getDSPDetailsFailure = (data) => ({
    type: GET_DSP_DETAILS_FAILURE,
    payload: data
});

export const assignRetailer = (params) => ({
    type: ASSIGN_RETAILER_TO_DSP_INITIATE,
    params
});

export const assignRetailerSuccess = (payload) => ({
    type: ASSIGN_RETAILER_TO_DSP_SUCCESS,
    payload
});

export const assignRetailerFailure = (data) => ({
    type: ASSIGN_RETAILER_TO_DSP_FAILURE,
    payload: data
});

export const changeStatus = (params) => ({
    type: CHANGE_STATUS_INITIATE,
    params
});

export const changeStatusSuccess = (payload) => ({
    type: CHANGE_STATUS_SUCCESS,
    payload
});

export const changeStatusFailure = (data) => ({
    type: CHANGE_STATUS_FAILURE,
    payload: data
});

export const getDSPInsights = (params) => ({
    type: GET_DSP_INSIGHTS_INITIATE,
    params
});

export const getDSPInsightsSuccess = (payload) => ({
    type: GET_DSP_INSIGHTS_SUCCESS,
    payload
});

export const getDSPInsightsFailure = (data) => ({
    type: GET_DSP_INSIGHTS_FAILURE,
    payload: data
});
