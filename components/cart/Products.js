import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import Responsive from '../responsive/Responsive';
const ProductItem = dynamic(() => import('./ProductItem'));
const ProductItemDesktop = dynamic(() => import('./ProductItemDesktop'));
import { useSelector } from 'react-redux';

const CartList = () => {
    const cart = useSelector((state) => state.cart.cartDetails.order_items);
    return (
        <Fragment>
            {cart &&
                !!cart.length &&
                cart.map((product) => {
                    return (
                        <Fragment key={product.id}>
                            <Responsive.Mobile>
                                <ProductItem product={product} />
                            </Responsive.Mobile>
                            <Responsive.Desktop>
                                <ProductItemDesktop product={product} />
                            </Responsive.Desktop>
                        </Fragment>
                    );
                })}
        </Fragment>
    );
};
export default CartList;
