import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Typography } from 'antd';
import { getCategoriesList } from '../../store/categories/Action';
import { langs } from '../../localization';
import dynamic from 'next/dynamic';
const Image = dynamic(() => import('../common/image'));

const CategoryList = () => {
    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.categories.categoryList);
    useEffect(() => {
        dispatch(getCategoriesList());
    }, []);
    console.log('categoryList', categoryList)
    return (
        <section className="product-container d-hide">
            <Link href={'/categories'}>
                <a className="category active">
                    <span className="categories-icon">
                        <Image
                            src={'/assets/images/svg/all-categories.svg'}
                            width={33}
                            height={33}
                            alt="all-categories"
                        />
                    </span>
                    <p>{langs.labels.allCategories}</p>
                </a>
            </Link>
            {categoryList &&
                categoryList.map((item) => {
                    if (item.parent == null) {
                        return (
                            <Link href={`/shop/category/${item.slug}`} key={item.id}>
                                <a className="category">
                                    <span className="categories-icon">
                                        {
                                            

                                            <Image
                                                src={item.image != 0 ? item.image : '/assets/images/default_product_image.png'}
                                                width={33}
                                                height={33}
                                                alt={item.slug}
                                            />
                                        }
                                    </span>
                                    <p>
                                        <Typography.Text ellipsis>{item.name}</Typography.Text>
                                    </p>
                                </a>
                            </Link>
                        );
                    }
                })}
        </section>
    );
};

export default CategoryList;
