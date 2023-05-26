import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Typography } from 'antd';
import dynamic from 'next/dynamic';
const ProductDrawerFilter = dynamic(() => import('./ProductDrawerFilter'));
const { Text } = Typography;

const ProductDesktopHeader = ({
    viewOption = false,
    filterOption = true,
    setgridStyleDesktop = '',
    gridStyleDesktop = '',
    ...props
}) => {
    const router = useRouter();
    const count = useSelector((state) => state.product.productListMeta.pagination.total);

    return (
        <Fragment>
            <div className="product-header-option">
                {viewOption && (
                    <Fragment>
                        <a
                            onClick={() => setgridStyleDesktop('grid')}
                            className={`grid ${
                                gridStyleDesktop === 'grid' ? 'active' : ''
                            }`}>
                            <img
                                src={'/assets/images/svg/grid-view-icon2.svg'}
                                width="17"
                                alt="Grid View"
                            />
                        </a>
                        <a
                            onClick={() => setgridStyleDesktop('list')}
                            className={`list ${gridStyleDesktop === 'list' ? 'active' : ''}`}>
                            <img
                                src={'/assets/images/svg/grid-view-icon.svg'}
                                alt="List View"
                            />
                        </a>
                    </Fragment>
                )}
                {filterOption && <ProductDrawerFilter />}
            </div>
        </Fragment>
    );
};
export default ProductDesktopHeader;
