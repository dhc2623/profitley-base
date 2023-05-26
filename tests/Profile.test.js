import { STATUS_CODES } from '../config/Constant';
import { getProfileService, orderPlacementService } from './services/profile';

describe('~~~~~ Profile module ~~~~~', () => {
    it('Get profile', async () => {
        let response = await getProfileService();
        expect(response.status).toBe(STATUS_CODES.OK);
    });

    it('Has billing and shipping address', async () => {
        let res = await getProfileService();
        let response = res.data.data.address;
        let isAddress =
            response && response.hasOwnProperty('billing') && response.hasOwnProperty('shipping');
        expect(isAddress).toBe(true);
    });
});
