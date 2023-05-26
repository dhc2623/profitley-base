import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import dynamic from 'next/dynamic';
import { langs } from '../../localization';
import { getUserDetails, getCurrentRole } from '../../helper/AuthActions';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { UPDATE_PROFILE_INITIATE } from '../../store/profile/Action';
import { validPhone } from '../../helper/Utils';
import { USER_ROLES } from '../../config/Constant';
const FormInputWrapper = dynamic(() => import('../common/form/InputWrapper'));

const General = (props) => {
    const userDetail  = props.userMe.profile;

    const dispatch = useDispatch();
    const isRetailer = getCurrentRole() && getCurrentRole().name == USER_ROLES.BUYER.name;

    /**
     * @name onFinish
     * @description Updte the profile details
     * @param {values, userData}
     * @returns {}
     */
    const onFinish = (values, userData) => {
        let postData = {
            name: values.name,
            last_name: values.last_name
            // "phone_number": values.phone_number
        };
        dispatch({
            type: UPDATE_PROFILE_INITIATE,
            userId: userData.id,
            postData
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const user = userDetail;
    return (
        <Form
            layout={'vertical'}
            name={langs.labels.login}
            initialValues={{
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                phone_number: user.phone_number,
                role: user.roleName,
                shop_name: user.shop_name
            }}
            onFinish={(values) => onFinish(values, user)}
            onFinishFailed={onFinishFailed}>
            <Row gutter={[15, 0]}>
                <Col md={12} xs={24}>
                    <FormInputWrapper
                        label={langs.labels.firstName}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: langs.validationMessages.firstNameRequired
                            }
                        ]}>
                        <Input size={'large'} />
                    </FormInputWrapper>
                </Col>
                <Col md={12} xs={24}>
                    <FormInputWrapper
                        label={langs.labels.lastName}
                        name="last_name"
                        rules={[
                            {
                                required: true,
                                message: langs.validationMessages.lastNameRequired
                            }
                        ]}>
                        <Input size={'large'} />
                    </FormInputWrapper>
                </Col>
                <Col md={24} xs={24} className={'align-right'}>
                    <FormInputWrapper>
                        <Button type="primary" htmlType="submit">
                            {langs.labels.update}
                        </Button>
                    </FormInputWrapper>
                </Col>
            </Row>
        </Form>
    );
};

export default General;
