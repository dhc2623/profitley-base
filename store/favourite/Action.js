export const SET_FAV_LIST = 'SET_FAV_LIST';
export const GET_FAV_LIST_INITIATE = 'GET_FAV_LIST_INITIATE';
export const GET_FAV_LIST_SUCCESS = 'GET_FAV_LIST_SUCCESS';
export const GET_FAV_LIST_FAILURE = 'GET_FAV_LIST_FAILURE';
export const ADD_TO_FAVOURITE_INITIATE = 'ADD_TO_FAVOURITE_INITIATE';
export const ADD_TO_FAVOURITE_SUCCESS = 'ADD_TO_FAVOURITE_SUCCESS';
export const ADD_TO_FAVOURITE_FAILURE = 'ADD_TO_FAVOURITE_FAILURE';

export const REMOVE_FROM_FAVOURITE_INITIATE = 'REMOVE_FROM_FAVOURITE_INITIATE';
export const REMOVE_FROM_FAVOURITE_SUCCESS = 'REMOVE_FROM_FAVOURITE_SUCCESS';
export const REMOVE_FROM_FAVOURITE_FAILURE = 'REMOVE_FROM_FAVOURITE_FAILURE';

export const setFavouriteIds = (data) => ({
    type: SET_FAV_LIST,
    payload: data
});

export const getFavourite = (params) => ({
    type: GET_FAV_LIST_INITIATE,
    params
});

export const getFavouriteSuccess = (data) => ({
    type: GET_FAV_LIST_SUCCESS,
    payload: data
});

export const getFavouriteFailure = (data) => ({
    type: GET_FAV_LIST_FAILURE,
    payload: data
});

export const addToFavourite = (params) => ({
    type: ADD_TO_FAVOURITE_INITIATE,
    params
});

export const addToFavouriteSuccess = (data) => ({
    type: ADD_TO_FAVOURITE_SUCCESS,
    payload: data
});

export const addToFavouriteFailure = (data) => ({
    type: ADD_TO_FAVOURITE_FAILURE,
    payload: data
});

export const removeFromFavourite = (params) => ({
    type: REMOVE_FROM_FAVOURITE_INITIATE,
    params
});
export const removeFromFavouriteSuccess = (params) => ({
    type: REMOVE_FROM_FAVOURITE_SUCCESS,
    params
});
export const removeFromFavouriteFailure = (params) => ({
    type: REMOVE_FROM_FAVOURITE_FAILURE,
    params
});
