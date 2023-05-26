export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

export const getCurrentUser = (params) => ({
    type: GET_CURRENT_USER,
    params
});

export const updateCurrentUser = (params) => ({
    type: UPDATE_CURRENT_USER,
    params
});
