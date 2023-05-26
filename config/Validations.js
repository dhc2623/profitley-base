import { VALIDATE_MOBILE_NUMBER_LENGTH } from './Constant';

/**Mobile number validation for form */
export const isMobileNumberValid = (value) => {
    return VALIDATE_MOBILE_NUMBER_LENGTH.test(value);
};
