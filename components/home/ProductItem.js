import React, { Fragment } from 'react';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const Image = dynamic(() => import('../common/image'));

const ProductItem = (props) => {
    const { className, image, name, handleAddToCart, quickViewLink } = props;
    return (
        <Fragment>
            <div className={`product-item-home ${className}`}>
                <div className="product-item-inner">
                    <span className="product-item-photo">
                        {image && (
                            <Image
                                src={image}
                                className="product-image"
                                width={80}
                                height={80}
                                alt={name}
                            />
                        )}
                    </span>
                    <div className="product-item-details">
                        <div className="product-item-info">
                            <div className="product-item-name">
                                <Link href={`${quickViewLink}`}>
                                    <a>
                                        <span>{name}</span>
                                    </a>
                                </Link>
                            </div>
                            <div className="price-box"></div>
                        </div>
                    </div>
                    <div className="product-item-actions">
                        <div className="add-to-cart-box">
                            <ButtonWraper
                                type="default"
                                onClick={handleAddToCart}
                                icon={<PlusOutlined />}>
                                Add
                            </ButtonWraper>
                        </div>
                    </div>
                    {quickViewLink && (
                        <Link href={`${quickViewLink}`}>
                            <a className="quick-view-link" title="Quick View">
                                <img
                                    src={'/assets/images/svg/quick-view-icon.svg'}
                                    alt="Quick View"
                                />
                            </a>
                        </Link>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProductItem;
