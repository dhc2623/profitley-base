import { Button, Col, Row, Typography } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
// import PageTitle from '../../components/common/page-title';
// import LoadData from '../../components/common/load-data';
// import Checkout from './checkout';
// import DocHead from '../../components/common/head';
// import CartList from '../../components/cart/Products';
import ButtonWrapper from '../../components/common/form/ButtonWrapper';
import Panel, { PanelBody, PanelTitle } from '../../components/common/panel';
import Responsive from '../../components/responsive/Responsive';
import { USER_ROLES } from '../../config/Constant';
import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import { getConfirmPromise, getDataInCookies } from '../../helper/Utils';
import { langs } from '../../localization';
import { clearCart, setRetailerDrawer } from '../../store/cart/Action';
// const ButtonWrapper = dynamic(() => import('../../components/common/form/ButtonWrapper'));
import  withAppContext  from '../../config/withAppContext';

const PageTitle = dynamic(() => import('../../components/common/page-title'));
const LoadData = dynamic(() => import('../../components/common/load-data'));
const Checkout = dynamic(() => import('../../components/cart/checkout'));
const DocHead = dynamic(() => import('../../components/common/head'));
const CartList = dynamic(() => import('../../components/cart/Products'));

const Cart = (props) => {
    const {userMe} = props;
    const userDetail = userMe.profile;
    const router = useRouter();
    const dispatch = useDispatch();
    const checkRetailer = async () => {
        let selectedRetailer = getDataInCookies('selectedRetailer');
        if (!selectedRetailer && userDetail.role.name != USER_ROLES.BUYER.name) {
            const confi = await getConfirmPromise({
                title: `${langs.labels.selectBuyer}`,
                content: `${langs.labels.selectBuyerContent}`
            });
            await router.push('/shop/products');
            if (confi) {
                dispatch(setRetailerDrawer(true));
            }
        }
    };
    useEffect(() => {
        checkRetailer();
        console.log('mp')
    }, []);

    const cart = useSelector((state) => state.cart.cartDetails);
    const orderItems = useSelector((state) => state.cart.cartDetails.order_items);
    const loading = useSelector((state) => state.cart.loading);
    const [nextPage, setNextPage] = useState(false);
    const handleNextPage = () => {
        setNextPage(isNext => !isNext);
    };


    const handleClearCart = () => dispatch(clearCart(cart.id))

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.cart} />
            <section className="wrap">
                <Responsive.Mobile>
                    <PageTitle
                        title={langs.labels.cart}
                        itemCount={cart.total_items}
                        action={ cart.total_items != '0' && <Button size={'small'} onClick={handleClearCart}>Clear Items</Button>}
                    />
                </Responsive.Mobile>
                
                <LoadData loading={loading} data={orderItems}>
                    <Row gutter={[16, 0]}>
                        <Col xs={24} md={16} className={nextPage ? "cart-next-hide" : "cart-next-show"}>
                            <Responsive.Mobile>
                                <CartList />
                            </Responsive.Mobile>
                            <Responsive.Desktop>
                                <Panel className="m-t0">
                                    <PanelTitle
                                        title={langs.labels.shoppingCart}
                                        headerRight={
                                            cart.total_items != 0 &&
                                            cart.total_items != undefined && (
                                                <Fragment>
                                                    <Typography.Text type="secondary" strong>
                                                        {cart.total_items <= 1 ? `${langs.labels.totalItem}` : `${langs.labels.totalItems}`}:
                                                    </Typography.Text>{' '}
                                                    <Typography.Text strong>
                                                        {cart.total_items}
                                                    </Typography.Text>
                                                </Fragment>
                                            )
                                        }
                                    />
                                    <PanelBody>
                                        <CartList />
                                    </PanelBody>
                                </Panel>
                            </Responsive.Desktop>

                            <ButtonWrapper
                                onClick={() => router.push('/shop/products')}
                                type="default"
                                block
                                size={'large'}
                                className="m-t10">
                                {langs.labels.addMoreItems}
                            </ButtonWrapper>
                        </Col>
                        <Col xs={24} md={8} className={`animate__animated animate__fadeInRight ${nextPage ? "cart-next-show" : "cart-next-hide"}`}>
                            {/* <ProductSummary className="m-t0" /> */}
                            <Checkout {...props}/>
                            <div style={{ marginBottom: 20 }}>
                                {/*<Link href="/cart/checkout">
                                <ButtonWrapper type="primary" block size={"large"} className="m-t10">
                                    {langs.labels.selectAddressAndCheckout}
                                    </Link>
                                </ButtonWrapper>*/}
                            </div>
                        </Col>
                    </Row>
                    <Responsive.Mobile>
                        <Row gutter={[10, 0]}>
                            <Col span={24}>
                                <ButtonWrapper
                                    onClick={() => handleNextPage()}
                                    type="primary"
                                    block
                                    className={`m-b10 ${nextPage ? "cart-next-show" : "cart-next-hide"}`}>
                                    <ArrowLeftOutlined /> {langs.labels.previous}
                                </ButtonWrapper>
                                <ButtonWrapper
                                    onClick={() => handleNextPage()}
                                    type="primary"
                                    block
                                    className={`m-t10 ${nextPage ? "cart-next-hide" : "cart-next-show"}`}>
                                    {langs.labels.next} <ArrowRightOutlined />
                                </ButtonWrapper>
                            </Col>
                        </Row>
                    </Responsive.Mobile>
                </LoadData>
            </section>
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

// export default Cart;
export default withAppContext(Cart);
