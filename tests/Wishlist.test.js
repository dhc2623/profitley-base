import { STATUS_CODES } from '../config/Constant';
import { addToFavouriteService, deleteFromFavouriteService } from './services/favourite';

describe('~~~~~ Favourite Module module ~~~~~', () => {
    it('Add product to favourite', async () => {
        let response = await addToFavouriteService();
        expect(response.status).toBe(STATUS_CODES.OK);
    });

    it('Remove product from favourite', async () => {
        let response = await deleteFromFavouriteService();
        expect(response.status).toBe(STATUS_CODES.OK);
    });
});
