import { AXIOS_INSTANCE } from '../../config/Config';
import { getRetailerId } from '../../helper/AuthActions';

export const getHomeDataService = async () => {
    let id = getRetailerId();
    let url = `/e-commerce/home`;
    if (id) {
        url += `/${id}`;
    }
    return AXIOS_INSTANCE.get(url).then((res) => {
        return res.data.success;
    });
};
