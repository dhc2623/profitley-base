import { Tabs } from 'antd';
const { TabPane } = Tabs;

const TabsWrapper = (props) => {
    return <Tabs {...props}>{props.children}</Tabs>;
};

export default TabsWrapper;