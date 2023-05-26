export const GET_CATEGORIES_LIST_INITIATE = 'GET_CATEGORIES_LIST_INITIATE';
export const GET_CATEGORIES_LIST_SUCCESS = 'GET_CATEGORIES_LIST_SUCCESS';
export const GET_CATEGORIES_LIST_FAILURE = 'GET_CATEGORIES_LIST_FAILURE';

export const GET_PARENT_CATEGORIES_INITIATE = 'GET_PARENT_CATEGORIES_INITIATE';
export const GET_PARENT_CATEGORIES_SUCCESS = 'GET_PARENT_CATEGORIES_SUCCESS';
export const GET_PARENT_CATEGORIES_FAILURE = 'GET_PARENT_CATEGORIES_FAILURE';

export const GET_SUB_CATEGORIES_INITIATE = 'GET_SUB_CATEGORIES_INITIATE';
export const GET_SUB_CATEGORIES_SUCCESS = 'GET_SUB_CATEGORIES_SUCCESS';
export const GET_SUB_CATEGORIES_FAILURE = 'GET_SUB_CATEGORIES_FAILURE';

export const getCategoriesList = (params) => ({
    type: GET_CATEGORIES_LIST_INITIATE,
    params
});

export const getCategoriesListSuccess = (data) => ({
    type: GET_CATEGORIES_LIST_SUCCESS,
    payload: data
});

export const getCategoriesListFailure = (data) => ({
    type: GET_CATEGORIES_LIST_FAILURE,
    payload: data
});

export const getParentCategoriesList = (params) => ({
    type: GET_PARENT_CATEGORIES_INITIATE,
    params
});

export const getParentCategoriesListSuccess = (data) => ({
    type: GET_PARENT_CATEGORIES_SUCCESS,
    payload: data
});

export const getParentCategoriesListFailure = (data) => ({
    type: GET_PARENT_CATEGORIES_FAILURE,
    payload: data
});

export const getSubCategoriesList = (params) => ({
    type: GET_SUB_CATEGORIES_INITIATE,
    params
});

export const getSubCategoriesListSuccess = (data) => ({
    type: GET_SUB_CATEGORIES_SUCCESS,
    payload: data
});

export const getSubCategoriesListFailure = (data) => ({
    type: GET_SUB_CATEGORIES_FAILURE,
    payload: data
});
