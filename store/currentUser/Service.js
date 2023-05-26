import { AXIOS_INSTANCE } from '../../config/Config';
import { errorResponse } from '../../helper/Utils';

export const postUpdateProfile = async (id, param) => {
    return AXIOS_INSTANCE.post(`/users/${id}`, param).then((res) => {
        return res.data.data;
    });
};
export const postAddress = async (id, param) => {
    return AXIOS_INSTANCE.post(`/users/${id}/address`, param).then((res) => {
        return res.data.data;
    });
};

export const getProfileService = async () => {
    return AXIOS_INSTANCE.get('/profile')
        .then((res) => {
            return res.data.data;
        })
        .catch((error) => {
            errorResponse(error);
        });
};
export const deleteAddressService = async (id, type) => {
    return AXIOS_INSTANCE.delete(`/users/${id}/address/${type}`).then((res) => {
        return res.data.data;
    });
};
