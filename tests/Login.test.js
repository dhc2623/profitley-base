// import { shallow, mount, render } from 'enzyme';
import { render, screen } from '@testing-library/react';
import { postLogin } from '../store/login/Service';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { setAuthToken, setUserDetails } from '../helper/AuthActions';
import { SELLER_DATA, SELLER_TOKEN } from './helper/Constant';
import { setValueToMockStore } from './helper';
import Axios from 'axios';
import { API_BASE_URL } from '../config/Constant';

export const getValueToMockStore = (key) => {
    return localStorage.getItem(key);
};

export const getHeader = () => {
    return {
        Authorization: getValueToMockStore(SELLER_TOKEN),
        Accept: 'application/json'
    };
};

describe('~~~~~ Login module ~~~~~', () => {
    let sellerResponse = '';
    let sellerToken = '';
    it('Login api working for Seller without crashing', async () => {
        var bodyFormData = new FormData();
        bodyFormData.append('username', 9999999999);
        bodyFormData.append('password', 123456);

        let response = await postLogin(bodyFormData);
        let dummyResponse = {
            id: 57,
            full_name: 'Seller Profitley',
            name: 'Seller',
            last_name: 'Profitley',
            email: 'seller@yopmail.com',
            roles: [{ name: 'seller', label: 'Seller' }],
            job_title: 'Administrator',
            phone_country_code: '91',
            phone_number: '9999999999',
            address: {
                billing: {
                    address_1: 'PU 54 Vijay Nagar',
                    country: 'India',
                    state: 'Madhya Pradesh',
                    district: 'INDORE',
                    city: 'Indore',
                    zip: '452001',
                    type: 'billing',
                    email: 'seller@yopmail.com',
                    first_name: 'Seller',
                    last_name: 'Profitley'
                },
                shipping: {
                    address_1: 'PU 54 Vijay Nagar',
                    country: 'India',
                    state: 'Madhya Pradesh',
                    district: 'INDORE',
                    city: 'Indore',
                    zip: '452001',
                    type: 'billing',
                    email: 'seller@yopmail.com',
                    first_name: 'Seller',
                    last_name: 'Profitley'
                }
            }
        };
        expect(response).toMatchObject(dummyResponse);
        sellerToken = response.authorization;
        delete response.permissions;
        delete response.address;
        delete response.authorization;
        sellerResponse = response;
    });

    test('should save to localStorage', () => {
        const VALUE = JSON.stringify(sellerResponse);

        setValueToMockStore(SELLER_DATA, VALUE);
        setValueToMockStore(SELLER_TOKEN, sellerToken);

        expect(getValueToMockStore(SELLER_DATA)).toBe(VALUE);
        expect(getValueToMockStore(SELLER_TOKEN)).toBe(sellerToken);
    });

    it('Login api working for Sales person without crashing', async () => {
        var bodyFormDataDSP = new FormData();
        bodyFormDataDSP.append('username', 9797979797);
        bodyFormDataDSP.append('password', 123456);
        let responseDSP = await postLogin(bodyFormDataDSP);
        let dummyResponseDSP = {
            id: 76,
            full_name: 'test Rathod',
            name: 'test',
            last_name: 'Rathod',
            email: 'devbaba@yopmail.com',
            roles: [{ name: 'sales_person', label: 'Sales Person' }],
            phone_country_code: '91',
            phone_number: '9797979797',
            address: {
                shipping: {
                    first_name: 'test',
                    last_name: 'Rathod',
                    email: 'devbaba@yopmail.com',
                    address_1: 'Galiyara chowk',
                    address_2: null,
                    city: 'BAJAG',
                    district: 'Dindori',
                    state: 'Madhya Pradesh',
                    cityId: '3246',
                    districtId: '177',
                    stateId: '21',
                    zip: '788998',
                    country: 'India',
                    type: 'shipping'
                },
                billing: {
                    first_name: 'test',
                    last_name: 'Rathod',
                    email: 'devbaba@yopmail.com',
                    address_1: 'Galiyara chowk',
                    address_2: null,
                    city: 'BAJAG',
                    district: 'Dindori',
                    state: 'Madhya Pradesh',
                    cityId: '3246',
                    districtId: '177',
                    stateId: '21',
                    zip: '788998',
                    country: 'India',
                    type: 'billing'
                }
            }
        };
        expect(responseDSP).toMatchObject(dummyResponseDSP);
    });

    it('Login api working for Buyer without crashing', async () => {
        var buyerCred = new FormData();
        buyerCred.append('username', 8787878787);
        buyerCred.append('password', 123456);
        let buyerResponse = await postLogin(buyerCred);
        let dummyResponseBuyer = {
            id: 75,
            full_name: 'Test Gayakwad',
            name: 'Test',
            last_name: 'Gayakwad',
            email: 'rg@yopmail.com',
            roles: [{ name: 'buyer', label: 'Buyer' }],
            phone_country_code: '91',
            phone_number: '8787878787',
            address: {
                shipping: {
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
                billing: {
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
                }
            },
            shop_name: 'Gaykwad & sons',
            gst: '22AAAAA0000A1Z5'
        };
        expect(buyerResponse).toMatchObject(dummyResponseBuyer);
    });
});
