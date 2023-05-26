export const GET_HOME_DATA_INITIATE = 'GET_HOME_DATA_INITIATE';
export const GET_HOME_DATA_SUCCESS = 'GET_HOME_DATA_SUCCESS';
export const GET_HOME_DATA_FAILURE = 'GET_HOME_DATA_FAILURE';

export const getHomeData = (params) => ({
    type: GET_HOME_DATA_INITIATE,
    params
});

export const getHomeDataSuccess = (data) => ({
    type: GET_HOME_DATA_SUCCESS,
    payload: data
});

export const getHomeDataFailure = (data) => ({
    type: GET_HOME_DATA_FAILURE,
    payload: data
});
