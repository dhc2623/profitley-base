import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { Col, Collapse, Drawer, Layout, Row, Typography } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../../helper/AuthActions';
import { getSettings } from '../../../helper/Utils';
import { langs } from '../../../localization';
import Responsive from '../../responsive/Responsive';
import Icon from '../customIcons/customIcons';
const ProductDrawerFilter = dynamic(() => import('../../shop/ProductDrawerFilter'));
const Image = dynamic(() => import('../../common/image'));
const { Footer } = Layout;
const { Panel } = Collapse;
const { Text } = Typography;
/**
 * @name getActiveFooterKey
 * @description It returns active footer key.
 * @param {pathname}
 * @returns {key}
 */
const getActiveFooterKey = (pathname, itemUrl) => (pathname === itemUrl ? 'active' : '');

const AppFooter = ({ filterOption = true, ...props }) => {
    const appNavigation = JSON.parse(localStorage.getItem('navigation'));
    const dispatch = useDispatch();
    const router = useRouter();
    const cart = useSelector((state) => state.cart.cartDetails);
    const favourite = useSelector((state) => state.favourite.favouriteIds);
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const [navigationList, setNavigationList] = useState(null);
    const [hideNavigationList, sethideNavigationList] = useState([]);
    const [moreDrawerVisible, setmoreDrawerVisible] = useState(false);
    const { categories } = useSelector((state) => ({
        categories: state.categories.parentCategories
    }));
    const { pathname } = router;

    useEffect(() => {
        const nav = appNavigation['Mobile-Footer'];
        if (nav && nav.length > 0) {
            setNavigationList(nav);
            sethideNavigationList(nav.slice(5, 20));
        }
    }, []);

    useEffect(() => {
        if (
            pathname === '/about-us' ||
            pathname === '/contact-us' ||
            pathname === '/faq' ||
            pathname === '/terms-and-condition' ||
            pathname === '/privacy-policy'
        ) {
            setIsFooterVisible(true);
        } else {
            setIsFooterVisible(false);
        }
    }, [pathname]);

    useEffect(() => {}, [categories]);

    let settings = getSettings();
    let generalSettings = settings.General;

    const showMoreDrawer = () => {
        setmoreDrawerVisible(true);
    };

    const closeMoreDrawer = () => {
        setmoreDrawerVisible(false);
    };

    return (
        <Fragment>
            <Responsive.Desktop>
                <footer className="te-footer">
                    <div className="wrap">
                        <Row>
                            <Col span={8}>
                                <div className="footer-column-1">
                                    <div className="footer-logo">
                                        <img
                                            src={generalSettings.site_logo.value}
                                            width={156}
                                            height={43}
                                            alt={`${generalSettings.site_name.value} Logo`}
                                        />
                                    </div>
                                    <ul className="te-footer-address-list">
                                        <li>
                                            <img
                                                src="/assets/images/svg/map-icon.svg"
                                                className="icon"
                                            />
                                            <p>{generalSettings.contact_address.value}</p>
                                        </li>
                                        <li>
                                            <img
                                                src="/assets/images/svg/letter.svg"
                                                className="icon"
                                            />
                                            <p>
                                                <a
                                                    href={`mailto:${generalSettings.contact_form_email.value}`}>
                                                    {generalSettings.contact_form_email.value}
                                                </a>
                                            </p>
                                        </li>
                                        <li>
                                            <img
                                                src="/assets/images/svg/telephone.svg"
                                                className="icon"
                                            />
                                            <p>
                                                <a
                                                    href={`tel:${generalSettings.contact_mobile.value}`}>
                                                    {generalSettings.contact_mobile.value}
                                                </a>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="footer-column-2">
                                    <Typography.Title level={3}>
                                        {langs.labels.categories}
                                    </Typography.Title>
                                    <ul>
                                        {categories &&
                                            categories.length > 0 &&
                                            categories.slice(0, 10).map((item) => {
                                                // if (item.parent == null) {
                                                return (
                                                    <li key={item.id}>
                                                        <Link href={`/shop/category/${item.slug}`}>
                                                            <a>
                                                                <RightOutlined /> {item.name}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                );
                                                // }
                                            })}
                                        {/* {categories.map((item) => (
                                            <li key={item.id}>
                                                <Link href={`/shop/category/${item.slug}`}>
                                                    <a><RightOutlined />  {item.name}</a>
                                                </Link>
                                            </li>
                                        ))} */}
                                    </ul>
                                </div>
                            </Col>
                            <Col span={4}>
                                <div className="footer-column-3">
                                    <Typography.Title level={3}>
                                        {langs.labels.usefulLinks}
                                    </Typography.Title>
                                    <ul>
                                        <li>
                                            <Link href="/about-us">
                                                <a>
                                                    <RightOutlined /> {langs.labels.aboutUs}
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/contact-us">
                                                <a>
                                                    <RightOutlined /> {langs.labels.contactUs}
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/terms-and-condition">
                                                <a>
                                                    <RightOutlined />{' '}
                                                    {langs.labels.termsAndConditions}
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/privacy-policy">
                                                <a>
                                                    <RightOutlined /> {langs.labels.privacyPolicy}
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col span={4}>
                                <div className="footer-column-3">
                                    <Typography.Title level={3}>
                                        {langs.labels.quickLinks}
                                    </Typography.Title>
                                    <ul>
                                        <li>
                                            <Link href="/faq">
                                                <a>
                                                    <RightOutlined /> {langs.labels.faqs}
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="footer-bottonm">
                        <div
                            className="align-center"
                            dangerouslySetInnerHTML={{
                                __html: generalSettings.footer_text.value
                            }}></div>
                    </div>
                </footer>
            </Responsive.Desktop>
            <Responsive.Mobile>
                {isUserLoggedIn() && (
                    <Fragment>
                        {isFooterVisible && (
                            <Fragment>
                                <section id="why_box_container">
                                    <div className="footer-card">
                                        <div className="footer-card-title">
                                            <Typography.Title level={5}>
                                                {langs.labels.whySipl}
                                            </Typography.Title>
                                        </div>
                                        <div className="footer-card-body">
                                            <Row>
                                                <Col span={8}>
                                                    <div className="why-box">
                                                        <div className="product-img">
                                                            <Image
                                                                src={
                                                                    '/assets/images/genuine-parts.png'
                                                                }
                                                                width={32}
                                                                height={30}
                                                                alt="genuine-parts"
                                                            />
                                                        </div>
                                                        <Typography.Title level={5}>
                                                            {langs.labels.genuineParts}
                                                        </Typography.Title>
                                                        <p>{langs.labels.genuinePartsContent}</p>
                                                    </div>
                                                </Col>
                                                <Col span={8}>
                                                    <div className="why-box">
                                                        <div className="product-img">
                                                            <Image
                                                                src={
                                                                    '/assets/images/high-visibility.png'
                                                                }
                                                                width={32}
                                                                height={30}
                                                                alt="high-visibility"
                                                            />
                                                        </div>
                                                        <Typography.Title level={5}>
                                                            {langs.labels.highVisibility}
                                                        </Typography.Title>
                                                        <p>{langs.labels.highVisibilityContent}</p>
                                                    </div>
                                                </Col>
                                                <Col span={8}>
                                                    <div className="why-box">
                                                        <div className="product-img">
                                                            <Image
                                                                src={
                                                                    '/assets/images/on-time-delivery.png'
                                                                }
                                                                width={40}
                                                                height={23}
                                                                alt="on-time-delivery"
                                                            />
                                                        </div>
                                                        <Typography.Title level={5}>
                                                            {langs.labels.onTimeDelivery}
                                                        </Typography.Title>
                                                        <p>
                                                            {langs.labels.allOrderDeliveredOnTime}
                                                        </p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </section>
                                <Collapse
                                    accordion
                                    expandIconPosition={'right'}
                                    expandIcon={() => <PlusOutlined />}
                                    className="more-info">
                                    <Panel header={langs.labels.sipl} key="1">
                                        <p>{langs.labels.comingSoon}...</p>
                                    </Panel>
                                    <Panel header={langs.labels.information} key="2">
                                        <p>{langs.labels.comingSoon}...</p>
                                    </Panel>
                                    <Panel header={langs.labels.polices} key="3">
                                        <p>{langs.labels.comingSoon}...</p>
                                    </Panel>
                                    <Panel header={langs.labels.needHelp} key="4">
                                        <p>{langs.labels.comingSoon}...</p>
                                    </Panel>
                                </Collapse>

                                {/* <section id="social">
                                    <Row className="align-center">
                                        <Col span={24}>
                                            {generalSettings.social_links.value.facebook && (
                                                <a
                                                    href={
                                                        generalSettings.social_links.value.facebook
                                                    }
                                                    target="_blank">
                                                    <img
                                                        src={'/assets/images/svg/fb.svg'}
                                                        alt="fb"
                                                    />
                                                </a>
                                            )}
                                            {generalSettings.social_links.value.instagram && (
                                                <a
                                                    href={
                                                        generalSettings.social_links.value.instagram
                                                    }
                                                    target="_blank">
                                                    <img
                                                        src={'/assets/images/svg/intragram.svg'}
                                                        alt="intragram"
                                                    />
                                                </a>
                                            )}
                                            {generalSettings.social_links.value.twitter && (
                                                <a
                                                    href={
                                                        generalSettings.social_links.value.twitter
                                                    }
                                                    target="_blank">
                                                    <img
                                                        src={'/assets/images/svg/twitter.svg'}
                                                        alt="twitter"
                                                    />
                                                </a>
                                            )}
                                            {generalSettings.social_links.value.pinterest && (
                                                <a
                                                    href={
                                                        generalSettings.social_links.value.pinterest
                                                    }
                                                    target="_blank">
                                                    <img
                                                        src={'/assets/images/svg/pintrest.svg'}
                                                        alt="pintrest"
                                                    />
                                                </a>
                                            )}
                                            {generalSettings.social_links.value.youtube && (
                                                <a
                                                    href={
                                                        generalSettings.social_links.value.youtube
                                                    }
                                                    target="_blank">
                                                    <img
                                                        src={'/assets/images/svg/youtube.svg'}
                                                        alt="youtube"
                                                    />
                                                </a>
                                            )}
                                            {generalSettings.social_links.value.linkedin && (
                                                <a
                                                    href={
                                                        generalSettings.social_links.value.linkedin
                                                    }
                                                    target="_blank">
                                                    <img
                                                        src={'/assets/images/svg/linkedin.svg'}
                                                        alt="linkedin"
                                                    />
                                                </a>
                                            )}
                                        </Col>
                                    </Row>
                                </section>
                             */}
                            </Fragment>
                        )}
                    </Fragment>
                )}
                <div className={'te-mobile-footer-space'}></div>
                <Footer
                    className="mobile-view desktop-view-none te-mobile-footer"
                    onClick={moreDrawerVisible ? closeMoreDrawer : undefined}>
                    <Row>
                        {navigationList &&
                            navigationList.map(
                                (item, index) =>
                                    index < 5 &&
                                    (item.url === '/search' ? (
                                        <Col
                                            flex={'1'}
                                            className={`footer-link-item ${getActiveFooterKey(
                                                router.pathname,
                                                item.url
                                            )}`}>
                                            <a>
                                                <span className="icon">
                                                    <img
                                                        src={item.icon_url}
                                                        alt={item.name}
                                                        width=""
                                                        className="red-icon"
                                                    />

                                                    <ProductDrawerFilter />
                                                </span>
                                                <p>{langs.labels[item.name]}</p>
                                            </a>
                                        </Col>
                                    ) : (
                                        <Col
                                            flex={'1'}
                                            className={`footer-link-item ${getActiveFooterKey(
                                                router.pathname,
                                                item.url
                                            )}`}>
                                            <Link href={item.url}>
                                                <a>
                                                    <span className="icon">
                                                        <img
                                                            src={item.icon_url}
                                                            alt={item.name}
                                                            width=""
                                                            className="red-icon"
                                                        />
                                                        {item.url === '/cart' &&
                                                            cart &&
                                                            cart.total_items != 0 &&
                                                            cart.total_items != undefined && (
                                                                <Text className="count-item">
                                                                    {cart.total_items}
                                                                </Text>
                                                            )}
                                                        {item.url === '/my-favourite' &&
                                                            favourite && (
                                                                <Text className="count-item">
                                                                    {favourite.length > 0
                                                                        ? favourite.length
                                                                        : '0'}
                                                                </Text>
                                                            )}
                                                        {item.url === '/search' && (
                                                            <ProductDrawerFilter />
                                                        )}
                                                    </span>
                                                    <p>{langs.labels[item.name]}</p>
                                                </a>
                                            </Link>
                                        </Col>
                                    ))
                            )}
                        {hideNavigationList.length > 0 && (
                            <Col flex={'1'} className="footer-link-item">
                                <Link href="/">
                                    <a>
                                        <span className="icon">
                                            <Icon icon="ellipsis-h" color="#929292" size="20" />
                                        </span>
                                        <p>{langs.labels.more}</p>
                                    </a>
                                </Link>
                                <Fragment>
                                    <a onClick={showMoreDrawer} className="filter-icon">
                                        <img
                                            src="/assets/images/svg/filter-icon.svg"
                                            alt="Filter"
                                        />
                                    </a>
                                    <Drawer
                                        placement="bottom"
                                        closable={true}
                                        width={'100%'}
                                        height={140}
                                        onClose={closeMoreDrawer}
                                        closeIcon={
                                            <Icon icon="chevron-down" color="#929292" size="25" />
                                        }
                                        visible={moreDrawerVisible}
                                        className={'more-drawer'}>
                                        <ul className={'more-drawer-list'}>
                                            {hideNavigationList.map((item) => (
                                                <li>
                                                    <Link
                                                        href={item.url}
                                                        passHref={item.target !== '_self'}>
                                                        <a target={item.target}>
                                                            <span className="icon">
                                                                {item.icon_url ? (
                                                                    <img
                                                                        src={item.icon_url}
                                                                        alt={item.name}
                                                                        width=""
                                                                        className="red-icon"
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src="/assets/images/svg/reports-red-icon.svg"
                                                                        className="red-icon"
                                                                    />
                                                                )}
                                                            </span>
                                                            {langs.labels[item.name]}
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </Drawer>
                                </Fragment>
                            </Col>
                        )}
                    </Row>
                </Footer>
            </Responsive.Mobile>
        </Fragment>
    );
};
export default AppFooter;
