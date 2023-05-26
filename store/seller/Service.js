import { AXIOS_INSTANCE } from '../../config/Config';

export const getSellersService = async () => {
    return AXIOS_INSTANCE.get(`/user-organizations`).then((res) => {
        return res.data;
    });
};

export const setSellerService = async (organization_id) => {
    return AXIOS_INSTANCE.put(`/update-user-organization`, {
        organization_id
    }).then((res) => {
        return res.data;
    });
};
