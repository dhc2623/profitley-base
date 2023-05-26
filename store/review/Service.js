import { AXIOS_INSTANCE } from '../../config/Config';

export const postReviewService = async (postData) => {
    return AXIOS_INSTANCE.post('/ratings', postData).then((res) => {
        return res.data.data;
    });
};

export const getReviewService = async () => {
    return AXIOS_INSTANCE.get('/ratings', postData).then((res) => {
        return res.data.data;
    });
};
