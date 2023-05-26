import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Typography } from 'antd';
import dynamic from 'next/dynamic';
import { langs } from '../../localization';
const ProductDrawerFilter = dynamic(() => import('./ProductDrawerFilter'));
const DropdownMenu = dynamic(() => import('../common/dropdown'));
const { Text } = Typography;

const ProductMobileHeader = ({
    viewOption = false,
    filterOption = true,
    sortOption = true,
    setgridStyle = '',
    gridStyle = '',
    frequentlyOrderCount = '',
    ...props
}) => {
    const router = useRouter();
    const count = useSelector((state) => state.product.productListMeta.pagination.total);

    /**
     * @name handleSortBy
     * @description handle sorting
     * @param {data}
     * @returns {}
     */
    const handleSortBy = (data) => {
        const query = router.query;
        query.page = 1;
        query.sort = data;
        router.push({ pathname: router.pathname, query }, router.asPath, {
            slashes: true
        });
    };

    return (
        <Fragment>
            <div className="product-header">
                <div className="appbar">
                    <div className="appbar-inner">
                        {viewOption && (
                            <div className="left">
                                <a
                                    onClick={() => setgridStyle('grid-view')}
                                    className={`grid-view ${
                                        gridStyle === 'grid-view' ? 'active' : ''
                                    }`}>
                                    <img
                                        src={'/assets/images/svg/grid-view-icon2.svg'}
                                        width="17"
                                        alt="Grid View"
                                    />
                                </a>
                                <a
                                    onClick={() => setgridStyle('grid')}
                                    className={` grid ${gridStyle === 'grid' ? 'active' : ''}`}>
                                    <img
                                        src={'/assets/images/svg/grid-view-icon.svg'}
                                        alt="Grid View"
                                    />
                                </a>
                                <a
                                    onClick={() => setgridStyle('list')}
                                    className={`list ${gridStyle === 'list' ? 'active' : ''}`}>
                                    <img
                                        src={'/assets/images/svg/list-view-icon.svg'}
                                        alt="List View"
                                    />
                                </a>
                            </div>
                        )}
                        <div className="center">
                            <Text className="item-count"> {`${frequentlyOrderCount !== '' ? frequentlyOrderCount : count} ${props.label}`}</Text>
                        </div>

                        <div className="right">
                            {sortOption && (
                                <DropdownMenu
                                    menuItem={[
                                        {
                                            label: `${langs.labels.productNameAtoZ}`,
                                            onClick: () => handleSortBy('a_z_order')
                                        },
                                        {
                                            label: `${langs.labels.productNameZtoA}`,
                                            onClick: () => handleSortBy('z_a_order')
                                        },
                                        {
                                            label: `${langs.labels.priceLowtoHigh}`,
                                            onClick: () => handleSortBy('low_high_price')
                                        },
                                        {
                                            label: `${langs.labels.priceHightoLow}`,
                                            onClick: () => handleSortBy('high_low_price')
                                        }
                                    ]}
                                    label={
                                        <a href="#">
                                            <img
                                                src="/assets/images/svg/exchange-icon.svg"
                                                alt="Exchange"
                                            />
                                        </a>
                                    }
                                />
                            )}
                            {filterOption && <ProductDrawerFilter />}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default ProductMobileHeader;
