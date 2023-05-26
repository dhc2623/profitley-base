import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Input, Button, Alert, Typography, Row, Col } from 'antd';
import { FORGOT_PASSWORD_INITIATE } from '../store/login/Action';
import { langs } from '../localization';
import { validEmail } from '../helper/Utils';
import dynamic from 'next/dynamic';
// import FormInputWrapper from '../components/common/form/InputWrapper';
// import ButtonWraper from '../components/common/form/ButtonWrapper';
// import DocHead from '../components/common/head';

const FormInputWrapper = dynamic(() => import('../components/common/form/InputWrapper'));
const ButtonWraper = dynamic(() => import('../components/common/form/ButtonWrapper'));
const DocHead = dynamic(() => import('../components/common/head'));

const { Title } = Typography;

const ForgotPassword = () => {
    const [isThankYou, setIsThankYou] = useState(false);
    const [message, setMessage] = useState('');
    const loading = useSelector((state) => state.login.loading);

    const dispatch = useDispatch();
    const router = useRouter();

    /**
     * @name onFinish
     * @description Invoke forgot password api
     * @param {values}
     * @returns {}
     */
    const onFinish = (values) => {
        const callback = (message) => {
            setIsThankYou(true);
            setMessage(message);
        };
        dispatch({ type: FORGOT_PASSWORD_INITIATE, param: values, callback });
    };

    /**invoke on form validation failed */
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.forgotPassword} />
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
                                        <Title level={5}>
                                            {langs.labels.loginText}
                                        </Title>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="login-box-col-right">
                            <div className="login-form">
                                <Title level={3} className="title">{langs.labels.forgotPassword}</Title>
                                {isThankYou ? (
                                    <Fragment>
                                        <Alert message={message} type="success" showIcon />
                                        <FormInputWrapper className="align-center">
                                            <Link href="/login">
                                                <a>{langs.labels.backToLogin}</a>
                                            </Link>
                                        </FormInputWrapper>
                                    </Fragment>
                                ) : (
                                    <Form
                                        layout={'vertical'}
                                        name={langs.labels.forgotPassword}
                                        initialValues={{
                                            remember: true
                                        }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}>
                                        <FormInputWrapper
                                            label={langs.labels.email}
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: `${langs.validationMessages.emailRequired}`
                                                },
                                                { validator: validEmail }
                                            ]}>
                                            <Input size={'large'} />
                                        </FormInputWrapper>

                                        <FormInputWrapper>
                                            <ButtonWraper
                                                size={'large'}
                                                type="default"
                                                htmlType="submit"
                                                block
                                                loading={loading}>
                                                {langs.labels.submit}
                                            </ButtonWraper>
                                        </FormInputWrapper>
                                        <FormInputWrapper className="align-center">
                                            <Link href="/login">
                                                <a>{langs.labels.backToLogin}</a>
                                            </Link>
                                        </FormInputWrapper>
                                    </Form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default ForgotPassword;
