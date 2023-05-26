import _ from 'lodash';
import Cookies from 'js-cookie';
import { Modal } from 'antd';
import {
    USER_ROLES,
    VALIDATE_MOBILE_NUMBER_LENGTH,
    VALIDATE_EMAIL,
    NOTIFICATION_TYPE,
    ERROR_MESSAGE,
    ORDER_STATUS
} from '../config/Constant';
import { logout } from './AuthActions';
import { notification } from 'antd';
import { langs } from '../localization';
import moment from 'moment';
import Loading from '../components/common/loading';
const { confirm } = Modal;

export const showNotification = (type, title, description = '') => {
    notification[type]({
        message: title,
        description: description
    });
};

/**
 * @param {*} rule
 * @param {*} name
 * @param {*} callback
 * @description checks that if the value entered is correct email format or not
 */
export const validEmail = (rule, name, callback) => {
    const isValid = VALIDATE_EMAIL.test(name);
    if (!isValid && name !== '' && name !== undefined) {
        callback(`${langs.validationMessages.emailPattern}`);
    } else {
        callback();
        return;
    }
};

/**
 * @param {*} rule
 * @param {*} name
 * @param {*} callback
 * @description checks that if the value entered is correct email format or not
 */
export const validPhone = (rule, name, callback) => {
    const isValid = VALIDATE_MOBILE_NUMBER_LENGTH.test(name);
    if (!isValid && name !== '' && name !== undefined) {
        callback(`${langs.validationMessages.phonePattern}`);
    } else {
        callback();
        return;
    }
};

/**
 * @name getRoleId
 * @description It returns constant id of role for API calling.
 * @param {role}
 * @returns {id}
 */
export const getRoleId = (role) => {
    let Id = 1;
    switch (role) {
        case USER_ROLES.BUYER.name:
            Id = USER_ROLES.BUYER.id;
            break;
        case USER_ROLES.OWNER.name:
        case USER_ROLES.SELLER.name:
            Id = USER_ROLES.BUYER.id;
    }
    return Id;
};

/**
 * @method errorResponse
 * @description method for error halndling while dealing with server-side API.
 * @param { error }
 * @return {*}
 */
export const errorResponse = (error, type) => {
    let debug = process.env.debugging == 'true';
    if (error === undefined) {
        showNotification(
            NOTIFICATION_TYPE.ERROR,
            debug ? type : ERROR_MESSAGE.ERROR,
            ERROR_MESSAGE.NETWORK_ERROR
        );
    } else if (error.response && error.response.data && error.response.data.error) {
        if (error.response.status === 401) {
            showNotification(
                NOTIFICATION_TYPE.ERROR,
                debug ? type : ERROR_MESSAGE.ERROR,
                ERROR_MESSAGE.UNAUTHORIZED_ERROR
            );
            logout();
        } else {
            debug
                ? showNotification(NOTIFICATION_TYPE.ERROR, type, error.response.data.error)
                : showNotification(NOTIFICATION_TYPE.ERROR, error.response.data.error);
        }
    } else if (
        error.response &&
        (error.response.status === 406 ||
            error.response.status === 417 ||
            error.response.status === 422 ||
            error.response.status === 412)
    ) {
        showNotification(
            NOTIFICATION_TYPE.ERROR,
            debug ? type : ERROR_MESSAGE.ERROR,
            error.response.data.message
        );
    } else if (
        error.response &&
        error.response.status &&
        (error.response.status === 406 || error.response.status === 417)
    ) {
        showNotification(
            NOTIFICATION_TYPE.ERROR,
            debug ? type : ERROR_MESSAGE.ERROR,
            error.data.Message
        );
    } else if (error.response && error.response.status && error.response.status === 401) {
        showNotification(
            NOTIFICATION_TYPE.ERROR,
            debug ? type : ERROR_MESSAGE.ERROR,
            ERROR_MESSAGE.UNAUTHORIZED_ERROR
        );
        logout();
    } else if (error.status) {
        showNotification(
            NOTIFICATION_TYPE.ERROR,
            debug ? type : ERROR_MESSAGE.ERROR,
            ERROR_MESSAGE.NETWORK_ERROR
        );
    } else if (error.code === 'ECONNABORTED') {
        showNotification(
            NOTIFICATION_TYPE.ERROR,
            debug ? type : ERROR_MESSAGE.ERROR,
            ERROR_MESSAGE.RESPOND_SLOW_ERROR
        );
    } else {
        showNotification(
            NOTIFICATION_TYPE.ERROR,
            debug ? type : ERROR_MESSAGE.ERROR,
            ERROR_MESSAGE.SOMETHING_WRONG_ERROR
        );
    }
};

