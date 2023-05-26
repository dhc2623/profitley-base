import { Col, Form, Input, Row, Select, Tabs, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    COUNTRY_LIST,
    VALIDATE_EMAIL,
    VALIDATE_GSTIN,
    VALIDATE_MOBILE_NUMBER_LENGTH,
    VALIDATE_ZIP_CODE
} from '../../config/Constant';
import { langs } from '../../localization';
import { RETAILER_SIGNUP_INITIATE } from '../../store/login/Action';
import {
    GET_CITIES_INITIATE,
    GET_DISTRICT_INITIATE,
    GET_STATE_INITIATE
} from '../../store/master/Action';
import { getUserDetails } from '../../helper/AuthActions';
import Panel, { PanelActions, PanelTitle, PanelBody } from '../common/panel';
const FormInputWrapper = dynamic(() => import('../common/form/InputWrapper'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const DocHead = dynamic(() => import('../common/head'));
const { Option } = Select;
const { Title, Text } = Typography;
const TabPane = Tabs.TabPane;

const AddBuyerForm = (props) => {
    const userDetail  = props.userMe ? props.userMe.profile : undefined;
    const [form] = Form.useForm();
    const router = useRouter();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const states = useSelector((state) => state.master.states);
    const districts = useSelector((state) => state.master.districts);
    const cities = useSelector((state) => state.master.cities);

    useEffect(() => {
        dispatch({ type: GET_STATE_INITIATE });
    }, []);
    
    const cancel = () => router.push(userDetail ? '/my-retailers' : '/login');
    
    const onFinish = (values) => {
        const { organization_id, id } = userDetail
            ? userDetail
            : { organization_id: '', id: '' };
        const body = {
            organizationId: organization_id,
            domain: process.env.BACKEND_URL,
            firstname: values.name,
            lastname: values.last_name,
            email: values.email,
            password: values.password,
            mobileNumber: values.phone_number,
            shopname: values.shop_name,
            gst: values.gst,
            address1: values.address_1,
            address2: values.address_2,
            country: selectedCountry,
            state: selectedState,
            pincode: values.zip,
            district: selectedDistrict,
            city: selectedCity,
            createdBy: id
        };
        const callback = () => router.push(userDetail ? '/my-retailers' : '/signupThankYou');
        dispatch({ type: RETAILER_SIGNUP_INITIATE, postData: body, callback });
    };

    const onFinishFailed = () => { };

    /**
     * @name onStateChange
     * @description fetch district on basis of state id
     * @param {stateName}
     * @returns {}
     */
    const onStateChange = (stateName) => {
        let id = '';
        states.map((state) => {
            if (state.name == stateName) {
                id = state.id;
            }
        });
        setSelectedState(id);
        dispatch({ type: GET_DISTRICT_INITIATE, stateId: id });
    };

    /**
     * @name onDistrictChange
     * @description fetch Tehsil on basis of district id
     * @param {districtName}
     * @returns {}
     */
    const onDistrictChange = (districtName) => {
        let id = '';
        districts.map((district) => {
            if (district.name == districtName) {
                id = district.id;
            }
        });
        setSelectedDistrict(id);
        dispatch({ type: GET_CITIES_INITIATE, districtId: id });
    };

    /**
     * @name onCityChange
     * @description fetch Tehsil on basis of district id
     * @param {districtName}
     * @returns {}
     */
    const onCityChange = (cityName) => {
        let id = '';
        cities.map((city) => {
            if (city.name == cityName) {
                id = city.id;
            }
        });
        setSelectedCity(id);
    };

    /**
     * @name validPassword
     * @description validate the password
     * @param {rule, name, callback}
     * @returns {}
     */
    const validPassword = (rule, name, callback) => {
        if (name && name != password) {
            callback(`${langs.validationMessages.passwordMatching}`);
        } else {
            callback();
            return;
        }
    };

    return (
        <Fragment>
            <Form
                layout={'vertical'}
                name={langs.labels.signUp}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Panel>
                    <PanelTitle
                        title={langs.labels.profileInfo}
                    />
                    <PanelBody>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.firstName}
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    <Input size={'large'} />
                                </FormInputWrapper>
                            </Col>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.lastName}
                                    name="last_name"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    <Input size={'large'} />
                                </FormInputWrapper>
                            </Col>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.email}
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        },
                                        {
                                            message: langs.validationMessages.emailPattern,
                                            pattern: VALIDATE_EMAIL
                                        }
                                    ]}>
                                    <Input size={'large'} />
                                </FormInputWrapper>
                            </Col>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.mobileNumber}
                                    name="phone_number"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        },
                                        {
                                            message: langs.validationMessages.phoneRequired,
                                            pattern: VALIDATE_MOBILE_NUMBER_LENGTH
                                        }
                                    ]}>
                                    <Input size={'large'} />
                                </FormInputWrapper>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.shopName}
                                    name="shop_name"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    <Input size={'large'} />
                                </FormInputWrapper>
                            </Col>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.gstNumber}
                                    name="gst"
                                    rules={[
                                        // {
                                        //     required: true,
                                        //     message: langs.validationMessages.fieldRequired
                                        // },
                                        {
                                            message: langs.validationMessages.gstPattern,
                                            pattern: VALIDATE_GSTIN
                                        }
                                    ]}>
                                    <Input size={'large'} />
                                </FormInputWrapper>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.password}
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    <Input.Password
                                        size={'large'}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </FormInputWrapper>
                            </Col>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.confirmPassword}
                                    name="password_confirmation"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        },
                                        { validator: validPassword }
                                    ]}>
                                    <Input.Password size={'large'} />
                                </FormInputWrapper>
                            </Col>
                        </Row>
                    </PanelBody>
                </Panel>
                <Panel>
                    <PanelTitle
                        title={langs.labels.address}
                    />
                    <PanelBody>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.address1}
                                    name="address_1"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    <Input size={'large'} />
                                </FormInputWrapper>
                            </Col>
                            <Col span={12}>
                                <FormInputWrapper label={langs.labels.address2} name="address_2">
                                    <Input size={'large'} />
                                </FormInputWrapper>
                            </Col>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.country}
                                    name="country"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    {/* <Input size={'large'} /> */}
                                    <Select
                                        size={'large'}
                                        onChange={(country) => {
                                            setSelectedCountry(country);
                                        }}
                                        filterOption={(input, option) =>
                                            option.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                        showSearch>
                                        {COUNTRY_LIST.map((list) => {
                                            return (
                                                <Option value={list.value} key={list.value}>
                                                    {list.label}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </FormInputWrapper>
                            </Col>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.state}
                                    name="state"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    {/* <Input size={'large'} /> */}
                                    <Select
                                        size={'large'}
                                        onChange={onStateChange}
                                        filterOption={(input, option) =>
                                            option.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                        showSearch>
                                        {states.map((state) => {
                                            return (
                                                <Option value={state.name} key={state.id}>
                                                    {state.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </FormInputWrapper>
                            </Col>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.district}
                                    name="district"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    {/* <Input size={'large'} /> */}
                                    <Select
                                        size={'large'}
                                        showSearch
                                        onChange={onDistrictChange}
                                        filterOption={(input, option) =>
                                            option.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }>
                                        {districts.map((district) => {
                                            return (
                                                <Option value={district.name} key={district.id}>
                                                    {district.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </FormInputWrapper>
                            </Col>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.city}
                                    name="city"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    {/* <Input size={'large'} /> */}
                                    <Select
                                        size={'large'}
                                        onChange={onCityChange}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }>
                                        {cities.map((city) => {
                                            return (
                                                <Option value={city.name} key={city.id}>
                                                    {city.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </FormInputWrapper>
                            </Col>
                            <Col span={12}>
                                <FormInputWrapper
                                    label={langs.labels.zip}
                                    name="zip"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        },
                                        {
                                            pattern: VALIDATE_ZIP_CODE
                                        }
                                    ]}>
                                    <Input size={'large'} maxLength="6" />
                                </FormInputWrapper>
                            </Col>
                        </Row>
                    </PanelBody>
                </Panel>
                
                <Row gutter={[12, 0]} className="m-t15 m-b10">
                    <Col span={12}>
                        <ButtonWraper type="ghost" block size={'large'} onClick={cancel}>
                            {langs.labels.cancel}
                        </ButtonWraper>
                    </Col>
                    <Col span={12}>
                        <ButtonWraper type="primary" htmlType="submit" block size={'large'}>
                            {langs.labels.submit}
                        </ButtonWraper>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    );
};
export default AddBuyerForm;
