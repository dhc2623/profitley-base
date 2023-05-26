import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Form, Input, Tabs, Select, Row, Col, Typography } from 'antd';
import { langs } from '../localization';
import FormInputWrapper from '../components/common/form/InputWrapper';
import {
    GET_CITIES_INITIATE,
    GET_DISTRICT_INITIATE,
    GET_STATE_INITIATE
} from '../store/master/Action';
import {
    COUNTRY_LIST,
    VALIDATE_EMAIL,
    VALIDATE_GSTIN,
    VALIDATE_MOBILE_NUMBER_LENGTH,
    VALIDATE_ZIP_CODE
} from '../config/Constant';
import { RETAILER_SIGNUP_INITIATE } from '../store/login/Action';
const ButtonWraper = dynamic(() => import('../components/common/form/ButtonWrapper'));
const DocHead = dynamic(() => import('../components/common/head'));
import { useRouter } from 'next/router';
import AddBuyerForm from '../components/addBuyer';
const { Option } = Select;
const { Title, Text } = Typography;
const TabPane = Tabs.TabPane;

const SignUp = (props) => {
    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.signUp} />
            <section className="login-wrap">
                <div className="login-box">
                    <Row>
                        <Col lg={24} md={24} xs={24}>
                            <div className="signup-form">
                                <div className="login-top">
                                    <div className="login-logo">
                                        <img src="/assets/images/profitley-logo.png" alt="" />
                                    </div>
                                    <Title level={3} strong className="p-b5">{langs.labels.signUp}</Title>
                                    <p>{langs.labels.signupSubTitle}</p>
                                </div>
                                <AddBuyerForm />
                                <Row className="m-t20 p-t20 p-b15">
                                    <Col span={24} className="align-center">
                                        <Text type="secondary" className="already-text">{langs.labels.alreadyHaveAccount} </Text>
                                        <Link href="/login">
                                            <a>{langs.labels.backToLogin}</a>
                                        </Link>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </Fragment>
    );
};
export default SignUp;
