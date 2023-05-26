import { Fragment, useState } from 'react';
import { Typography } from 'antd';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import useQuantity from '../../hooks/useQuantity';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART_INITIATE } from '../../store/cart/Action';
import { formatToCurrency } from '../../helper/Utils';
import { langs } from '../../localization';
const StatusTag = dynamic(() => import('../common/tag'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const { Title, Text } = Typography;

const ProductItemList = (props) => {
    const { product, isInventory } = props;
    const [count, setCount, countValidation, inventoryValidation] = useQuantity(product);
    const [total, setTotal] = useState(product.price);
    const favouriteIds = useSelector((state) => state.favourite.favouriteIds);
    const favouriteLoading = useSelector((state) => state.favourite.loading);
    const dispatch = useDispatch();

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

    return (
        <div className="product-item list ">
            <div className="product-item-content">
               
                <div className="product-item-details">
                    <div className="product-item-info">
                        <StatusTag value={product.part_number} color={'geekblue'} />
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
                        <Title level={5} className="product-item-name">
                            <Link
                                href={`/shop/product-detail/[productId]`}
                                as={`/shop/product-detail/${product.slug}`}>
                                <a>{product.name}</a>
                            </Link>
                        </Title>
                        {/* <Descriptions>
							<Descriptions.Item label={langs.labels.category}>
								{product.categories}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label={langs.labels.brand}>
								{product.brand}
							</Descriptions.Item>
						</Descriptions>
						<Descriptions>
							<Descriptions.Item label={langs.labels.model}>
								{product.models}
							</Descriptions.Item>
						</Descriptions> */}
                    </div>
                </div>
                <div className="product-item-actions">
                    <div className="add-to-cart-box">
                        <ButtonWraper
                            type="default"
                            disabled={countValidation}
                            onClick={() => {
                                addToCart(product);
                            }}>
                            <span>
                                <img src="/assets/images/svg/add-icon-white.svg" alt="Add Icon" />
                            </span>
                        </ButtonWraper>
                    </div>
                </div>
                {inventoryValidation &&
                    <Text type={'danger'} className="inventory-validation-error align-center p-t0">{langs.validationMessages.inventoryValidation}</Text>
                }
                <a className="quick-view-link" title={langs.labels.quickView}>
                    <img src={'/assets/images/svg/quick-view-icon.svg'} alt={langs.labels.quickView} />
                </a>
            </div>
        </div>
    );
};
export default ProductItemList;
