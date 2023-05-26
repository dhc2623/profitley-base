import { Fragment } from 'react';
import Link from 'next/link';
import { Result, Typography } from 'antd';
import Lottie from 'react-lottie';
import animationData from '../../helper/lottie-json/404-network.json';
import { langs } from '../../localization';
const { Title } = Typography;

const NoInternet = () => {
    const successAnimation = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className="no-internet-box">
            <Result
                status="success"
                icon={<Lottie options={successAnimation} width={300} height={200} />}
                title={langs.labels.whoops}
                subTitle={<Title level={5}>{langs.labels.noInternetContent}</Title>}
            />
        </div>
    );
};

export default NoInternet;