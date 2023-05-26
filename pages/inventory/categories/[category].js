import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import Responsive from '../../../components/responsive/Responsive';
import { setChild } from '../../../store/common/Action';

// import ProductList from '../../../components/shop/Products';
// import PageTitle from '../../../components/common/page-title';
// import DocHead from '../../../components/common/head';

const ProductList = dynamic(() => import('../../../components/shop/Products'));
const PageTitle = dynamic(() => import('../../../components/common/page-title'));
const DocHead = dynamic(() => import('../../../components/common/head'));

import { serverCheckIsUserLogin } from '../../../helper/AuthActions';

const ProductsCat = (props) => {
    const router = useRouter();
    const query = router.query;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setChild('/shop/products'));
    }, []);

    const { categories } = useSelector((state) => ({
        categories: state.product.metaData.categories
    }));

    /**
     * @name getCatName
     * @description it returns information category name
     * @param {}
     * @returns {}
     */
    const getCatName = () => {
        const catName = categories.filter((item) => item.slug == query.category);
        return catName.length > 0 ? catName[0].name : '';
    };

    return (
        <Fragment>
            <DocHead pageTitle={getCatName()} />
            <div className="wrap">
                <Responsive.Mobile>
                    <PageTitle title={getCatName()} />
                </Responsive.Mobile>
                
                <ProductList isInventory={true} pageTitle={getCatName()} removeTags={true} />
            </div>
        </Fragment>
    );
};

export async function getServerSideProps({ req, query }) {
    const props = serverCheckIsUserLogin(req, query);
    return props;
}

export default ProductsCat;
