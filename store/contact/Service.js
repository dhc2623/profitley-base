import { AXIOS_INSTANCE } from '../../config/Config';

export const contactRequestService = async (postData) => {
    return AXIOS_INSTANCE.post('/contact', postData).then((res) => {
        return res.data.success;
    });
};
