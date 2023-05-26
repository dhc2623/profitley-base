import { Typography, Alert } from 'antd';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { formatToCurrency } from '../../helper/Utils';
import { langs } from '../../localization';
import Panel, { PanelBody, PanelTitle } from '../common/panel';
const { Title, Text } = Typography;

const ProductItem = ({ className, sDissount = 0 }) => {
    const cartDetails = useSelector((state) => state.cart.cartDetails);
    const ovDiscount = cartDetails.order_value_discount !== "0.00"  ?  cartDetails.order_value_discount : 0;
    
    useEffect(()=>{
        
    },[]);

    return (
        <Fragment>
            {
                cartDetails.order_offer_reminder &&
                <div className="m-b10">
                    <Alert
                        message={langs.labels.orderOffer}
                        type="info"
                        showIcon
                        description={cartDetails.order_offer_reminder}
                    />
                </div>


            }
            <Panel className={`cart-summary m-t0 ${className}`}>
                <PanelTitle title={langs.labels.summary} />
                <PanelBody>
                    <p className="m-b10">
                        {langs.labels.subtotal} <span>{formatToCurrency(cartDetails.sub_total)}</span>
                    </p>
                    <p className="m-b10">
                        {langs.labels.cgst} <span>Inclusive</span>
                    </p>
                    <p className="m-b10">
                        {langs.labels.sgst} <span>Inclusive</span>
                    </p>
                    {
                        sDissount != 0 &&
                        <p className="m-b10">
                            {langs.labels.specialDiscount} <span>- {formatToCurrency(sDissount)}</span>
                        </p>
                    }

                    {
                        ovDiscount != 0 &&
                        <p className="m-b10">
                            {langs.labels.orderValueDiscount} <span>- {formatToCurrency(ovDiscount)}</span>
                        </p>
                    }

                    <p className="total-pay m-b0">
                        {langs.labels.totalPayable} <span>{formatToCurrency(parseFloat(cartDetails.total_amount) - parseFloat(sDissount))}</span>
                    </p>
                </PanelBody>
            </Panel>
        </Fragment>
    );
};
export default ProductItem;
