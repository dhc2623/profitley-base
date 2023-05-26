import React from 'react';

const TableWraper = (props) => {
    return (
        <div className="table-responsive order-detail-table">
            <table className="table" {...props}>
                {props.children}
            </table>
        </div>
    );
};

export default TableWraper;
