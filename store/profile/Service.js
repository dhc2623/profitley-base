import { AXIOS_INSTANCE } from '../../config/Config';

export const postUpdateProfile = async (postData) => {
    return AXIOS_INSTANCE.put(`/my-profile`, postData).then((res) => {
        return res.data.success;
    });
};

export const postAddress = async (param) => {
    return AXIOS_INSTANCE.post(`/addresses`, param).then((res) => {
        return res.data.success;
    });
};

export const updateAddressService = async (id, param) => {
    return AXIOS_INSTANCE.put(`/addresses/${id}`, param).then((res) => {
        return res.data.success;
    });
};

// export const getProfileService = async (token) => {
//     if (token) {
//         let response = await axios({
//             method: 'get',
//             url: `${API_BASE_URL}/me`,
//             headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }
//         });
//         return response.data.success
//     } else {
//         return AXIOS_INSTANCE.get('/me')
//             .then((res) => {
//                 return res.data.success;
//             })
//             .catch((error) => {
//                 errorResponse(error);
//             });
//     }
// };

export const deleteAddressService = async (id) => {
    return AXIOS_INSTANCE.delete(`/addresses/${id}`).then((res) => {
        return res.data.success;
    });
};

export const updatePasswordService = async (postData) => {
    return AXIOS_INSTANCE.post(`/changePassword`, postData).then((res) => {
        return res.data.data;
    });
};

export const updateFCMTokenService = async (token) => {
    let requestBody = {
        fcmToken: token
    };
    return AXIOS_INSTANCE.post(`/update-fcm-token`, requestBody).then((res) => {
        return res.data.data;
    });
};

export const resetPasswordService = async (postData) => {
    return AXIOS_INSTANCE.post(`/password/reset`, postData).then((res) => {
        return res.data.data;
    });
};
