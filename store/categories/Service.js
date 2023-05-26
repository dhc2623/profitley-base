import { AXIOS_INSTANCE } from '../../config/Config';

// export const getCategoriesListService = async () => {
//   return AXIOS_INSTANCE.get("/e-commerce/categories").then((res) => {
//     console.log("pagniation no", res.data);
//     return res.data;
//   });
// };

export const getCategoriesListService = async () => {
    return AXIOS_INSTANCE.get('/e-commerce/categories?pagniation=no').then((res) => {
        return res.data;
    });
};

export const getParentCategoriesService = async () => {
    return AXIOS_INSTANCE.get('/e-commerce/categories?pagniation=no&parent=1').then((res) => {
        return res.data;
    });
};

export const getSubCategoriesService = async (parentId) => {
    return AXIOS_INSTANCE.get(`/e-commerce/sub-categories/${parentId}`).then((res) => {
        return res.data;
    });
};
