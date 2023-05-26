import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useFilters from '../../../hooks/useFilters';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { langs } from '../../../localization';
import dynamic from 'next/dynamic';
const ButtonWraper = dynamic(() => import('../form/ButtonWrapper'));

const ReduxPagination = ({
    currentPage = 1,
    totalPages = 1,
    loading = false,
    setPageQuery = '',
    pageQuery = {}
}) => {
    const handleNextPrevPage = (isNext) => {
        let page = 1;
        const query = pageQuery;
        if (isNext == 'next') {
            page = query.page ? Number(query.page) + 1 : 2;
        } else {
            page = Number(query.page) - 1;
        }
        query.page = page;
        setPageQuery({ ...query });
        window.scrollTo(0, 70);
    };
    return (
        <div className="pagination-actions">
            <div className="pagination-actions-item">
                {currentPage != 1 && (
                    <ButtonWraper
                        onClick={() => handleNextPrevPage('prev')}
                        loading={loading}
                        type={'primary'}>
                        <ArrowLeftOutlined /> {langs.labels.previous}
                    </ButtonWraper>
                )}
            </div>
            <div className="pagination-actions-item">
                {totalPages != currentPage && (
                    <ButtonWraper
                        onClick={() => handleNextPrevPage('next')}
                        loading={loading}
                        type={'primary'}>
                        {langs.labels.next} <ArrowRightOutlined />
                    </ButtonWraper>
                )}
            </div>
        </div>
    );
};
export default ReduxPagination;
