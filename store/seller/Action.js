export const GET_DISTRIBUTOR_DETAILS_INITIATE = 'GET_DISTRIBUTOR_DETAILS_INITIATE';
export const GET_DISTRIBUTOR_DETAILS_SUCCESS = 'GET_DISTRIBUTOR_DETAILS_SUCCESS ';
export const GET_DISTRIBUTOR_DETAILS_FAILURE = 'GET_DISTRIBUTOR_DETAILS_FAILURE ';

export const GET_SELLERS_INITIATE = 'GET_SELLERS_INITIATE';
export const GET_SELLERS_SUCCESS = 'GET_SELLERS_SUCCESS ';
export const GET_SELLERS_FAILURE = 'GET_SELLERS_FAILURE ';

export const SET_SELLER_INITIATE = 'SET_SELLER_INITIATE';
export const SET_SELLER_SUCCESS = 'SET_SELLER_SUCCESS ';
export const SET_SELLER_FAILURE = 'SET_SELLER_FAILURE ';

export const SET_SELLER_DRAWER = 'SET_SELLER_DRAWER';
export const SET_SELLER_DRAWER_SUCCESS = 'SET_SELLER_DRAWER_SUCCESS';

export const getDistributorDetails = (params) => ({
    type: GET_DISTRIBUTOR_DETAILS_INITIATE,
    params
});

export const getDistributorDetailsSuccess = (payload) => ({
    type: GET_DISTRIBUTOR_DETAILS_SUCCESS,
    payload
});

export const getDistributorDetailsFailure = (data) => ({
    type: GET_DISTRIBUTOR_DETAILS_FAILURE,
    payload: data
});

export const getSellers = (params) => ({
    type: GET_SELLERS_INITIATE,
    params
});

export const getSellersSuccess = (payload) => ({
    type: GET_SELLERS_SUCCESS,
    payload
});

export const getSellersFailure = (data) => ({
    type: GET_SELLERS_FAILURE,
    payload: data
});

export const setSeller = (params) => ({
    type: SET_SELLER_INITIATE,
    params
});

export const setSellerSuccess = (payload) => ({
    type: SET_SELLER_SUCCESS,
    payload
});

export const setSellerFailure = (data) => ({
    type: SET_SELLER_FAILURE,
    payload: data
});

export const setSellerDrawer = (data) => ({
    type: SET_SELLER_DRAWER,
    payload: data
});

export const setSellerDrawerSuccess = (data) => ({
    type: SET_SELLER_DRAWER_SUCCESS,
    payload: data
});
