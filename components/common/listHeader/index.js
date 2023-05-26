import { Fragment } from 'react';
import { Typography } from 'antd';
import DropdownMenu from '../dropdown';
const { Text } = Typography;

const ListHeader = ({
    viewOption = false,
    filterOption = true,
    sortOption = true,
    setPageQuery = '',
    pageQuery = {},
    count = 0,
    pageDispatch = () => {},
    sortList = [],
    setfilterVisible,
    moreRightActions = [],
    ...props
}) => {
    const handleSortBy = (data) => {
        pageQuery.page = 1;
        pageQuery.sort = data;
        setPageQuery({ ...pageQuery });
    };

    sortList.map((item) => (item.onClick = () => handleSortBy(item.value)));

    return (
        <Fragment>
            <div className="list-header">
                <div className="appbar">
                    <div className="appbar-inner">
                        <div className="center">
                            <Text className="item-count">{`${count} ${props.label}`}</Text>
                        </div>

                        <div className="right">
                            {sortOption && sortList.length > 0 && (
                                <DropdownMenu
                                    menuItem={sortList}
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
                            {filterOption && (
                                <a onClick={setfilterVisible} className="filter-icon">
                                    <img src="/assets/images/svg/filter-icon.svg" alt="Filter" />
                                </a>
                            )}
                            {moreRightActions.length > 0 &&
                                moreRightActions.map((item, index) =>
                                    !item.hideItem ? (
                                        <a key={index} onClick={item.click} className="filter-icon">
                                            {item.render()}
                                        </a>
                                    ) : (
                                        ''
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default ListHeader;
