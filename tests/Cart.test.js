import { STATUS_CODES } from '../config/Constant';
import { addToCartService, getCartService } from './services/cart';

describe('~~~~~ Cart module ~~~~~', () => {
    it('Add product to cart', async () => {
        let data = {
            item_id: 65,
            original_price: '1200.00',
            price: '999.00',
            quantity: 3,
            sku_code: 'test123'
        };
        let response = await addToCartService(data);
        expect(response.status).toBe(STATUS_CODES.OK);
    });

    it('get cart list', async () => {
        let response = await getCartService();
        expect(response.status).toBe(STATUS_CODES.OK);
    });
});