/**
 * @name convertStringPriceintoFloat
 * @description It remove currency sign from string and return float value of price.
 * @param {price(string)}
 * @returns {price(float)}
 */
export const convertStringPriceintoFloat = (price) => {
    let floatPrice = parseFloat(price.replace('$', '').replace(',', '').replace('₹', ''));
    return floatPrice.toFixed(2);
};

/**
 * @name removeEmptyValues
 * @description It removes empty value from the object.
 * @param {object}
 * @returns {object}
 */
export const removeEmptyValues = (data) =>
    _.pickBy(data, (value, key) => !(value === '' || value === undefined || value === 'crap'));

/**
 * @name removeEmptyValues
 * @description It adds currency sign in price.
 * @param {amount}
 * @returns {amount}
 */
export const formatToCurrency = (amount) => {
    if (amount) {
        let expo = amount;
        if (amount.toString().search('e') != -1) {
            expo = amount.toLocaleString();
            return '₹' + expo;
        } else {
            let floatPrice = parseFloat(amount);
            let finalAmount = floatPrice
                ? '₹' + floatPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
                : '₹00.00';
            return finalAmount;
        }
    } else {
        return '₹00.00';
    }
};

/**
 * @name getLocation
 * @description It returns lat & long.
 * @param {}
 * @returns {lat & long}
 */
