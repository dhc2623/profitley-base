import { AXIOS_INSTANCE } from '../../config/Config';

export const getBannersDataService = async () => {
    return AXIOS_INSTANCE.get('/e-commerce/banners').then((res) => {
        return res.data.success.data;
    });
};
