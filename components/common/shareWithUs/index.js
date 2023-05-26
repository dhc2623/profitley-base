import { WhatsAppOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React, { useContext } from 'react';
import { APP_URL } from '../../../config/Constant';
import { UserContext } from '../../../contexts/userContext';
import { whatsAppURL } from '../../../helper/Utils';
import { langs } from '../../../localization';
const { Title, Text } = Typography;
const ShareWithUs = ({ product_link, name, price, discount, category, brand, moq, image }) => {
    const {  hasAppSettings } = useContext(UserContext);     
    return (
        <div className="share-us">
            <Text className="m-r5">{langs.labels.shareWith}: </Text>
            <a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=${APP_URL}${product_link}`}>
                <i className="fab fa-facebook-f fb"></i>
            </a>
            <a
                target="_blank"
                href={`mailto:?&subject=${name}&cc=&bcc=&body=${APP_URL}${product_link}`}>
                <i className="far fa-envelope mail-i"></i>
            </a>
            {/* <a href="#">
                <i className="fas fa-mobile-alt ph"></i>
            </a> */}
            <a
                href={whatsAppURL(
                    '',
                    `*${name}* 
                    %0a Price: ${price}
                    ${discount != '0.00% off' ? `%0a Discount: ${discount}` : ''}
                    %0a Category: ${category}
                    %0a Brand: ${brand}
                    %0a MOQ: ${moq}
                    %0a Product Image: ${image}  
                    %0a Product Link: ${APP_URL}${product_link}`
                )}
                target="_blank">
                <WhatsAppOutlined
                    className={'m-l5 p-t0'}
                    style={{ fontSize: 26, color: '#32c971' }}
                />
            </a>
        </div>
    );
};
export default ShareWithUs;