function getPosition() {
    return new Promise(function (resolve, reject) {
        return navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
export const getLocation = async () => {
    const position = {};
    if (navigator.geolocation) {
        try {
            const getPositionValue = await getPosition();
            position.lat = getPositionValue.coords.latitude;
            position.long = getPositionValue.coords.longitude;
            return position;
        } catch (err) {
            console.error(err);
            alert('Error!');
            return '';
        }
    } else {
        alert(
            'It seems like Geolocation, which is required for this page, is not enabled in your browser.'
        );
    }
    return position;
};

/**
 * @name getPascalCaseString
 * @description It converts string into pascal case
 * @param {}
 * @returns string
 */
export const getPascalCaseString = (string) =>
    string.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase();
    });

/**
 * @name getDateWithTime
 * @description It returns formatted date.
 * @param {date}
 * @returns {date}
 */
export const getDateWithTime = (date) => {
    const dateObject = moment(date);
    return dateObject.format('DD MMM, YYYY hh:mm A');
};

/**
 * @name getDate
 * @description It returns formatted date.
 * @param {date}
 * @returns {date}
 */
export const getDate = (date) => {
    if (!date) {
        return 'N/A';
    }
    const dateObject = moment(date);
    return dateObject.format('DD MMM, YYYY');
};

/**
 * @method disabledPastDate
 * @description Disable all past before today.
 * @param {current} current- current date
 * @return {}
 */
export const disabledPastDate = (current) => {
    return current && current < moment().startOf('day');
};
/**
 * @method disabledFutureDate
 * @description Disable all dates After today.
 * @param {current} current- current date
 * @return {}
 */
export const disabledFutureDate = (current) => {
    return current && current > moment().endOf('day');
};

/**
 * @name setDataInCookies
 * @description It set data in cookies on particular key.
 * @param {key}
 * @returns {}
 */
export const setDataInCookies = (key, data) => {
    Cookies.set(key, JSON.stringify(data), { expires: 365 });
};

/**
 * @name setDataInCookies
 * @description It return data from cookies of particular key.
 * @param {key}
 * @returns {data}
 */
export const getDataInCookies = (key) => {
    let data = Cookies.get(key);
    if (data) {
        data = JSON.parse(data);
    }
    return data;
};

/**
 * @name removeDataInCookies
 * @description It removes data from cookies of particular key.
 * @param {key}
 * @returns {}
 */
export const removeDataInCookies = (key) => {
    Cookies.remove(key);
};

/**
 * @name getStatusColor
 * @description It returns color according to status.
 * @param {statusName}
 * @returns {color}
 */
export const getStatusColor = (statusName) => {
    if (statusName) {
        switch (statusName.toLowerCase()) {
            case 'pending':
                return 'gold';
            case 'processing':
                return 'orange';
            case 'submitted':
                return 'geekblue';
            case 'canceled':
                return 'red';
            case 'completed':
                return 'green';
            case 'failed':
                return 'red';
            case 'declined':
                return 'red';
            case 'unapproved':
                return 'blue';
            case 'unpaid':
                return 'red';
            case 'paid':
                return 'green';
            default:
                return 'green';
        }
    }
};

/**
 * @name getActiveMenuKey
 * @description It returns active menu key.
 * @param {pathname}
 * @returns {key}
 */
export const getActiveMenuKey = (pathname) => {
    let key = '';

    switch (pathname) {
        case '/shop/products':
            key = ['3'];
            break;
        case '/orders/my-orders':
            key = ['4'];
            break;
        case '/my-favourite':
            key = ['5'];
            break;
        case '/my-distributor':
            key = ['6'];
            break;
        case '/my-retailers':
            key = ['7'];
            break;
        case '/my-team':
            key = ['8'];
            break;
        case '/my-retailers/retailer-collection-history':
            key = ['9'];
            break;
        case '/reports':
            key = ['10'];
            break;
        case '/my-profile/profile-view':
        case '/my-profile/profile-edit':
            key = ['11'];
            break;
        case '/need-help':
            key = ['12'];
            break;
        case '/contact-us':
            key = ['13'];
            break;
        case '/settings':
            key = ['14'];
            break;
        case '/ledger':
            key = ['17'];
            break;
        case '/':
            key = ['19'];
            break;
        case '/dashboard':
            key = ['20'];
            break;
        case '/shop/best-sellers':
            key = ['21'];
            break;
        case '/shop/fast-moving':
            key = ['22'];
            break;
        case '/my-plan':
            key = ['26'];
    }
    return key;
};

/**
 * @name getConfirmPromise
 * @description It returns boolean value on the basis of user response.
 * @param {data}
 * @returns {boolean}
 */
export const getConfirmPromise = (data) => {
    return new Promise((resolve, reject) => {
        confirm({
            ...data,
            onOk() {
                resolve();
            },
            onCancel() {
                reject();
            }
        });
    })
        .then(() => true)
        .catch(() => false);
};

/**
 * @name getSettings
 * @description It returns settings.
 * @param {}
 * @returns {id}
 */
export const getSettings = () => {
    let settings = localStorage.getItem('appData')
        ? JSON.parse(localStorage.getItem('appData'))
        : '';
    return settings;
};

/**
 * @name getProductInfo
 * @description It returns count, moq & max.
 * @param {}
 * @returns {id}
 */
export const getProductInfo = (product) => {
    let info = {};
    info.count = product.quantity ? product.quantity : 1;
    info.moq = product.moq ? product.moq : 1;
    info.max = '';
    info.inventory = product.inventory ? product.inventory : 'finite';
    info.inventory_value = product.inventory_value ? product.inventory_value : 0;
    return info;
};

export const isOrderCancelable = (status) => status == ORDER_STATUS.SUBMITTED;

export const importLoading = () => <Loading spinning={true} />;

export const convertArrayToString = (array) => array.join(', ');

/**
 * @method CreateWhatsAppURL
 * @description Create Whatsapp url.
 * @param {number, message}
 * @return {}
 */
export const whatsAppURL = (number, message) => {
    if (number && number.length == 10) {
        return `https://api.whatsapp.com/send?phone=91${number}&text=${message}`;
    } else {
        return `https://api.whatsapp.com/send?text=${message}`;
    }
};

/**
 * @name getUniqueIds
 * @description It returns array of unique
 */
export const getUniqueIds = (orderOrg, userOrg) => {
    let unique = [];
    orderOrg.map((orgId) => {
        let flag = true;
        userOrg.map((obj) => {
            if (obj.id == orgId) {
                flag = false;
            }
        });
        if (flag) {
            unique.push(orgId);
        }
    });
    return unique;
};

/**
 * @name convertToSlug
 * @description It returns array of unique
 */
export const convertToSlug = (text = '') => {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

/**
 * @name convertToSlug
 * @description It returns array of unique
 */
export const slugify = (string = '') => {
    return string.toString().trim().replace(/-/g, ' ');
};
/**
 * @name printPDF
 * @description It returns array of unique
 */
export const printPDF = async (path) => {
    if (path) {
        const print = await require('print-js');
        await print(path);
    }
};