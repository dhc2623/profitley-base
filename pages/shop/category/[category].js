import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Responsive from '../../../components/responsive/Responsive';

import { setChild } from '../../../store/common/Action';
import dynamic from 'next/dynamic';
// import PageTitle from '../../../components/common/page-title';
// import DocHead from '../../../components/common/head';
// import ProductList from '../../../components/shop/Products';

const PageTitle = dynamic(() => import('../../../components/common/page-title'));
const DocHead = dynamic(() => import('../../../components/common/head'));
const ProductList = dynamic(() => import('../../../components/shop/Products'));

import { serverCheckIsUserLogin } from '../../../helper/AuthActions';
import  withAppContext  from '../../../config/withAppContext';
import { getFilterVal } from '../../../helper/FilterUtils';

const ProductsCat = (props) => {
    const dispatch = useDispatch();
    const route = useRouter();

    useEffect(() => {
        dispatch(setChild(true));
    }, []);

    const { categories } = useSelector((state) => ({
        categories: state.product.metaData.categories
    }));

    /**Get category from router query */
    const getCatName = () => {
        const catName = categories.filter(
            (item) => item.slug == getFilterVal(route.query['category']) || item.slug == getFilterVal(route.query['category[]'])
        );
        return catName.length > 0 ? catName[0].name : '';
    };

    return (
        <Fragment>
            <DocHead pageTitle={getCatName()} />
            <div className="wrap">
                <Responsive.Mobile>
                    <PageTitle title={getCatName()} />
                </Responsive.Mobile>
                
                <ProductList
                    pageTitle={getCatName()}
                    removeTags={true}
                    pageType={'category'}
                    pageProps={route.query}
                />
            </div>
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(ProductsCat);