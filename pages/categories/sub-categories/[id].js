import { Avatar, Card, List, Typography } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  withAppContext  from '../../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../../helper/AuthActions';
import { langs } from '../../../localization';
import { GET_SUB_CATEGORIES_INITIATE } from '../../../store/categories/Action';
import { setChild } from '../../../store/common/Action';

// import PageTitle from '../../../components/common/page-title';
// import DocHead from '../../../components/common/head';
// import LoadData from '../../../components/common/load-data';

const PageTitle = dynamic(() => import('../../../components/common/page-title'));
const DocHead = dynamic(() => import('../../../components/common/head'));
const LoadData = dynamic(() => import('../../../components/common/load-data'));

const { Title, Text } = Typography;

function Categories() {
    const router = useRouter();
    const categories = useSelector((state) => state.categories.subCategories);
    const loading = useSelector((state) => state.categories.loading);

    const dispatch = useDispatch();

    useEffect(() => {
        if (router.query && router.query.id) {
            dispatch({ type: GET_SUB_CATEGORIES_INITIATE, parentId: router.query.id });
            dispatch(setChild('/shop/products'));
        }
    }, [router.query]);

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.subCategories} />
            <section className="wrap">
                <PageTitle title={`${categories.length} ${langs.labels.subCategories}`} />
                <LoadData loading={loading} data={categories}>
                    <Fragment>
                        <div className="p-t10" />
                        <Card className="categories-list-card">
                            <List
                                itemLayout="horizontal"
                                dataSource={categories}
                                renderItem={(item) => {
                                    return (
                                        <List.Item
                                            className={
                                                item.parent == '-' ? 'parent_cat' : 'sub_cat'
                                            }>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.thumbnail} />}
                                                title={
                                                    <Link
                                                        href={`/shop/category/[category]`}
                                                        as={`/shop/category/${item.slug}`}>
                                                        <a>
                                                            {item.name}{' '}
                                                            <Text type={'secondary'}>
                                                                (
                                                                {item.products_count == null
                                                                    ? 0
                                                                    : item.products_count}
                                                                )
                                                            </Text>
                                                        </a>
                                                    </Link>
                                                }
                                            />
                                        </List.Item>
                                    );
                                }}
                            />
                        </Card>
                    </Fragment>
                </LoadData>
            </section>
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }
export default withAppContext(Categories);

