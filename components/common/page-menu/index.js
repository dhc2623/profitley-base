import { Menu } from 'antd';
import { Fragment } from 'react';
import _ from 'lodash';
const { SubMenu } = Menu;
// Reference array for nav items
// [
//     {
//         name: String,
//         slug: String,
//         active: Boolean,
//         disabled: Boolean,
//         hidden: Boolean,
//         icon: Function,
//         onClick: Function,
//         childNav: [{
//             childName: String,
//             childSlug: String,
//             onClick: Function,
//         }]
//     }
// ]
const PageMenu = ({ navItem = [] }) => {
    const selectedKey = _.map(navItem, (item) => (item.active == true ? item.slug : ''));
    return (
        <Fragment>
            <Menu selectedKeys={selectedKey} mode="horizontal" className="page-menu">
                {navItem.map((items) =>
                    !items.hidden ?
                        items.childNav ? (
                            <SubMenu
                                key={items.slug}
                                icon={items.icon}
                                disabled={items.disabled}
                                title={items.name}>
                                {items.childNav.map((chNav) => {
                                    <Menu.Item key={chNav.childSlug} onClick={chNav.onClick}>
                                        {chNav.childName}
                                    </Menu.Item>;
                                })}
                            </SubMenu>
                        ) : (
                            <Menu.Item
                                key={items.slug}
                                icon={items.icon}
                                disabled={items.disabled}
                                onClick={items.onClick}>
                                {items.name}
                            </Menu.Item>
                        )
                    : ''
                )

                }
            </Menu>
        </Fragment>
    );
};

export default PageMenu;
