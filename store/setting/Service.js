import { AXIOS_INSTANCE } from '../../config/Config';

export const getSettingsService = async () => {
    return AXIOS_INSTANCE.get('/e-commerce/home-settings').then((res) => {
        return res.data.success;
    });
};

export const updateSettingsService = async (postData) => {
    return AXIOS_INSTANCE.post('/e-commerce/home-settings', postData).then((res) => {
        return res.data.success;
    });
};
