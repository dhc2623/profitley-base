import React, { Fragment, useState, useEffect } from 'react';
import { Typography } from 'antd';

const ActivityList = ({
    headerTitle,
    headerList = [],
    headerRight,
    middleArea = [],
    footerList = [],
    footerActions = []
}) => {
    return (
        <div className="new-registration-list">
            <div className="new-registration-list-header">
                <div className="new-registration-list-header-left">
                    <Typography.Title level={5}>{headerTitle}</Typography.Title>
                </div>
                <div className="new-registration-list-header-right">{headerRight}</div>
                {headerList.length > 0 && (
                    <div className={`new-registration-list-header-list`}>
                        {headerList.map((item, index) => (
                            <div className="item" key={index}>
                                {item}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={`new-registration-list-body`}>
                {middleArea.map((item, index) => (
                    <div className="new-registration-list-content" key={index}>
                        {item}
                    </div>
                ))}
            </div>
            {footerList.length > 0 && (
                <div className={`new-registration-list-footer`}>
                    {footerList.map((item, index) => (
                        <div className="new-registration-list-footer-item" key={index}>
                            {item}
                        </div>
                    ))}
                </div>
            )}
            {footerActions.length > 0 && (
                <div className="new-registration-list-footer-actions">
                    {footerActions.map(
                        (item, index) =>
                            item && (
                                <span
                                    className={`new-registration-list-footer-action ${
                                        item.disabled ? 'disabled' : ''
                                    }`}
                                    key={index}
                                    onClick={item.disabled !== true && item.onClick}>
                                    {item.label}
                                </span>
                            )
                    )}
                </div>
            )}
        </div>
    );
};

export default ActivityList;
