export const GET_STATE_INITIATE = 'GET_STATE_INITIATE';
export const GET_CITIES_INITIATE = 'GET_CITIES_INITIATE';
export const GET_DISTRICT_INITIATE = 'GET_DISTRICT_INITIATE';
export const GET_USER_BY_ROLE_INITIATE = 'GET_USER_BY_ROLE_INITIATE';
export const GET_RETAILER_CATEGORIES_INITIATE = 'GET_RETAILER_CATEGORIES_INITIATE';
export const GET_ALL_CATEGORIES_INITIATE = 'GET_ALL_CATEGORIES_INITIATE';
export const GET_ALL_BRANDS_INITIATE = 'GET_ALL_BRANDS_INITIATE';
export const GET_ALL_MODELS_INITIATE = 'GET_ALL_MODELS_INITIATE';

export const GET_STATE_SUCCESS = 'GET_STATE_SUCCESS ';
export const GET_CITIES_SUCCESS = 'GET_CITIES_SUCCESS ';
export const GET_DISTRICT_SUCCESS = 'GET_DISTRICT_SUCCESS ';
export const GET_DSP_DATA_SUCCESS = 'GET_DSP_DATA_SUCCESS ';
export const GET_RETAILER_DATA_SUCCESS = 'GET_RETAILER_DATA_SUCCESS';
export const GET_RETAILER_CATEGORIES_SUCCESS = 'GET_RETAILER_CATEGORIES_SUCCESS';
export const GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS';
export const GET_ALL_BRANDS_SUCCESS = 'GET_ALL_BRANDS_SUCCESS';
export const GET_ALL_MODELS_SUCCESS = 'GET_ALL_MODELS_SUCCESS';

export const FAILURE = 'GET_HOME_DATA_FAILURE';

export const getStateData = (params) => ({
    type: GET_STATE_INITIATE,
    params
});

export const getCitiesData = (data) => ({
    type: GET_CITIES_INITIATE,
    payload: data
});

export const getDistrictData = (data) => ({
    type: GET_DISTRICT_INITIATE,
    payload: data
});

export const getUserByRoleData = (params) => ({
    type: GET_USER_BY_ROLE_INITIATE,
    params
});

export const getStateDataSuccess = (payload) => ({
    type: GET_STATE_SUCCESS,
    payload
});

export const getCitiesDataSuccess = (payload) => ({
    type: GET_CITIES_SUCCESS,
    payload
});

export const getDistrictDataSuccess = (data) => ({
    type: GET_DISTRICT_SUCCESS,
    payload: data
});

export const getDSPDataSuccess = (payload) => ({
    type: GET_DSP_DATA_SUCCESS,
    payload
});

export const getRetailerDataSuccess = (payload) => ({
    type: GET_RETAILER_DATA_SUCCESS,
    payload
});

export const getRetailerCategories = (payload) => ({
    type: GET_RETAILER_CATEGORIES_INITIATE,
    payload
});

export const getRetailerCategoriesSuccess = (payload) => ({
    type: GET_RETAILER_CATEGORIES_SUCCESS,
    payload
});

export const getAllCategories = (payload) => ({
    type: GET_ALL_CATEGORIES_INITIATE,
    payload
});

export const getAllCategoriesSuccess = (payload) => ({
    type: GET_ALL_CATEGORIES_SUCCESS,
    payload
});

export const getAllBrands = (payload) => ({
    type: GET_ALL_BRANDS_INITIATE,
    payload
});

export const getAllBrandsSuccess = (payload) => ({
    type: GET_ALL_BRANDS_SUCCESS,
    payload
});

export const getAllModels = (payload) => ({
    type: GET_ALL_MODELS_INITIATE,
    payload
});

export const getAllModelsSuccess = (payload) => ({
    type: GET_ALL_MODELS_SUCCESS,
    payload
});

export const getDataFailure = (data) => ({
    type: FAILURE,
    payload: data
});
