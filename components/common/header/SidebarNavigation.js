import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { logout } from '../../../helper/AuthActions';
import { getActiveMenuKey } from '../../../helper/Utils';
import { langs } from '../../../localization';

const { SubMenu } = Menu;
const linkStyle = {
    marginRight: 15
};

const SidebarNavigation = (props) => {
    const { drawerClose } = props;
    const appNavigation = JSON.parse(localStorage.getItem('navigation'));
    const router = useRouter();
    const [selectedKey, setSelectedKey] = useState([]);
    const [navigationList, setNavigationList] = useState(null);

    useEffect(() => {
        setNavigationList(appNavigation['Side-Menu']);
    }, []);

    useEffect(() => {
        if (router.pathname) {
            let activeKey = getActiveMenuKey(router.pathname);
            setSelectedKey(activeKey);
        }
    }, [router.pathname]);

    return (
        <Fragment>
            <Menu mode="inline" defaultSelectedKeys={selectedKey}>
                {navigationList &&
                    navigationList.map((item) => {
                        if (item.children.length <= 0) {
                            return (
                                <Menu.Item key={item.url} onClick={drawerClose}>
                                    <Link href={item.url} passHref={item.target !== '_self'}>
                                        <a style={linkStyle} target={item.target}>
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
                                            <h6>{langs.labels[item.name]}</h6>
                                        </a>
                                    </Link>
                                </Menu.Item>
                            );
                        } else {
                            return (
                                <SubMenu
                                    rootPrefixCls={'sub'}
                                    key={item.url}
                                    title={
                                        <a>
                                            <span className="icon">
                                                {item.icon_url ? (
                                                    <img
                                                        src={item.icon_url}
                                                        alt={item.name}
                                                        className="red-icon"
                                                    />
                                                ) : (
                                                    <img
                                                        src="/assets/images/svg/reports-red-icon.svg"
                                                        className="red-icon"
                                                    />
                                                )}
                                            </span>
                                            <h6>{langs.labels[item.name]}</h6>
                                        </a>
                                    }>
                                    {item.childNav &&
                                        item.childNav.map((subItem) => {
                                            return (
                                                <Menu.Item key={subItem.url} onClick={drawerClose}>
                                                    <Link
                                                        href={subItem.url}
                                                        passHref={subItem.target !== '_self'}>
                                                        <a
                                                            style={linkStyle}
                                                            target={subItem.target}>
                                                            <h6>{langs.labels[subItem.name]} </h6>
                                                        </a>
                                                    </Link>
                                                </Menu.Item>
                                            );
                                        })}
                                </SubMenu>
                            );
                        }
                    })}
                <Menu.Item key="10" onClick={drawerClose}>
                    {/* <Link href="/reports"> */}
                    <a style={linkStyle}>
                        <span className="icon">
                            <img
                                src="/assets/images/svg/reports-red-icon.svg"
                                alt={langs.labels.reports}
                                width=""
                                className="red-icon"
                            />
                        </span>
                        <h6>
                            {langs.labels.reports} <small>({langs.labels.comingSoon})</small>
                        </h6>
                    </a>
                    {/* </Link> */}
                </Menu.Item>
                <Menu.Item key="sync" onClick={drawerClose}>
                    <Link href="/sync">
                    <a style={linkStyle}>
                        <span className="icon">
                            <img
                                src="/assets/images/svg/reports-red-icon.svg"
                                alt={langs.labels.reports}
                                width=""
                                className="red-icon"
                            />
                        </span>
                        <h6>
                        {langs.labels.sync}
                        </h6>
                    </a>
                    </Link>
                </Menu.Item>
                {/* <Menu.Item key="11" onClick={drawerClose}>
                    <Link href="/my-profile/profile-view">
                        <a style={linkStyle}>
                            <span className="icon">
                                <img
                                    src="/assets/images/svg/man-user-red-icon.svg"
                                    alt={langs.labels.myProfile}
                                    width=""
                                    className="red-icon"
                                />
                            </span>
                            <h6>{langs.labels.myProfile}</h6>
                        </a>
                    </Link>
                </Menu.Item> */}

                {/* {(currentRole == USER_ROLES.SELLER.name || currentRole == USER_ROLES.OWNER.name) && (
                            <Menu.Item key="14" onClick={drawerClose}>
                                <Link href="/settings">
                                    <a style={linkStyle}>
                                        <span className="icon">
                                            <img
                                                src="/assets/images/svg/settings-red-icon.svg"
                                                alt={langs.labels.configurationAndSettings}
                                                width=""
                                                className="red-icon"
                                            />
                                        </span>
                                        <h6>{langs.labels.configurationAndSettings}</h6>
                                    </a>
                                </Link>
                            </Menu.Item>
                        )} */}
                <Menu.SubMenu
                    rootPrefixCls={'sub'}
                    key="sub1"
                    title={
                        <a>
                            <span className="icon">
                                <img
                                    src="/assets/images/svg/need-help-red-icon.svg"
                                    alt={langs.labels.help}
                                    width=""
                                    className="red-icon"
                                />
                            </span>
                            <h6>{langs.labels.help}</h6>
                        </a>
                    }>
                    <Menu.Item key="sub-1" onClick={drawerClose}>
                        <a
                            href={'https://profitley.freshdesk.com/support/home'}
                            target={'_blank'}
                            style={linkStyle}>
                            <h6>{langs.labels.guide} </h6>
                        </a>
                    </Menu.Item>
                    <Menu.Item key="sub-2" onClick={drawerClose}>
                        <a
                            href={'https://profitley.freshdesk.com/support/home'}
                            target={'_blank'}
                            style={linkStyle}>
                            <h6>{langs.labels.faqs} </h6>
                        </a>
                    </Menu.Item>
                    <Menu.Item key="sub-3" onClick={drawerClose}>
                        <a
                            href={'https://profitley.freshdesk.com/support/home'}
                            target={'_blank'}
                            style={linkStyle}>
                            <h6>{langs.labels.support} </h6>
                        </a>
                    </Menu.Item>
                </Menu.SubMenu>

                <Menu.Item
                    key="16"
                    onClick={() => {
                        // onClose();
                        logout();
                    }}>
                    <a style={linkStyle}>
                        <span className="icon">
                            <img
                                src="/assets/images/svg/logout-red-icon.svg"
                                alt="Logout"
                                width=""
                                className="red-icon"
                            />
                        </span>
                        <h6>{langs.labels.logOut}</h6>
                    </a>
                </Menu.Item>
            </Menu>
        </Fragment>
    );
};

export default SidebarNavigation;
