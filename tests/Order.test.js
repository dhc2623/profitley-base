import { STATUS_CODES } from '../config/Constant';
import { orderPlacementService } from './services/order';

describe('~~~~~ Order module ~~~~~', () => {
    it('order placement', async () => {
        const data = {
            amount: '98901.00',
            currency: 'INR',
            save_billing: true,
            save_shipping: true,
            status: 'submitted',
            payment_reference: 'CHARGE-XXXXOOOO',
            gateway: 'Cash',
            payment_status: 'pending',
            billing_address: {
                first_name: 'Test',
                last_name: 'Gayakwad',
                email: 'rg@yopmail.com',
                address_1: 'Star square',
                address_2: null,
                city: 'Kartala',
                district: 'Korba',
                state: 'Chhattisgarh',
                cityId: '1690',
                districtId: '359',
                stateId: '7',
                zip: '564565',
                country: 'India',
                type: 'billing'
            },
            shipping_address: {
                first_name: 'Test',
                last_name: 'Gayakwad',
                email: 'rg@yopmail.com',
                address_1: 'Star square',
                address_2: null,
                city: 'Kartala',
                district: 'Korba',
                state: 'Chhattisgarh',
                cityId: '1690',
                districtId: '359',
                stateId: '7',
                zip: '564565',
                country: 'India',
                type: 'shipping'
            },
            order_items: [
                {
                    amount: '999.00',
                    quantity: 99,
                    type: 'Product',
                    sku_code: 'test123',
                    description: 'Test(test123)',
                    tax_ids: [],
                    properties: null,
                    item_options: null
                }
            ],
            retailer_id: 75
        };
        let response = await orderPlacementService(data);
        expect(response.status).toBe(STATUS_CODES.OK);
    });
});
