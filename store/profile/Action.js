export const UPDATE_PROFILE_INITIATE = 'UPDATE_PROFILE_INITIATE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
export const ADD_ADDRESS_INITIATE = 'ADD_ADDRESS_INITIATE';
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS';
export const ADD_ADDRESS_FAILURE = 'ADD_ADDRESS_FAILURE';
export const UPDATE_ADDRESS_INITIATE = 'UPDATE_ADDRESS_INITIATE';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE';
// export const GET_PROFILE_INITIATE = 'GET_PROFILE_INITIATE';
// export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
// export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
export const DELETE_ADDRESS_INITIATE = 'DELETE_ADDRESS_INITIATE';
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_FAILURE = 'DELETE_ADDRESS_FAILURE';
export const UPDATE_PASSWORD_INITIATE = 'UPDATE_PASSWORD_INITIATE';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';
export const RESET_PASSWORD_INITIATE = 'RESET_PASSWORD_INITIATE';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const FCM_TOKEN_INITIATE = 'FCM_TOKEN_INITIATE';

// export const getProfile = (params) => ({
//     type: GET_PROFILE_INITIATE,
//     params
// });

// export const getProfileSuccess = (data) => ({
//     type: GET_PROFILE_SUCCESS,
//     payload: data
// });

// export const getProfileFailure = (data) => ({
//     type: GET_PROFILE_FAILURE,
//     payload: data
// });

export const updateProfile = (params) => ({
    type: UPDATE_PROFILE_INITIATE,
    params
});

export const updateProfileSuccess = (data) => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload: data
});

export const updateProfileFailure = (data) => ({
    type: UPDATE_PROFILE_FAILURE,
    payload: data
});

export const addAddress = (params) => ({
    type: ADD_ADDRESS_INITIATE,
    params
});

export const addAddressSuccess = (data) => ({
    type: ADD_ADDRESS_SUCCESS,
    payload: data
});

export const addAddressFailure = (data) => ({
    type: ADD_ADDRESS_FAILURE,
    payload: data
});

export const updateAddress = (params) => ({
    type: UPDATE_ADDRESS_INITIATE,
    params
});

export const updateAddressSuccess = (data) => ({
    type: UPDATE_ADDRESS_SUCCESS,
    payload: data
});

export const updateAddressFailure = (data) => ({
    type: UPDATE_ADDRESS_FAILURE,
    payload: data
});

export const deleteAddress = (params) => ({
    type: DELETE_ADDRESS_INITIATE,
    params
});

export const deleteAddressSuccess = (data) => ({
    type: DELETE_ADDRESS_SUCCESS,
    payload: data
});

export const deleteAddressFailure = (data) => ({
    type: DELETE_ADDRESS_FAILURE,
    payload: data
});

export const changePassword = (params) => ({
    type: UPDATE_PASSWORD_INITIATE,
    params
});

export const changePasswordSuccess = (data) => ({
    type: UPDATE_PASSWORD_SUCCESS,
    payload: data
});

export const changePasswordFailure = (data) => ({
    type: UPDATE_PASSWORD_FAILURE,
    payload: data
});

export const setFCMToken = (params) => ({
    type: FCM_TOKEN_INITIATE,
    params
});

export const resetPassword = (params) => ({
    type: RESET_PASSWORD_INITIATE,
    params
});

export const resetPasswordSuccess = (data) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: data
});

export const resetPasswordFailure = (data) => ({
    type: RESET_PASSWORD_FAILURE,
    payload: data
});
