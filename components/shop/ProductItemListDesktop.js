import { Descriptions, Typography } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PictureOutlined } from '@ant-design/icons';
import { formatToCurrency } from '../../helper/Utils';
import useQuantity from '../../hooks/useQuantity';
import { langs } from '../../localization';
import { ADD_TO_CART_INITIATE } from '../../store/cart/Action';
import { ADD_TO_FAVOURITE_INITIATE } from '../../store/favourite/Action';
import { quickView } from '../../store/product/Action';
import ButtonWraper from '../common/form/ButtonWrapper';
import StatusTag from '../common/tag';
import Qty from '../qty';
import CalPrice from './CalPrice';
import dynamic from 'next/dynamic';
const Image = dynamic(() => import('../common/image'));
const { Title, Text } = Typography;

const ProductItemListDesktop = (props) => {
    const { product, isInventory } = props;

    const [count, setCount, countValidation, inventoryValidation] = useQuantity(product);
    const [total, setTotal] = useState(product.price);
    const favouriteIds = useSelector((state) => state.favourite.favouriteIds);
    const dispatch = useDispatch();

    

    const handaleQuickView = (id) => {
        dispatch(
            quickView({
                id: id,
                visibility: true
            })
        );
    };
    const router = useRouter();

    /**
     * @name addToCart
     * @description add product to cart
     * @param {data}
     * @returns {}
     */
    const addToCart = (data) => {
        data.quantity = count;
        data.totalPrice = total;
        setCount(data.moq);
        dispatch({ type: ADD_TO_CART_INITIATE, product: data });
    };

    /**
     * @name addProductToFavourite
     * @description add product to favourite
     * @param {product}
     * @returns {}
     */
    const addProductToFavourite = (product) => {
        dispatch({
            type: ADD_TO_FAVOURITE_INITIATE,
            payload: product.id,
            favouriteIds
        });
    };

    return (
        <div className="product-item animate__animated animate__fadeIn">
            <div className="product-item-content-left">
                <span className="product-item-photo">
                    {product.desktop_image ? (
                        <Image
                            src={product.desktop_image}
                            className="product-image"
                            width={170}
                            height={170}
                            alt={product.name}
                        />
                    ) : <div className="img-placeholder"><PictureOutlined /></div>}
                </span>
            </div>
            <div className="product-item-content">
                <div className="product-item-details">
                    <div className="product-item-info">
                        <div className="clearfix">
                            <StatusTag value={product.part_number} color={'geekblue'} />
                        </div>
                        <Title level={5} className="product-item-name">
                            <Link
                                href={`/shop/product-detail/[productId]`}
                                as={`/shop/product-detail/${product.slug}`}>
                                <a>{product.name}</a>
                            </Link>
                        </Title>
                        {product.categories && (
                            <Descriptions>
                                <Descriptions.Item label={langs.labels.category}>
                                    {product.categories.map((item) => {
                                        return (
                                            <span className="categories-item" key={item}>
                                                {item}
                                            </span>
                                        );
                                    })}
                                </Descriptions.Item>
                            </Descriptions>
                        )}
                        {isInventory == "true" && product.inventory == "finite" &&
                            <div className={'inventory'}>
                                <Typography.Text type={product.inventory_value ? 'success' : 'danger'}>
                                    <small>
                                        <small>
                                            {product.inventory_value ? `${langs.labels.inStock} : ` : `${langs.labels.outOfStock}`}{' '}
                                            {product.inventory_value}
                                        </small>
                                    </small>
                                </Typography.Text>
                            </div>
                        }
                        <div className="price-box">
                            {product.discount == 0 ? (
                                <Fragment>
                                    <span className="regular-price">
                                        {formatToCurrency(product.price)}
                                    </span>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <span className="regular-price">
                                        {formatToCurrency(product.price)}
                                    </span>
                                    <span className="old-price">
                                        {formatToCurrency(product.regular_price)}
                                    </span>
                                    {!!product.discount && (
                                        <span className="price-off">
                                            {product.discount}% {langs.labels.off}
                                        </span>
                                    )}
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="product-item-actions">
                    <div className="qty-wrapper">
                        <Qty count={count} setCount={setCount} />
                        {inventoryValidation &&
                            <Text type={'danger'} className={'inventory-validation-error'}>{langs.validationMessages.inventoryValidation}</Text>
                        }
                    </div>
                    <div className="actions-right">
                        <div className="product-hover-action">
                            <ButtonWraper
                                size={'small'}
                                type="primary"
                                onClick={() =>
                                    router.push(
                                        `/shop/product-detail/[productId]`,
                                        `/shop/product-detail/${product.slug}`
                                    )
                                }
                                title={langs.labels.details}
                            >
                                {langs.labels.details}
                            </ButtonWraper>
                            <ButtonWraper
                                size={'small'}
                                type="primary"
                                onClick={() => handaleQuickView(product.id)}
                                title={langs.labels.quickView}
                            >
                                {langs.labels.quickView}
                            </ButtonWraper>
                        </div>
                        <div className="add-to-cart-box">
                            <span className="total-price">
                                <CalPrice price={product.price} count={count} />
                            </span>
                            <ButtonWraper
                                type="default"
                                disabled={countValidation}
                                onClick={() => {
                                    addToCart(product);
                                }}>
                                <span>{langs.labels.addToCart}</span>
                            </ButtonWraper>
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => addProductToFavourite(product)}
                    className={`favourite ${
                        favouriteIds.some((itemSku) => itemSku == product.id) ? 'active' : ''
                    }`}>
                    <i className="fas fa-star"></i>
                </div>
            </div>
        </div>
    );
};
export default ProductItemListDesktop;
