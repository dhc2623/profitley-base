import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Input, Checkbox, Row, Col, Typography } from 'antd';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { LOGIN_INITIATE } from '../store/login/Action';
import { getLung } from '../store/auth/Service';
import { langs } from '../localization';
import { getAuthToken } from '../helper/AuthActions';
import { showNotification, validPhone } from '../helper/Utils';

import dynamic from 'next/dynamic';

// import FormInputWrapper from '../components/common/form/InputWrapper';
// import ButtonWraper from '../components/common/form/ButtonWrapper';
// import DocHead from '../components/common/head';

const FormInputWrapper = dynamic(() => import('../components/common/form/InputWrapper'));
const ButtonWraper = dynamic(() => import('../components/common/form/ButtonWrapper'), {
    ssr: false
});
const DocHead = dynamic(() => import('../components/common/head'));

import { NOTIFICATION_TYPE, USER_ROLES } from '../config/Constant';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

const { Title, Paragraph, Text } = Typography;

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const loading = useSelector((state) => state.login.loading);
    const [form] = Form.useForm();

    useEffect(() => {
        let token = getAuthToken();
        if (token) {
            router.push('/');
        }
        getLung(Cookies.get('preferredLanguage'));
    }, []);

    /**
     * @name onFinish
     * @description It submits login form
     * @param {values}
     * @returns {}
     */
    const onFinish = (values) => {
        form.resetFields();
        const callback = (data) => {
            const role = data.role.name;
            const cookiesData = Cookies.get('lastSyncId');
            showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.loginSuccess);
            setTimeout(() => {
                if (cookiesData) {
                    if (cookiesData == data.id) {
                        if (!Cookies.get('lastSync')) {
                            window.location.assign(`/sync?autoSync=true`);
                            console.log('lastSync');
                        } else {
                            const lastSync = Cookies.get('lastSync');
                            if (
                                !dayjs().isSame(JSON.parse(lastSync).all, 'day') &&
                                dayjs().day() === 6
                            ) {
                                window.location.assign(`/sync?autoSync=true`);
                            } else {
                                const roleName =
                                    role === USER_ROLES.OWNER.name ? USER_ROLES.SELLER.name : role;
                                window.location.assign(`/dashboard/${roleName}`);
                            }
                        }
                    } else {
                        window.location.assign(`/sync?autoSync=true`);
                    }
                } else {
                    window.location.assign(`/sync?autoSync=true`);
                }
            }, 500);
        };
        dispatch({ type: LOGIN_INITIATE, param: values, callback });
    };

    /**Invoke on form validation failed */
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.login} />
            <section className="login-wrap">
                <div className="login-box">
                    <div className="login-box-row">
                        <div className="login-box-col-left">
                            <div className="login-form">
                                <div className="login-top">
                                    <div className="login-logo">
                                        <img src="/assets/images/profitley-logo.png" alt="" />
                                    </div>
                                    <Title level={3} strong className="text-blue align-center">
                                        {langs.labels.loginTitle}
                                    </Title>
                                    <div className="login-graphic m-hide">
                                        <img src="/assets/images/b2b.png" alt="" />
                                    </div>
                                    <div className="login-form-bottom">
                                        <Title level={5}>{langs.labels.loginText}</Title>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="login-box-col-right">
                            <div className="login-form">
                                <Form
                                    form={form}
                                    layout={'vertical'}
                                    name={langs.labels.login}
                                    initialValues={{
                                        remember: true
                                    }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}>
                                    <FormInputWrapper
                                        label={langs.labels.usernameYourMobile}
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: langs.validationMessages.phoneRequired
                                            },
                                            { validator: validPhone }
                                        ]}>
                                        <Input
                                            prefix={
                                                <PhoneOutlined className="site-form-item-icon" />
                                            }
                                            size={'large'}
                                            placeholder={langs.labels.usernameYourMobile}
                                        />
                                    </FormInputWrapper>

                                    <FormInputWrapper
                                        label={langs.labels.password}
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: langs.validationMessages.passwordRequired
                                            }
                                        ]}>
                                        <Input.Password
                                            prefix={
                                                <LockOutlined className="site-form-item-icon" />
                                            }
                                            size={'large'}
                                            placeholder={langs.labels.password}
                                        />
                                    </FormInputWrapper>

                                    <FormInputWrapper name="button">
                                        <ButtonWraper
                                            type="default"
                                            htmlType="submit"
                                            block
                                            size={'large'}
                                            loading={loading}>
                                            {langs.labels.login}
                                        </ButtonWraper>
                                    </FormInputWrapper>

                                    <FormInputWrapper
                                        name="remember"
                                        valuePropName="checked"
                                        className="login-bottom">
                                        {/* <Checkbox>{langs.labels.rememberMe}</Checkbox> */}
                                        <div className="align-right">
                                            <Link href="/forgot-password">
                                                <a>{langs.labels.forgotPassword}</a>
                                            </Link>
                                        </div>
                                    </FormInputWrapper>
                                </Form>
                                <div className="align-center">
                                    <Link href="/sign-up">
                                        <a>{langs.labels.createBuyerAccount}</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default Login;
