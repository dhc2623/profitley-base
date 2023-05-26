import { Result, Typography } from 'antd';
import Link from 'next/link';
import { Fragment } from 'react';
import Lottie from 'react-lottie';
import DocHead from '../components/common/head';
import { serverCheckIsUserLogin } from '../helper/AuthActions';
import animationData from '../helper/lottie-json/login-success.json';
import { langs } from '../localization';
const { Title } = Typography;

const signupThankYou = () => {
    const successAnimation = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.thankYou} />

            <Result
                status="success"
                icon={<Lottie options={successAnimation} width={370} height={270} />}
                title={`Thank you for signing up!!`}
                subTitle={<Title level={5}>{'We will get back to you shortly.'}</Title>}
                className={'p-l0 p-r0'}
                extra={[
                    <p className="add-items">
                        <Link href="/login">
                            <a className="ant-btn ant-btn-primary ant-btn-lg button-fill">
                                <span>{'Back To Login'}</span>
                            </a>
                        </Link>
                    </p>
                ]}
            />
        </Fragment>
    );
};

export default signupThankYou;
