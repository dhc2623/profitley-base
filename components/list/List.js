import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getList } from '../../store/list/Action';
import { columns } from '../../config/Constant';
import { Table } from 'antd';

const List = (props) => {
    useEffect(() => {
        props.getList();
    }, []);

    return <Table loading={props.loading} dataSource={props.list} columns={columns} />;
};

const mapStateToProps = (state) => {
    return {
        loading: state.list.loading,
        list: state.list.invoiceList
    };
};

export default connect(mapStateToProps, { getList })(List);
