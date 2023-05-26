import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { List, Avatar, Card, Typography } from 'antd';
import { getCategoriesList } from '../../store/categories/Action';

const CategoriesList = () => {
    const dispatch = useDispatch();
    const filterName = 'my-categories';
    const filter = useSelector((state) =>
        state.storeFilter[filterName] ? state.storeFilter[filterName] : {}
    );

    const loading = useSelector((state) => state.categories.loading);
    const categories = useSelector((state) => state.categories.categoryList);

    useEffect(() => {
        dispatch(getCategoriesList());
    }, []);

    return (
        <Fragment>
            <div className="p-t10" />
            <Card className="categories-list-card">
                <List
                    itemLayout="horizontal"
                    dataSource={categories}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.thumbnail} />}
                                title={
                                    <Link
                                        href={`/inventory/categories/[category]`}
                                        as={`/inventory/categories/${item.slug}`}>
                                        <a>
                                            {item.name}{' '}
                                            <Typography.Text type={'secondary'}>
                                                (
                                                {item.products_count == null
                                                    ? 0
                                                    : item.products_count}
                                                )
                                            </Typography.Text>
                                        </a>
                                    </Link>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
            {/*<div className="pagination-actions">
                <div className="pagination-actions-item">
                    {categoriesMeta.current_page != 1 && (
                        <ButtonWraper
                            onClick={() => handleNextPrevPage("prev")}
                            loading={loading}
                            type={"primary"}
                        >
                            <ArrowLeftOutlined /> Previous
                        </ButtonWraper>
                    )}
                </div>
                <div className="pagination-actions-item">
                    {categoriesMeta.total_pages !=
                        categoriesMeta.current_page && (
                            <ButtonWraper
                                onClick={() => handleNextPrevPage("next")}
                                loading={loading}
                                type={"primary"}
                            >
                                Next <ArrowRightOutlined />
                            </ButtonWraper>
                        )}
                </div>
            </div> */}
        </Fragment>
    );
};
export default CategoriesList;
