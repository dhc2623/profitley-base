import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Typography, Card, Row, Col, Select, Input } from 'antd';
import { GET_FAV_LIST_INITIATE } from '../../store/favourite/Action';
import Responsive from '../../components/responsive/Responsive';

import SelectBuyerToggle from '../../components/cart/select-buyer-toggle';
import dynamic from 'next/dynamic';
import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import { langs } from '../../localization';
import FavouriteItemDesktop from '../../components/favourite/FavouriteItemDesktop';
import FavouriteItemMobile from '../../components/favourite/FavouriteItemMobile';
import  withAppContext  from '../../config/withAppContext';
// import PageTitle from '../../components/common/page-title';
// import DocHead from '../../components/common/head';
// import Favourite from '../../components/favourite/Favourite';
// import LoadData from '../../components/common/load-data';

const PageTitle = dynamic(() => import('../../components/common/page-title'));
const DocHead = dynamic(() => import('../../components/common/head'));
const Favourite = dynamic(() => import('../../components/favourite/Favourite'));
const LoadData = dynamic(() => import('../../components/common/load-data'));

const { Option } = Select;

const FavouritePage = () => {
    const dispatch = useDispatch();

    const favourite = useSelector((state) => state.favourite.favourite);
    const selectedRetailerId = useSelector((state) => state.common.selectedRetailerId);
    const loading = useSelector((state) => state.favourite.loading);

    const [SFavourite, setSFavourite] = useState([]);

    useEffect(() => {}, [SFavourite]);

    useEffect(() => {
        setSFavourite(favourite)
    }, [favourite]);

    useEffect(() => {
        dispatch({ type: GET_FAV_LIST_INITIATE });
    }, [selectedRetailerId]);

    const handleSearch = (e) => {
        const substr = e.target.value;
        const array = favourite;
        const flowFilter = () => {
            return _.filter(
                array,
                (item) => {
                    const partNumber = _.toLower(item.sku_code)
                    const partName = _.toLower(item.name)
                    const cat = _.toLower(item.categories.toString())
                    const brand = _.toLower(item.brand)
                    const models = _.toLower(item.models)

                    return partNumber.includes(_.toLower(substr)) || partName.includes(_.toLower(substr)) || cat.includes(_.toLower(substr)) || brand.includes(_.toLower(substr)) || models.includes(_.toLower(substr))
                }
                // _.flow(_.identity, _.values, _.join, _.toLower, _.partialRight(_.includes, substr))
            );
        };
        if (substr.length >= 0) {
            setSFavourite(flowFilter);
        } else {
            setSFavourite(favourite);
        }
    };

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.myFavouritesProducts} />
            <Responsive.Mobile>
                <PageTitle title={langs.labels.myFavouritesProducts} itemCount={favourite.length} />
                <SelectBuyerToggle />
                <LoadData loading={loading} data={favourite} verticalHeight={'70vh'}>
                    <Input.Search onChange={handleSearch} size={'large'} className="m-t10"/>
                    {SFavourite &&
                        SFavourite.length > 0 &&
                        SFavourite.map((item) => {
                            return (
                                <Fragment key={item.id}>
                                    <FavouriteItemMobile item={item} />
                                </Fragment>
                            );
                        })}
                </LoadData>
            </Responsive.Mobile>
            <div className="wrap">
                <Responsive.Desktop>
                    <SelectBuyerToggle />
                    <Row gutter={[16, 0]}>
                        <Col md={24} xs={24}>
                            <Card
                                title={
                                    <Fragment>
                                        <Typography.Title level={3}>
                                            {langs.labels.myFavouritesProducts}
                                            <span className="items-num">
                                                (
                                                {favourite.length > 0
                                                    ? `${favourite.length} ${langs.labels.items}`
                                                    : `${langs.labels.noItems}`}
                                                )
                                            </span>
                                        </Typography.Title>
                                    </Fragment>
                                }
                                className="product-list-wrap favourite-head-block"
                                extra={<Input.Search onChange={handleSearch} size={'large'} />}
                            >
                                <div className="products-wrapper grid-desktop">
                                    <LoadData loading={loading} data={favourite} verticalHeight={'70vh'}>
                                        <div className="products-list">
                                        {SFavourite &&
                                            SFavourite.length > 0 &&
                                            SFavourite.map((item) => {
                                                return (
                                                    <Fragment key={item.id}>
                                                        <FavouriteItemDesktop item={item} />
                                                    </Fragment>
                                                );
                                            })}
                                        </div>
                                    </LoadData>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Responsive.Desktop>
            </div>
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }
export default withAppContext(FavouritePage);

