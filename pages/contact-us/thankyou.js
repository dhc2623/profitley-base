import { Fragment } from 'react';
import Link from 'next/link';
import { Result, Typography } from 'antd';
import DocHead from '../../components/common/head';

import { langs } from '../../localization';
import Lottie from 'react-lottie';
import animationData from '../../helper/lottie-json/contactus.json';
import { serverCheckIsUserLogin } from '../../helper/AuthActions';
const { Title } = Typography;

const ThankYou = () => {
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
                icon={<Lottie options={successAnimation} width={300} height={200} />}
                title={`${langs.labels.thankYou}!!`}
                subTitle={<Title level={5}>{langs.labels.thankYouMessage}</Title>}
                extra={[
                    <p className="add-items">
                        <Link href="/">
                            <a className="ant-btn ant-btn-primary ant-btn-lg button-fill">
                                <span>{langs.labels.backToHome}</span>
                            </a>
                        </Link>
                    </p>
                ]}
            />
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default ThankYou;
