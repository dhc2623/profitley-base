import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import Responsive from '../../../components/responsive/Responsive';
import  withAppContext  from '../../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../../helper/AuthActions';
import { langs } from '../../../localization';
// import PageTitle from '../../../components/common/page-title';
// import DocHead from '../../../components/common/head';
// import ProductList from '../../../components/shop/Products';

const PageTitle = dynamic(() => import('../../../components/common/page-title'));
const DocHead = dynamic(() => import('../../../components/common/head'));
const ProductList = dynamic(() => import('../../../components/shop/Products'));


const ProductsBestSeller = (props) => {

    useEffect(() => {
    }, []);

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.bestSeller} />
            <div className="wrap">
                <Responsive.Mobile>
                    <PageTitle title={langs.labels.bestSeller} />
                </Responsive.Mobile>
                
                <ProductList
                    pageTitle={langs.labels.bestSeller}
                    removeTags={false}
                    pageType={'best_sellers'}
                />
            </div>
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }
export default withAppContext(ProductsBestSeller);