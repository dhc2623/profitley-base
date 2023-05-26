import { Breadcrumb } from 'antd';
import dynamic from 'next/dynamic';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Responsive from '../../components/responsive/Responsive';
import  withAppContext  from '../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import { langs } from '../../localization';
import { setChild } from '../../store/common/Action';
// import PageTitle from '../../components/common/page-title';
// import DocHead from '../../components/common/head';
// import ProductList from '../../components/shop/Products';

const PageTitle = dynamic(() => import('../../components/common/page-title'));
const DocHead = dynamic(() => import('../../components/common/head'));
const ProductList = dynamic(() => import('../../components/shop/Products'));

const Products = (props) => {
    const dispatch = useDispatch();
    console.log('props',props)
    useEffect(() => {
        dispatch(setChild(false));
    }, []);

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.allProducts} />
            <div className="wrap">
                <Responsive.Mobile>
                    <PageTitle title={langs.labels.allProducts} />
                </Responsive.Mobile>
                
                <ProductList pageTitle={langs.labels.allProducts} />
            </div>
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

// export default Products;
export default withAppContext(Products);
