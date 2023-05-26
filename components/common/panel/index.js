import dynamic from 'next/dynamic';
import { Card, Checkbox, Typography } from 'antd';
import { Fragment, useContext, useEffect } from 'react';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { CollapsePanelContext } from '../../../contexts/collapsePanelContext';
import StatusTag from '../tag';
const ButtonWraper = dynamic(() => import('../form/ButtonWrapper'));

export const PanelTitle = ({
    className,
    title,
    subTitle,
    action = false,
    status,
    statusBackground,
    avatar,
    headerStyle,
    selection,
    selectionValue,
    onSelectionChange,
    selectionCenterV,
    headerRight,
    collapseKey,
    onCollapse,
    ...props
}) => {
    const collapse = useContext(CollapsePanelContext);
    useEffect(() => { }, []);

    let headerStyleView = () => {
        switch (headerStyle) {
            case 'redBorder':
                return 'red-border-heading';
                break;
            case 'noBorder':
                return 'no-border-heading';
                break;
            case 'bothBorder':
                return 'border-heading';
                break;
            default:
                return '';
                break;
        }
    };

    const handleCollapse = () => {
        if (collapse) {
            collapse.onChange(collapseKey);
            onCollapse && onCollapse();
        }
    };

    return (
        <div className={`panel-header ${className} ${headerStyleView()}`} >
            {selection && (
                <div className={`panel-header-selection ${selectionCenterV && 'v-center'}`}>
                    <Checkbox onChange={onSelectionChange} checked={selectionValue} />
                </div>
            )}

            {avatar && <div className={'panel-header-avatar'}>{avatar}</div>}

            <div className={'panel-header-body'} onClick={handleCollapse}>
                <Typography.Title level={5} className={'m-b0'}>
                    {title}
                </Typography.Title>
                {subTitle && <Typography.Text className="sub-title">{subTitle}</Typography.Text>}
            </div>
            {action && action.length && (
                <div className={'panel-header-actions'}>
                    {action.map((item, index) =>
                        item != '' && item.render ? (
                            <Fragment key={index}>{item.render()}</Fragment>
                        ) : (
                            <ButtonWraper key={index} {...item}>
                                {item.label}
                            </ButtonWraper>
                        )
                    )}
                </div>
            )}
            {status && (
                <div className={'panel-header-status'}>
                    <StatusTag color={statusBackground} value={status} />
                </div>
            )}
            {headerRight && <div className="header-right p-t10">{headerRight}</div>}
            {collapse && (
                <div className={'panel-header-actions'}>
                    <a onClick={handleCollapse}>
                        {collapse.isActive(collapseKey) ? <UpOutlined /> : <DownOutlined />}
                    </a>
                </div>
            )}
        </div>
    );
};

export const PanelSeparator = ({
    list = false,
    keyFilter = (item) => ({ label: item.label, value: item.value })
}) => {
    return (
        <div className="panel-separator">
            {list &&
                list.map((item) => (
                    <div className="panel-separator-text" key={keyFilter(item).label}>
                        <Typography.Text strong>{keyFilter(item).value}</Typography.Text>
                        <br />
                        <Typography.Text type="secondary" strong>
                            <small>{keyFilter(item).label}</small>
                        </Typography.Text>
                    </div>
                ))}
        </div>
    );
};

export const PanelRowItem = ({ className, label, value }) => {
    return (
        <div className={`panel-row-items ${className}`}>
            <div className="panel-row-items-left">{label}</div>
            <div className="panel-row-items-right">{value}</div>
        </div>
    );
};

export const PanelActions = ({ actions = false }) => {
    return (
        <div className={'panel-actions'}>
            {actions &&
                actions.map((item, index) => (
                    <span className={'panel-actions-item'} key={index}>
                        {(item != '' || item != null) && item.render ? (
                            <Fragment>{item.render()}</Fragment>
                        ) : (
                            <ButtonWraper {...item}>{item.label}</ButtonWraper>
                        )}
                    </span>
                ))}
        </div>
    );
};

export const PanelBody = ({ className, ...props }) => {
    return <div className={`panel-body ${className}`}>{props.children}</div>;
};

export const PanelHidden = ({ className, collapseKey = 'mp', ...props }) => {
    const collapse = useContext(CollapsePanelContext);
    useEffect(() => { }, []);
    return collapse && collapse.isActive(collapseKey) ? (
        <div className={`panel-hidden ${className}`}>{props.children}</div>
    ) : (
        ''
    );
};

const Panel = ({ className, size = 'small', ...props }) => {
    useEffect(() => { }, []);
    const style = () => {
        let sty = {};
        sty.padding = '0';
        return sty;
    };

    return (
        <Card size={size} bodyStyle={style()} className={`panel ${className}`}>
            {props.children}
        </Card>
    );
};

export default Panel;
