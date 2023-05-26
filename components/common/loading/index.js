import { Spin } from 'antd';

const Loading = (props) => (
    <Spin tip="Loading..." spinning={props.loading}>
        {props.children}
    </Spin>
);

export default Loading;
