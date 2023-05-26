import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select } from 'antd';
import dynamic from 'next/dynamic';
import { langs } from '../../../localization';
import { ADDRESS_TYPE, COUNTRY_LIST } from '../../../config/Constant';
import { ADD_ADDRESS_INITIATE, UPDATE_ADDRESS_INITIATE } from '../../../store/profile/Action';
import {
    GET_CITIES_INITIATE,
    GET_DISTRICT_INITIATE,
    GET_STATE_INITIATE
} from '../../../store/master/Action';
import { getUserDetails } from '../../../helper/AuthActions';
const FormInputWrapper = dynamic(() => import('../../common/form/InputWrapper'));
const ModalWrapper = dynamic(() => import('../../common/modal'));

const { Option } = Select;
const AddAddress = (props) => {
    const { selectedData } = props;
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.master.loading);
    const states = useSelector((state) => state.master.states);
    const districts = useSelector((state) => state.master.districts);
    const cities = useSelector((state) => state.master.cities);

    const [form] = Form.useForm();

    useEffect(() => {
        dispatch({ type: GET_STATE_INITIATE });
    }, []);

    useEffect(() => {
        if (selectedData.district_id) {
            dispatch({ type: GET_DISTRICT_INITIATE, stateId: selectedData.state_id });
            dispatch({ type: GET_CITIES_INITIATE, districtId: selectedData.district_id });
        } else if(selectedData.address_type){
            form.setFieldsValue({
                name: '',
                address1: '',
                address2: '',
                pincode: '',
                country: '',
                state: '',
                district: '',
                city: ''
            });
        } else {
            form.setFieldsValue({
                address_type: '',
                name: '',
                address1: '',
                address2: '',
                pincode: '',
                country: '',
                state: '',
                district: '',
                city: ''
            });
        }
    }, [selectedData.district_id, selectedData.city_id]);

    /**
     * @name onFinish
     * @description add address
     * @param {values}
     * @returns {}
     */
    const onFinish = async (values) => {
        values.is_default = 0;
        if (selectedData.id) {
            await dispatch({
                type: UPDATE_ADDRESS_INITIATE,
                id: selectedData.id,
                param: values,
                callback: (newAdress) => {
                    props.submit(newAdress);
                },
                dispatch
            });
        } else {
            await dispatch({
                type: ADD_ADDRESS_INITIATE,
                param: values,
                callback: (newAddress) => {
                    props.submit(newAddress);
                },
                dispatch
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const closePopup = () => {
        props.close();
    };

    /**
     * @name onStateChange
     * @description fetch district on basis of state id
     * @param {stateName}
     * @returns {}
     */
    const onStateChange = (stateId) => {
        dispatch({ type: GET_DISTRICT_INITIATE, stateId });
        form.setFieldsValue({
            district: '',
            city: ''
        });
    };

    /**
     * @name onDistrictChange
     * @description fetch Tehsil on basis of district id
     * @param {districtName}
     * @returns {}
     */
    const onDistrictChange = (districtId) => {
        dispatch({ type: GET_CITIES_INITIATE, districtId });
        form.setFieldsValue({
            city: ''
        });
    };

    return (
        <ModalWrapper
            title={langs.labels.address}
            visible={props.visible}
            closable={true}
            okText={selectedData.address_type ? langs.labels.update : langs.labels.add}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onFinish(values);
                        closePopup();
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            cancelText={langs.labels.cancel}
            onCancel={closePopup}>
            <Form
                form={form}
                name={langs.labels.address}
                layout="vertical"
                initialValues={{
                    address_type: selectedData.address_type,
                    name: selectedData.name,
                    address1: selectedData.address1,
                    address2: selectedData.address2,
                    pincode: selectedData.pincode,
                    country: selectedData.country,
                    state: `${selectedData.state_id}`,
                    district: `${selectedData.district_id}`,
                    city: `${selectedData.city_id}`
                }}>
                <FormInputWrapper
                    label={langs.labels.type}
                    name="address_type"
                    rules={[
                        {
                            required: true,
                            message: langs.validationMessages.fieldRequired
                        }
                    ]}>
                    <Select size={'large'}>
                        {ADDRESS_TYPE.map((type) => {
                            return (
                                <Option value={type.id} key={type.value}>
                                    {type.label}
                                </Option>
                            );
                        })}
                    </Select>
                </FormInputWrapper>
                <FormInputWrapper
                    label={langs.labels.name}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: langs.validationMessages.fieldRequired
                        }
                    ]}>
                    <Input size={'large'} />
                </FormInputWrapper>
                <FormInputWrapper
                    label={langs.labels.address1}
                    name="address1"
                    rules={[
                        {
                            required: true,
                            message: langs.validationMessages.fieldRequired
                        }
                    ]}>
                    <Input size={'large'} />
                </FormInputWrapper>
                <FormInputWrapper label={langs.labels.address2} name="address2">
                    <Input size={'large'} />
                </FormInputWrapper>
                <FormInputWrapper
                    label={langs.labels.country}
                    name="country"
                    rules={[
                        {
                            required: true,
                            message: langs.validationMessages.fieldRequired
                        }
                    ]}>
                    <Select
                        size={'large'}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        showSearch>
                        {!!states &&
                            states.map((state) => {
                                return (
                                    <Option value={`${state.id}`} key={state.id}>
                                        {state.name}
                                    </Option>
                                );
                            })}
                    </Select>
                </FormInputWrapper>
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
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {!!districts &&
                            districts.map((district) => {
                                return (
                                    <Option value={`${district.id}`} key={district.id}>
                                        {district.name}
                                    </Option>
                                );
                            })}
                    </Select>
                </FormInputWrapper>
                <FormInputWrapper
                    label={langs.labels.city}
                    name="city"
                    rules={[
                        {
                            required: true,
                            message: langs.validationMessages.fieldRequired
                        }
                    ]}>
                    <Select
                        size={'large'}
                        showSearch
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {!!cities &&
                            cities.map((city) => {
                                return (
                                    <Option value={`${city.id}`} key={city.id}>
                                        {city.name}
                                    </Option>
                                );
                            })}
                    </Select>
                </FormInputWrapper>
                <FormInputWrapper
                    label={langs.labels.zip}
                    name="pincode"
                    rules={[
                        {
                            required: true,
                            message: langs.validationMessages.fieldRequired
                        }
                    ]}>
                    <Input size={'large'} maxLength="6" />
                </FormInputWrapper>
            </Form>
        </ModalWrapper>
    );
};
export default AddAddress;
