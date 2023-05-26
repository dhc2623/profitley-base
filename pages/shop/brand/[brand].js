import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
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

const ProductsBrand = (props) => {
    const dispatch = useDispatch();
    const route = useRouter();
    const { brands } = useSelector((state) => ({
        brands: state.product.metaData.brands
    }));

    useEffect(() => {
        dispatch(setChild(true));
    }, []);

    /**Get brand from router query */
    const getBrandName = () => {
        const brandName = brands.filter(
            (item) => item.slug == getFilterVal(route.query['brand']) || item.slug == getFilterVal(route.query['brand[]'])
        );
        return brandName.length > 0 ? brandName[0].name : '';
    };

    return (
        <Fragment>
            <DocHead pageTitle={getBrandName()} />
            <div className="wrap">
                <Responsive.Mobile>
                    <PageTitle title={getBrandName()} />
                </Responsive.Mobile>
            
                <ProductList
                    pageTitle={getBrandName()}
                    removeTags={true}
                    pageType={'brand'}
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

export default withAppContext(ProductsBrand);