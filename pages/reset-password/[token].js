import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Lottie from 'react-lottie';

import { useRouter } from 'next/router';
import { Form, Input, Button, Alert, Typography, Row, Col, Space } from 'antd';
import { FORGOT_PASSWORD_INITIATE } from '../../store/login/Action';
import { langs } from '../../localization';
import { validEmail } from '../../helper/Utils';
import dynamic from 'next/dynamic';
import { PASSWORD_MINLENGTH_REGX } from '../../config/Constant';
import { RESET_PASSWORD_INITIATE } from '../../store/profile/Action';
import animationData from '../../helper/lottie-json/success-animation.json';

const FormInputWrapper = dynamic(() => import('../../components/common/form/InputWrapper'));
const ButtonWraper = dynamic(() => import('../../components/common/form/ButtonWrapper'));
const DocHead = dynamic(() => import('../../components/common/head'));
const { Title } = Typography;

const ResetPassword = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [form] = Form.useForm();
    const [isThankYou, setIsThankYou] = useState(false);
    const [isvalidateLink, setValidateLink] = useState(false);
    const loading = useSelector((state) => state.login.loading);

    const [password, setPassword] = useState('');

    useEffect(() => {
        if (router.query && router.query.token) {
            setValidateLink(true);
        } else if (router.asPath && !router.query.token) {
        }
    }, [router.query]);

    /**
     * @name onFinish
     * @description change the password
     * @param {values}
     * @returns {}
     */
    const onFinish = (values) => {
        delete values.confirm;
        values.token = router.query.token;
        dispatch({
            type: RESET_PASSWORD_INITIATE,
            postData: values,
            form
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
    const successAnimation = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.resetPassword} />
            <section className="login-wrap">
                <div className="login-box">
                    {isvalidateLink ? (
                        <Row>
                            <Col md={9} xs={24}>
                                <div className="login-form">
                                    <div className="login-top">
                                        <div className="login-logo">
                                            <img src="/assets/images/profitley-logo.png" alt="" />
                                        </div>
                                    </div>
                                    {isThankYou ? (
                                        <Fragment>
                                            <Lottie options={successAnimation} height={200} width={200} />
                                            <div className={'align-center'}>
                                            <Title level={4}>Your password has been reset! successfully, Please login with the new password.</Title>
                                            <ButtonWraper 
                                                onClick={()=>router.push('/login')}
                                                type={'primary'}
                                            >
                                                Back to Login
                                            </ButtonWraper>
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <Title level={3}>{langs.labels.resetPassword}</Title>
                                            <Form
                                                form={form}
                                                layout={'vertical'}
                                                name={'reset-password'}
                                                onFinish={(values) => onFinish(values)}
                                                onFinishFailed={onFinishFailed}>
                                                <FormInputWrapper
                                                    label={langs.labels.newPassword}
                                                    name="password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                langs.validationMessages
                                                                    .fieldRequired
                                                        },
                                                        {
                                                            pattern: new RegExp(
                                                                PASSWORD_MINLENGTH_REGX
                                                            ),
                                                            message:
                                                                langs.validationMessages
                                                                    .passwordMinimumPattern
                                                        }
                                                    ]}>
                                                    <Input
                                                        size={'large'}
                                                        value={password}
                                                        onChange={(e) => {
                                                            setPassword(e.target.value);
                                                        }}
                                                    />
                                                </FormInputWrapper>

                                                <FormInputWrapper
                                                    label={langs.labels.confirmPassword}
                                                    name="confirm"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                langs.validationMessages
                                                                    .fieldRequired
                                                        },
                                                        { validator: validPassword }
                                                    ]}>
                                                    <Input size={'large'} />
                                                </FormInputWrapper>

                                                <FormInputWrapper>
                                                    <Button
                                                        type="primary"
                                                        size={'large'}
                                                        htmlType="submit">
                                                        {langs.labels.update}
                                                    </Button>
                                                </FormInputWrapper>
                                            </Form>
                                        </Fragment>
                                    )}
                                </div>
                            </Col>
                            <Col md={15} xs={24} className="m-hide">
                                <div className="login-banner">&nbsp;</div>
                            </Col>
                        </Row>
                    ) : (
                        <div>Invalid Link </div>
                    )}
                </div>
            </section>
        </Fragment>
    );
};

export default ResetPassword;
