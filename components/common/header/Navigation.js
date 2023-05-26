import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentRole } from '../../../helper/AuthActions';
import { getParentCategoriesList } from '../../../store/categories/Action';
import { getProductsMeta } from '../../../store/product/Action';

const { SubMenu } = Menu;

const TopNavigationMenu = () => {
    const route = useRouter();
    const dispatch = useDispatch();
    const appNavigation = JSON.parse(localStorage.getItem('navigation'));
    const [navigationList, setNavigationList] = useState(null);

    const [menuName, setMenuName] = useState('categories');
    const handleMenuName = (e) => {
        setMenuName(e.key);
    };

    const { categories, brands } = useSelector((state) => ({
        brands: state.product.metaData.brands,
        categories: state.categories.parentCategories,
    }));

    useEffect(() => {
        const nav = appNavigation['Desktop'];
        setNavigationList(nav);
        dispatch(getProductsMeta());
        dispatch(getParentCategoriesList());
    }, []);

    useEffect(() => {
        setMenuName(route.pathname);
    }, [route.pathname]);

    useEffect(() => {}, [categories, brands]);

    const currentRole = getCurrentRole() && getCurrentRole().name;

    return (
        <Fragment>
            <Menu
                onClick={handleMenuName}
                selectedKeys={[menuName]}
                mode="horizontal"
                className="main-navigation">
                {navigationList &&
                    navigationList.map((item) => {
                        switch (item.url) {
                            case '/categories':
                                return (
                                    <SubMenu
                                        key="SubMenu"
                                        title={item.name}
                                        className="m-l0"
                                        popupClassName="main-navigation-subnav">
                                        {categories &&
                                            categories.length > 0 &&
                                            categories.map((subItem) => {
                                                // if (subItem.parent == null) {
                                                return (
                                                    <Menu.Item key={subItem.id}>
                                                        <Link
                                                            href={`/shop/category/[category]`}
                                                            as={`/shop/category/${subItem.slug}`}>
                                                            <a>{subItem.name}</a>
                                                        </Link>
                                                    </Menu.Item>
                                                );
                                                // }
                                            })}
                                    </SubMenu>
                                );
                                break;
                            case '/brands':
                                return (
                                    <SubMenu
                                        key="SubMenu2"
                                        title={item.name}
                                        popupClassName="main-navigation-subnav">
                                        <Menu.ItemGroup>
                                            {brands &&
                                                brands.length > 0 &&
                                                brands.map((subItem) => {
                                                    return (
                                                        <Menu.Item key={subItem.id}>
                                                            <Link
                                                                href={`/shop/brand/[brand]`}
                                                                as={`/shop/brand/${subItem.slug}`}>
                                                                <a>{subItem.name}</a>
                                                            </Link>
                                                        </Menu.Item>
                                                    );
                                                })}
                                        </Menu.ItemGroup>
                                    </SubMenu>
                                );
                                break;
                            default:
                                return (
                                    <Menu.Item key={item.url}>
                                        <Link href={item.url} passHref={item.target !== '_self'}>
                                            <a target={item.target}>{item.name}</a>
                                        </Link>
                                    </Menu.Item>
                                );
                                break;
                        }
                    })}
            </Menu>
        </Fragment>
    );
};

export default TopNavigationMenu;
