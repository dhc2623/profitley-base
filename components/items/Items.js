import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getList } from '../../store/item/Action';
import { itemsColumns } from '../../config/Constant';
import { Table } from 'antd';
import Layout from '../common/MyLayout';
const Items = (props) => {
    useEffect(() => {
        props.getList();
    }, []);

    return (
        <Layout>
            <Table loading={props.loading} dataSource={props.list} columns={itemsColumns} />;
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.item.loading,
        list: state.item.itemList
    };
};

export default connect(mapStateToProps, { getList })(Items);
