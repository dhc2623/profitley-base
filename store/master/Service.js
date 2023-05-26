import { AXIOS_INSTANCE } from '../../config/Config';

export const getStateService = async () => {
    return AXIOS_INSTANCE.get('/master/states').then((res) => {
        return res.data.success.data;
    });
};

export const getDistrictService = async (stateId) => {
    return AXIOS_INSTANCE.get(`/master/districts/${stateId}`).then((res) => {
        return res.data.success.data;
    });
};

export const getCityService = async (districtId) => {
    return AXIOS_INSTANCE.get(`/master/cities/${districtId}`).then((res) => {
        return res.data.success.data;
    });
};

export const getRetailerCategorirsService = async (districtId) => {
    return AXIOS_INSTANCE.get(`/master/buyer-categories`).then((res) => {
        return res.data.success.data;
    });
};

export const getUserByRoleService = async (userType) => {
    return AXIOS_INSTANCE.get(`/users-by-type/${userType}`).then((res) => {
        return res.data.data;
    });
};

export const getAllCategorirsService = async () => {
    return AXIOS_INSTANCE.get(`/e-commerce/categories?pagniation=no`).then((res) => {
        return res.data.data;
    });
};

export const getBrandsService = async (data) => {
    return AXIOS_INSTANCE.get(`/e-commerce/brands`).then((res) => {
        return res.data.data;
    });
};

export const getModelsService = async (data) => {
    return AXIOS_INSTANCE.get(`/e-commerce/models`).then((res) => {
        return res.data.data;
    });
};

export const getBankService = async () => AXIOS_INSTANCE.get(`/master/banks`);
