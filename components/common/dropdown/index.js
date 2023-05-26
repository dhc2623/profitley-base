import { Menu, Dropdown } from 'antd';

const DropdownMenu = ({ menuItem = [], label = '' }) => {
    const menu = () => (
        <Menu>
            {menuItem.map((item) => (
                <Menu.Item key={item.label} onClick={item.onClick}>
                    {item.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            {label}
        </Dropdown>
    );
};

export default DropdownMenu;
