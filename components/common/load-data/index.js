import { Fragment } from 'react';
import { Empty } from 'antd';
import { isEmpty } from 'lodash';
import Loading from '../loading';

const LoadData = (props) => {
    if (props.loading === false) {
        let isData = false;
        if (Array.isArray(props.data) && props.data.length > 0) {
            isData = true;
        } else if (!isEmpty(props.data)) {
            isData = true;
        }
        if (isData) {
            return <div>{props.children}</div>;
        } else {
            return (
                <div style={{ marginTop: props.verticalHeight ? '150px' : 'auto' }}>
                    <Empty />
                </div>
            );
        }
    } else {
        return (
            <Fragment>
                <Loading spinning={props.loading}>{props.children}</Loading>
            </Fragment>
        );
    }
};
export default LoadData;
