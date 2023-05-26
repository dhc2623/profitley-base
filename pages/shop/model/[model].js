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

const ProductsModel = (props) => {
    const dispatch = useDispatch();
    const route = useRouter();
    const { models } = useSelector((state) => ({
        models: state.product.metaData.models
    }));

    useEffect(() => {
        dispatch(setChild(true));
    }, []);

    /**Get model from router query */
    const getModelName = () => {
        const modelName = models.filter(
            (item) => item.slug == getFilterVal(route.query['model']) || item.slug == getFilterVal(route.query['model[]'])
        );
        return modelName.length > 0 ? modelName[0].name : '';
    };

    return (
        <Fragment>
            <DocHead pageTitle={getModelName()} />
            <div className="wrap">
                <Responsive.Mobile>
                    <PageTitle title={getModelName()} />
                </Responsive.Mobile>
                
                <ProductList
                    pageTitle={getModelName()}
                    removeTags={true}
                    pageType={'model'}
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

export default withAppContext(ProductsModel);