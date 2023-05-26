import { getProductsListService } from './services/product';

describe('~~~~~ Shop module ~~~~~', () => {
    it('Get product list without crashing', async () => {
        let response = await getProductsListService();
        let isProductsExist =
            response && response.data && Array.isArray(response.data) ? true : false;
        expect(isProductsExist).toBe(true);
    });
});
