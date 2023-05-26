export const GET_BANNERS_DATA_INITIATE = 'GET_BANNERS_DATA_INITIATE';
export const GET_BANNERS_DATA_SUCCESS = 'GET_BANNERS_DATA_SUCCESS';
export const GET_BANNERS_DATA_FAILURE = 'GET_BANNERS_DATA_FAILURE';

export const getBannersData = (params) => ({
    type: GET_BANNERS_DATA_INITIATE,
    params
});

export const getBannersDataSuccess = (data) => ({
    type: GET_BANNERS_DATA_SUCCESS,
    payload: data
});

export const getBannersDataFailure = (data) => ({
    type: GET_BANNERS_DATA_FAILURE,
    payload: data
});
