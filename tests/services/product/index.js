import { AXIOS_TEST_INSTANCE } from '../../config';
import { SELLER_DATA } from '../../helper/Constant';
import { getValueToMockStore } from '../../login.test';

export const getProductsListService = async () => {
    const id = getValueToMockStore(SELLER_DATA).id;
    let url = '/e-commerce/shop/products-list';
    if (id) {
        url += `/${id}`;
    }
    return AXIOS_TEST_INSTANCE.get(`${url}`).then((res) => {
        return res.data;
    });
};
