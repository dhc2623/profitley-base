import { Typography } from 'antd';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux';
import DocHead from '../../components/common/head';
import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import animationData from '../../helper/lottie-json/shopping-cart.json';
import { langs } from '../../localization';
import { GET_CART_INITIATE } from '../../store/cart/Action';
const { Title, Paragraph, Text } = Typography;

const ThankYou = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const distributorDetails = useSelector((state) => state.auth.distributorDetails);
    const orderDetails = useSelector((state) => state.order.lastPlacedOrder);
    const successAnimation = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    useEffect(() => {
        if (isEmpty(orderDetails)) {
            router.push('/shop/products');
        } else {
            dispatch({ type: GET_CART_INITIATE });
        }
    }, []);
    return (
        <Fragment>
            <DocHead pageTitle="Thankyou" />
            <div className="thankyou-box">
                <Lottie options={successAnimation} height={200} width={200} />
                {/* <div className="top-icon">
                <img src="/assets/images/confirmation-icon.png" alt="" />
            </div> */}
                <div className="order-complete">
                    <Title level={3}>{langs.labels.congratulations}</Title>
                    <p className="order-success">
                        {langs.labels.orderScuccessPlaced}
                    </p>
                    <p className="add-items">
                        <Link href="/shop/products">
                            <a className="ant-btn ant-btn-primary ant-btn-lg button-fill">
                                <span>{langs.labels.continueShopping}</span>
                            </a>
                        </Link>
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);   
//     return props;
// }

export default ThankYou;
