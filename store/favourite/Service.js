import { AXIOS_INSTANCE } from '../../config/Config';
import { getRetailerId } from '../../helper/AuthActions';

export const getFavouriteService = async () => {
    let id = getRetailerId();
    let url = `/e-commerce/my-favourite`;
    if (id) {
        url += `/${id}`;
    }
    return AXIOS_INSTANCE.get(url).then((res) => {
        return res.data.success.data;
    });
};

export const addToFavouriteService = async (productId) => {
    return AXIOS_INSTANCE.get(`/e-commerce/favourite/${productId}`).then((res) => {
        return res.data.success;
    });
};

export const removeFromFavouriteService = async (productId) => {
    return AXIOS_INSTANCE.delete(`/e-commerce/favourite/${productId}`).then((res) => {
        return res.data.success;
    });
};
