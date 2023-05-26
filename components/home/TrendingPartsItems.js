import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from 'antd';
import { StarFilled, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const FormInputWrapper = dynamic(() => import('../common/form/InputWrapper'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const Image = dynamic(() => import('../common/image'));
import { ADD_TO_FAVOURITE_INITIATE } from '../../store/favourite/Action';

const TrendingParts = ({ id, image, name, price, productLink, favouriteLink, addToCartLink }) => {
    const dispatch = useDispatch();
    const favouriteIds = useSelector((state) => state.favourite.favouriteIds);
    const favouriteState = useSelector((state) => state);

    /**
     * @name addProductToFavourite
     * @description add product to favourite
     * @param {product}
     * @returns {}
     */
    const addProductToFavourite = (id) => {
        dispatch({
            type: ADD_TO_FAVOURITE_INITIATE,
            payload: id,
            favouriteIds
        });
    };

    return (
        <li>
            <div className="trend-product">
                <div className="trend-product-left">
                    <Link href={productLink}>
                        <a className="product-img">
                            <Image src={image} width={68} height={68} alt={name} />
                        </a>
                    </Link>
                </div>
                <div className="trend-product-right">
                    <div className="product-info">
                        <p className="product-name ">
                            <Link href={productLink}>
                                <a>{name}</a>
                            </Link>
                        </p>
                        <Typography.Text type="primary" className="price">
                            {price}
                        </Typography.Text>
                    </div>
                    <div className="product-add-to-cart">
                        <span className="favourite-link" onClick={() => addProductToFavourite(id)}>
                            {favouriteIds.some((itemSku) => itemSku == id) ? (
                                <StarFilled style={{ color: '#FF8000' }} />
                            ) : (
                                <StarFilled />
                            )}
                        </span>
                        <FormInputWrapper className="p-t10">
                            <ButtonWraper type="default" onClick={addToCartLink}>
                                <span className="m-hide">Add To Cart</span>
                                <ShoppingCartOutlined className="d-hide" />
                            </ButtonWraper>
                        </FormInputWrapper>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default TrendingParts;
