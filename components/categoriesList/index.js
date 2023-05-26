import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { List, Avatar, Card, Typography } from 'antd';
import { RightOutlined, UserOutlined } from '@ant-design/icons';
import { getCategoriesList } from '../../store/categories/Action';
import { useRouter } from 'next/router';
import { USER_ROLES } from '../../config/Constant';
import withAppContext from '../../config/withAppContext';
import { getSubCategoriesService } from '../../store/categories/Service';
const LoadData = dynamic(() => import('../common/load-data'));
const { Text } = Typography;

const Accordion = ({ data, title, id, avatar, onClick, collapse, subCatData }) => {
    const [isOpen, setOpen] = useState(false);
    useEffect(() => {}, []);

    const handleToggle = () => {
        setOpen(!isOpen);
    };
    return (
        <div className="accordion-wrapper">
            <div
                className={`accordion-title ${isOpen ? 'open' : ''}`}
                onClick={() => (collapse ? handleToggle(id) : onClick())}>
                <span>
                    <Avatar src={avatar} />
                    {title}
                </span>
                {collapse && (
                    <span className="arrow-trigger">
                        <RightOutlined />
                    </span>
                )}
            </div>
            {collapse && isOpen && (
                <LoadData data={data.children} loading={false}>
                    <div className={`accordion-item ${!isOpen ? 'collapsed' : ''}`}>
                        <div className="accordion-content">
                            {data.children.map((item, index) => (
                                <div className="sub-categories-item" key={index}>
                                    <Link
                                        href={`/shop/category/[category]`}
                                        as={`/shop/category/${item.slug}`}>
                                        <a>
                                            <span>
                                                <Avatar src={item.image} />
                                                {item.name}
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </LoadData>
            )}
        </div>
    );
};

const CategoriesList = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.categories.loading);
    const categories = useSelector((state) => state.categories.parentCategories);

    useEffect(() => {
        // dispatch(getCategoriesList());
    }, []);

    const handleLink = (item) =>
        router.push(
            item.sub_category_count == null || item.sub_category_count == 0
                ? `/shop/category/${item.slug}`
                : `/shop/category/${item.slug}`
        );

    return (
        <Fragment>
            <div className="p-t10" />
            <div className="categories-list-accordion">
                <LoadData loading={loading} data={categories}>
                    {categories.map((item, index) => (
                        <Accordion
                            data={item}
                            key={index}
                            id={item.id}
                            title={item.name}
                            avatar={item.image}
                            onClick={() => handleLink(item)}
                            collapse={
                                item.sub_category_count == '' ||
                                item.sub_category_count == null ||
                                item.sub_category_count == 0
                                    ? false
                                    : true
                            }></Accordion>
                    ))}
                </LoadData>
            </div>
        </Fragment>
    );
};
export default withAppContext(CategoriesList);
