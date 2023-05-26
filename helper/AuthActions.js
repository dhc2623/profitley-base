import Cookies from 'js-cookie';
import { USER_ROLES } from '../config/Constant';

/**
 * @name logout
 * @description It logout the user and clear the cookies
 * @param {}
 * @returns {}
 */
export const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('selectedRetailer');
    Cookies.remove('selectedProduct');
    Cookies.remove('setSeller');
    
    localStorage.removeItem('appData');
    localStorage.removeItem('navigation');
    window.location.pathname = '/login';
};

/**
 * @name getAuthToken
 * @description It returns auth token
 * @param {}
 * @returns {token}
 */
export const getAuthToken = () => {
    const token = Cookies.get('token');
    return token;
};

/**
 * @name setAuthToken
 * @description It sets auth token
 * @param {}
 * @returns {}
 */
export const setAuthToken = (token) => {
    Cookies.set('token', token, { expires: 365 });
};

/**
 * @name setUserDetails
 * @description It sets user details in cookies
 * @param {}
 * @returns {}
 */
export const setUserDetails = (data) => {
    Cookies.set('user', JSON.stringify(data),  { expires: 365 });
};

/**
 * @name getUserDetails
 * @description It return user details from cookies
 * @param {}
 * @returns {userDetails}
 */
export const getUserDetails = () => {
    let user = Cookies.get('user');
    if (user) {
        user = JSON.parse(user);
    }
    return user;
};

/**
 * @name isUserLoggedIn
 * @description It checks that user is login or not
 * @param {}
 * @returns {boolean}
 */
export const isUserLoggedIn = () => {
    const token = Cookies.get('token');
    return token ? true : false;
};

/**
 * @name getCurrentRole
 * @description It returns role details of current user
 * @param {}
 * @returns {object}
 */
export const getCurrentRole = () => {
    let user = getUserDetails();
    return user && user.role;
};

/**
 * @name getCurrentRoleId
 * @description It returns role id of current user
 * @param {}
 * @returns {id}
 */
export const getCurrentRoleId = () => {
    let user = getUserDetails();
    return user && user.role && user.role.id;
};

/**
 * @name getRetailerId
 * @description It returns id of selected retailer. If current user id retailer then it will return user id.
 * @param {}
 * @returns {id}
 */
export const getRetailerId = () => {
    let currentRole = getCurrentRole().name;
    let id = '';
    if (currentRole == USER_ROLES.BUYER.name) {
        id = getUserDetails().id;
    } else {
        const selectedRetailer = Cookies.get('selectedRetailer')
            ? JSON.parse(Cookies.get('selectedRetailer'))
            : '';
        if (selectedRetailer) {
            id = selectedRetailer.id;
        }
    }
    return id;
};

/**
 * @name parseCookies
 * @description It returns object.
 * @param {request}
 */
export const parseCookies = (request) => {
    var list = {},
        rc = request.headers.cookie;

    rc &&
        rc.split(';').forEach(function (cookie) {
            var parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });

    return list;
};

/**
 * @name serverCheckIsUserLogin
 * @description It returns object.
 * @param {request}
 */
export const serverCheckIsUserLogin = (req, query = {}) => {
    return new Promise((resolve, reject) => {
        const { token, user, selectedRetailer } = parseCookies(req);
        if (!token) {
            resolve({
                redirect: {
                    permanent: false,
                    destination: '/login'
                }
            });
        } else {
            const userDetail = JSON.parse(decodeURIComponent(user));
            const selectedBuyer = selectedRetailer
                ? JSON.parse(decodeURIComponent(selectedRetailer))
                : '';
            resolve({
                props: {
                    userLogin: true,
                    userDetail,
                    selectedBuyer,
                    query,
                    token
                }
            });
        }
    });
};
