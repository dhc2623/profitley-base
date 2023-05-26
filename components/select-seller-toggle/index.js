import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import { Drawer, List, Typography, Avatar } from 'antd';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getRetailerForCart } from '../../store/cart/Action';
import { getCurrentRole, getUserDetails, isUserLoggedIn } from '../../helper/AuthActions';
import { USER_ROLES } from '../../config/Constant';
import { langs } from '../../localization';
import { getSellers, setSeller, setSellerDrawer } from '../../store/seller/Action';
const LoadData = dynamic(() => import('../common/load-data'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));

export default function SelectSeller() {
    const { sellersDrawer, cartId, sellers, sellerLoading, currentUser } = useSelector((state) => ({
        cartId: state.cart.cartDetails.id,
        sellerLoading: state.seller.loading,
        sellers: state.seller.sellers,
        sellersDrawer: state.seller.sellersDrawer,
        currentUser: state.auth.profile
    }));
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get('setSeller') && getUserDetails().role.name == USER_ROLES.BUYER.name) {
            Cookies.set('setSeller', true,  { expires: 365 });
            if (isUserLoggedIn()) {
                dispatch(getSellers());
            }
            dispatch(setSellerDrawer(true));
        }
    }, []);

    useEffect(() => {
        if (sellersDrawer == true && sellers.length == 0 && currentUser.organizations_count > 1) {
            if (isUserLoggedIn()) {
                dispatch(getSellers());
            }
        }
    }, [sellersDrawer]);

    const onClose = () => {
        dispatch(setSellerDrawer(false));
        setTimeout(() => document.body.style.removeProperty('overflow'), 500);
    };

    /**
     * @name onFinish
     * @description handle retailer selection
     * @param {}
     * @returns {}
     */
    const handleSetSeller = (id) => {
        dispatch(setSeller(id));
        if (cartId) {
            dispatch(clearCart(cartId));
        }
        router.push('/');
    };
    return (
        <Fragment>
            {currentUser.organizations_count > 1 && (
                <Drawer
                    title={langs.labels.selectSeller}
                    placement="right"
                    closable={true}
                    width={320}
                    className="drawer-select-buyer"
                    onClose={onClose}
                    bodyStyle={{ padding: 0 }}
                    visible={sellersDrawer}>
                    <LoadData data={sellers} loading={sellerLoading}>
                        <List
                            size="large"
                            bordered
                            dataSource={sellers}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.site_logo} />}
                                        title={item.name}
                                        description={
                                            <div>
                                                <Typography.Paragraph className="m-b5">
                                                    <PhoneOutlined />{' '}
                                                    <a href={`tel:${item.mobile}`}>{item.mobile}</a>
                                                </Typography.Paragraph>
                                                <Typography.Paragraph className="m-b5">
                                                    <EnvironmentOutlined /> {item.street_1},{' '}
                                                    {item.street_2}, {item.cityName},{' '}
                                                    {item.districtName}, {item.stateName}, {'India'}{' '}
                                                    - {item.pincode}
                                                </Typography.Paragraph>
                                                {currentUser.organization_id !== item.id && (
                                                    <ButtonWraper
                                                        onClick={() => handleSetSeller(item.id)}>
                                                        {'Select'}
                                                    </ButtonWraper>
                                                )}
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </LoadData>
                </Drawer>
            )}
        </Fragment>
    );
}
