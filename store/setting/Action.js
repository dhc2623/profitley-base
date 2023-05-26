export const GET_SETTINGS_INITIATE = 'GET_SETTINGS_INITIATE';
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
export const GET_SETTINGS_FAILURE = 'GET_SETTINGS_FAILURE';

export const UPDATE_SETTINGS_INITIATE = 'UPDATE_SETTINGS_INITIATE';
export const UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS';
export const UPDATE_SETTINGS_FAILURE = 'UPDATE_SETTINGS_FAILURE';

export const getSettings = (params) => ({
    type: GET_SETTINGS_INITIATE,
    params
});

export const getSettingsSuccess = (data) => ({
    type: GET_SETTINGS_SUCCESS,
    payload: data
});

export const getSettingsFailure = (data) => ({
    type: GET_SETTINGS_FAILURE,
    payload: data
});

export const updateSettings = (params) => ({
    type: UPDATE_SETTINGS_INITIATE,
    params
});

export const updateSettingsSuccess = (data) => ({
    type: UPDATE_SETTINGS_SUCCESS,
    payload: data
});

export const updateSettingsFailure = (data) => ({
    type: UPDATE_SETTINGS_FAILURE,
    payload: data
});
