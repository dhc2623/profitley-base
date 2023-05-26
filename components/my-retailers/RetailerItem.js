import React, { Fragment, useState, useEffect } from 'react';
import { Typography } from 'antd';
import { langs } from '../../localization';

const RetailerItem = (props) => {
    const {
        headerTitle,
        headerRight,
        headerAddress,
        categoryTag,
        middleArea = [],
        footerList = [],
        footerActions = [],
        defaultOpen = false,
        headingStyle,
        isToggle = true,
        isCancel = false,
        isRejected = false
    } = props;

    const [togglePlan, setTogglePlan] = useState(defaultOpen);
    const handleToggleFn = () => setTogglePlan(!togglePlan);
    let headingStyleView = () => {
        switch (headingStyle) {
            case 'noBorder':
                return 'no-border-heading';
                break;
            default:
                return '';
                break;
        }
    };
    return (
        <div className={`retailer-item`}>
            <div className={`retailer-item-header ${headingStyleView()}`}>
                {categoryTag && (
                    <div className="category-tag">
                        {categoryTag}
                        <span>{`Category`}</span>
                    </div>
                )}
                <div className="retailer-item-header-left">
                    <Typography.Title level={5}>{headerTitle}</Typography.Title>
                    {headerAddress && (
                        <div
                            className={`retailer-item-header-address ${
                                togglePlan ? 'active' : 'collapsed'
                            }`}>
                            {headerAddress && (
                                <p className={'m-b5'}>
                                    <img src="/assets/images/svg/location-icon1.svg" alt="" />
                                    {headerAddress}
                                </p>
                            )}
                        </div>
                    )}
                </div>
                <div
                    className={`retailer-item-header-right ${togglePlan ? 'active' : 'collapsed'}`}>
                    {headerRight}
                    {isToggle && (
                        <div className="trigger-arrow">
                            <img
                                src="/assets/images/svg/arrow-up.svg"
                                alt=""
                                onClick={handleToggleFn}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div
                className={`retailer-item-body ${
                    isToggle && `${togglePlan ? 'open' : 'collapsed'}`
                }`}>
                {middleArea.map(
                    (item, index) =>
                        item && (
                            <div className="retailer-item-date" key={index}>
                                {item}
                            </div>
                        )
                )}
            </div>
            {footerList.length > 0 && (
                <div
                    className={`retailer-item-footer ${
                        isToggle && `${togglePlan ? 'open' : 'collapsed'}`
                    }`}>
                    {footerList.map((item, index) => (
                        <div className="retailer-item-footer-item" key={index}>
                            {item}
                        </div>
                    ))}
                </div>
            )}
            {footerActions.length > 0 && (
                <div className="retailer-item-footer-actions">
                    {footerActions.map(
                        (item, index) =>
                            item && (
                                <span
                                    className="retailer-item-footer-action"
                                    key={index}
                                    onClick={item.onClick}>
                                    {item.label}
                                </span>
                            )
                    )}
                </div>
            )}
            {isCancel != false && <span>{langs.labels.cancelled}</span>}
            {isRejected != false && <span>{langs.labels.rejected}</span>}
        </div>
    );
};

export default RetailerItem;
