import {
    ArrowLeftOutlined, PhoneOutlined, StarFilled
} from '@ant-design/icons';
import { Avatar, Col, Drawer, Layout, Menu, Row, Select, Tag, Typography } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../../contexts/userContext';
import { getCurrentRole, isUserLoggedIn, logout } from '../../../helper/AuthActions';
import { getActiveMenuKey, getSettings } from '../../../helper/Utils';
import { langs } from '../../../localization';
import { setChild } from '../../../store/common/Action';
import { NotificationMenu } from '../notification';
const HeaderSearch = dynamic(() => import('./HeaderSearch'));
const TopNavigationMenu = dynamic(() => import('./Navigation'));
const SidebarNavigation = dynamic(() => import('./SidebarNavigation'));
const Image = dynamic(() => import('../../common/image'));
const { Text } = Typography;
const { SubMenu } = Menu;
const { Option } = Select;
const linkStyle = {
    marginRight: 15
};

export default function AppHeader() {
    const { setAppLang, appLanguage } = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const [searchvisible, setSearchVisible] = useState(false);
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScroll(window.scrollY > 35);
        });
    }, []);
    const router = useRouter();
    const [selectedKey, setSelectedKey] = useState([]);
    const cart = useSelector((state) => state.cart.cartDetails);
    const profileData = useSelector((state) => state.auth.profile);
    const favourite = useSelector((state) => state.favourite.favouriteIds);
    const favouriteListReducer = useSelector((state) => state.favourite);
    const dispatch = useDispatch();
    const isBackButton = useSelector((state) => state.common.backButton);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    useEffect(() => {
        // dispatch({ type: GET_HOME_DATA_INITIATE });
    }, [profileData.organization_id, isBackButton]);

    useEffect(() => {
        if (router.pathname) {
            let activeKey = getActiveMenuKey(router.pathname);
            setSelectedKey(activeKey);
        }
    }, [router.pathname]);

    const back = (e) => {
        if (typeof isBackButton !== "boolean") {
            router.push(isBackButton);
        } else {
            router.back();
        }
        dispatch(setChild(true));
    };

    const changeLang = (name) => {
        onClose();
        setAppLang(name);
    }

    const currentRole = getCurrentRole() && getCurrentRole().name;
    let settings = getSettings();
    let generalSettings = settings.General;

    return (
        <Layout.Header className="profitley-header">
            <div
                className={`container-fluid bg-white m-hide header-top-bar ${scroll ? 'hide' : ''
                    }`}>
                <div className="wrap">
                    <Row>
                        <Col span={10}>
                            <ul className="header-top-left">
                                <li>
                                    {/* {settings.site_name.value} */}

                                    <a href={`tel:${generalSettings.contact_mobile.value}`}>
                                        <img
                                            style={{
                                                visibility: 'hidden',
                                                width: '1px',
                                                height: '20px'
                                            }}
                                            src="/assets/images/svg/letter-gray.svg"
                                            alt="letter"
                                        />
                                        <img src="/assets/images/svg/phone.svg" alt="phone" />
                                        <span
                                            className={'p-l5'}
                                            style={{
                                                display: 'inline-block'
                                            }}>
                                            {generalSettings.contact_mobile.value}
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        href={`mailto:${generalSettings.contact_form_email.value}`}>
                                        <a>
                                            <img
                                                src="/assets/images/svg/letter-gray.svg"
                                                alt="letter"
                                            />{' '}
                                            {generalSettings.contact_form_email.value}
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                        <Col span={14}>
                            <ul className="header-top-right">
                                {isUserLoggedIn() ? (
                                    <Fragment>
                                        <li>
                                            <a onClick={showDrawer}>
                                                <img
                                                    style={{
                                                        visibility: 'hidden'
                                                    }}
                                                    src={'/assets/images/svg/avatar-black.svg'}
                                                    alt="avatar"
                                                    className="v-a-middle"
                                                />
                                                {langs.labels.hello}
                                                {', '} {profileData.name} {profileData.last_name}
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={showDrawer}>
                                                <img
                                                    src={'/assets/images/svg/avatar-black.svg'}
                                                    alt="avatar"
                                                    className="v-a-middle"
                                                />
                                                {langs.labels.myAccount}
                                            </a>
                                        </li>
                                        <li>
                                            <div
                                                onClick={() => {
                                                    logout();
                                                    // onClose();
                                                }}>

                                                <a style={linkStyle}>
                                                    <img
                                                        src="/assets/images/logout-icon.png"
                                                        alt="logout-icon"
                                                        className="v-a-middle"
                                                    />
                                                    {langs.labels.logOut}
                                                </a>

                                            </div>
                                        </li>
                                    </Fragment>
                                ) : (
                                    <li>
                                        <a onClick={() => router.push('/login')}>
                                            <img
                                                src={'/assets/images/svg/avatar-black.svg'}
                                                alt="avatar"
                                                className="v-a-middle"
                                            />
                                            {langs.labels.myAccount}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="container-fluid">
                <div className="wrap">
                    {searchvisible ? (
                        isUserLoggedIn() && <HeaderSearch setSearchVisible={setSearchVisible} />
                    ) : (
                        <div className={`profitley-header-box`}>
                            <div className="profitley-header-left">
                                {!isBackButton ? (
                                    <div className="humber-menu d-hide" onClick={showDrawer}>
                                        <Image
                                            src={'/assets/images/svg/menu.svg'}
                                            width={18}
                                            height={15}
                                            alt="Menu"
                                        />
                                    </div>
                                ) : (
                                    <div className="page-back d-hide" onClick={back}>
                                        <ArrowLeftOutlined />
                                    </div>
                                )}
                                <a href={`/dashboard/${currentRole}`} className="logo-mobile d-hide">
                                    <img
                                        src={generalSettings.mobile_logo.value}
                                        width={100}
                                        height={28}
                                        alt={`${generalSettings.site_name.value} Logo`}
                                    />
                                </a>
                                <a href={`/dashboard/${currentRole}`} className="logo m-hide">
                                    <img
                                        src={generalSettings.site_logo.value}
                                        width={150}
                                        height={42}
                                        alt={`${generalSettings.site_name.value} Logo`}
                                    />
                                </a>
                            </div>
                            {isUserLoggedIn() && (
                                <div className="profitley-header-middle">
                                    <HeaderSearch />
                                </div>
                            )}
                            {isUserLoggedIn() && (
                                <div className="profitley-header-right">
                                    <HeaderSearch hideDesktopSearch={true} />
                                    <NotificationMenu />
                                    <Link href="/my-favourite">
                                        <a className="header-favourite  m-hide">
                                            <StarFilled />
                                            <Text className="count-item">
                                                {favourite && favourite.length > 0
                                                    ? favourite.length
                                                    : '0'}
                                            </Text>
                                        </a>
                                    </Link>
                                    <Link href="/cart">
                                        <a className="header-cart m-hide">
                                            <img
                                                src="/assets/images/svg/shopping-cart-orange.svg"
                                                alt="cart"
                                            />
                                            {cart &&
                                                cart.total_items != 0 &&
                                                cart.total_items != undefined && (
                                                    <Text className="count-item">
                                                        {cart.total_items}
                                                    </Text>
                                                )}
                                        </a>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="header-bottom">
                    <div className="wrap">
                        <Row className="pt-10 header-bottom">
                            <Col span={24}>
                                <TopNavigationMenu />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>

            <Drawer
                width="375px"
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ padding: 0 }}>
                <div className="profile-number">
                    <div>
                        <span><PhoneOutlined /> {langs.labels.contactSales}{': '}</span>
                        <a href={`tel:${generalSettings.contact_mobile.value}`}>
                            {generalSettings.contact_mobile.value}
                        </a>
                    </div>
                    <Select defaultValue={appLanguage} onChange={changeLang} bordered={false}>
                        <Option value="en">{'English'}</Option>
                        <Option value="hi">{'Hindi'}</Option>
                        <Option value="kannada">{'Kannada'}</Option>
                        <Option value="tamil">{'Tamil'}</Option>
                        <Option value="telugu">{`Telugu`}</Option>
                    </Select>
                </div>
                <div className="profile-card">
                    <div onClick={onClose} className="close-menu">
                        <img
                            src="/assets/images/svg/close-menu.svg"
                            alt="Close"
                            className="v-a-bottom"
                        />
                    </div>
                    <div className="profile-card-img">
                        {profileData.picture_thumb && (
                            <Avatar src={profileData.picture_thumb} size={46} />
                        )}
                    </div>
                    <div className="profile-card-info">
                        <Typography.Title level={4}>
                            {profileData.name} {profileData.last_name}{' '}
                        </Typography.Title>
                        <p className={'m-b0'}>
                            <Tag color={'#FF8000'}>{profileData.roleName}</Tag>
                        </p>
                    </div>
                </div>
                <div className={'mobile-side-navigation'}>

                    <SidebarNavigation drawerClose={onClose} />

                    </div>
            </Drawer>
        </Layout.Header>
    );
}
