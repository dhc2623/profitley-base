import { Typography } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Panel, { PanelBody, PanelTitle } from '../../components/common/panel';
import Responsive from '../../components/responsive/Responsive';

import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import { langs } from '../../localization';
import { GET_BANNERS_DATA_INITIATE } from '../../store/banners/Action';
import { ADD_TO_CART_INITIATE } from '../../store/cart/Action';
import { GET_HOME_DATA_INITIATE } from '../../store/home/Action';
import { ADD_TO_FAVOURITE_INITIATE } from '../../store/favourite/Action';
import withAppContext from '../../config/withAppContext';
import { setFilterVal } from '../../helper/FilterUtils';

// import LoadData from '../../components/common/load-data';
// import DocHead from '../../components/common/head';
// import CategoryList from '../../components/home/CategoryList';
// import CarouselSlider from '../../components/common/carousel/CarouselSlider';
// import SingleImageSlider from '../../components/common/carousel/SingleImageSlider';
// import ProductItem from '../../components/home/ProductItem';
// import BlockItem from '../../components/home/BlockItem';
// import TrendingPartsItems from '../../components/home/TrendingPartsItems';
// import SelectBuyerToggle from '../../components/cart/select-buyer-toggle';

const LoadData = dynamic(() => import('../../components/common/load-data'));
const DocHead = dynamic(() => import('../../components/common/head'));
const CategoryList = dynamic(() => import('../../components/home/CategoryList'));
const CarouselSlider = dynamic(() => import('../../components/common/carousel/CarouselSlider'));
const SingleImageSlider = dynamic(() =>
    import('../../components/common/carousel/SingleImageSlider')
);
const ProductItem = dynamic(() => import('../../components/home/ProductItem'));
const BlockItem = dynamic(() => import('../../components/home/BlockItem'));
const TrendingPartsItems = dynamic(() => import('../../components/home/TrendingPartsItems'));
const SelectBuyerToggle = dynamic(() => import('../../components/cart/select-buyer-toggle'));

const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const selectedRetailerId = useSelector((state) => state.common.selectedRetailerId);
    const currentUser = useSelector((state) => state.auth.profile);
    const data = useSelector((state) => state.home.homeData);
    const loading = useSelector((state) => state.home.loading);
    const bannersData = useSelector((state) => state.banners.bannersData);
    const favouriteIds = useSelector((state) => state.favourite.favouriteIds);
    const bannersData2 = useSelector((state) => state.banners);

    const bestSellers = data.best_sellers;
    const brands = data.brands;
    const models = data.models;
    const newArrivals = data.new_arrivals;
    const homeCategories = data.categories;
    const segments = data.segments;
    const featuredProduct = data.featured_product;
    const recommendedProducts = data.recommended_products;

    useEffect(() => {
        dispatch({ type: GET_HOME_DATA_INITIATE });
        dispatch({ type: GET_BANNERS_DATA_INITIATE });
    }, [selectedRetailerId, currentUser.organization_id]);

    // useEffect(() => {
    //     dispatch({ type: GET_HOME_DATA_INITIATE });
    // }, [selectedRetailerId]);

    // useEffect(() => {
    //     dispatch({ type: GET_HOME_DATA_INITIATE });
    //     dispatch({ type: GET_BANNERS_DATA_INITIATE });
    // }, []);

    const handleLink = (link) => {
        router.push({ pathname: link });
    };

    /**
     * @name addToCart
     * @description It adds product into cart
     * @param {data}
     * @returns {}
     */
    const addToCart = (data) => {
        data.quantity = data.moq ? data.moq : 1;
        data.totalPrice = data.price;
        dispatch({ type: ADD_TO_CART_INITIATE, product: data });
    };

    /**
     * @name addProductToFavourite
     * @description add product to favourite
     * @param {product}
     * @returns {}
     */
    const addProductToFavourite = (product) => {
        dispatch({
            type: ADD_TO_FAVOURITE_INITIATE,
            payload: product.id,
            favouriteIds
        });
    };

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.home} />
            <LoadData data={data} loading={loading}>
                <div className="wrap">
                    <SelectBuyerToggle />
                    <Responsive.Mobile>
                        <Fragment>
                            <div>
                                <CategoryList />
                            </div>
                        </Fragment>
                    </Responsive.Mobile>
                    <div>
                        <SingleImageSlider
                            className="home-banner"
                            slideItems={
                                bannersData &&
                                bannersData.map((item) => {
                                    // if (item.type == 'images') {
                                    return (
                                        <div key={item.title}>
                                            <a
                                                href={item.link ? item.link : 'javascript:void(0)'}
                                                target={item.target}>
                                                <img src={item.image} alt={item.title} />
                                            </a>
                                        </div>
                                    );
                                    // }
                                })
                            }
                        />
                    </div>

                    {/*models && models.length > 0 && (
                        <Panel className="section-block-slider" key={'model'}>
                            <PanelTitle title={langs.labels.models} />
                            <PanelBody>
                                <CarouselSlider
                                    slideItems={
                                        models &&
                                        models.map((item) => {
                                            return (
                                                <BlockItem
                                                    key={item.slug}
                                                    image={
                                                        item.file_name
                                                            ? item.file_name
                                                            : '/assets/images/default_product_image.png'
                                                    }
                                                    name={item.name}
                                                    link={`/shop/model/${item.slug}`}
                                                />
                                            );
                                        })
                                    }
                                />
                            </PanelBody>
                        </Panel>
                                )*/}
                    {brands && brands.length > 0 && (
                        <Panel className="section-block-slider" key={'brand'}>
                            <PanelTitle title={langs.labels.brands} />
                            <PanelBody>
                                <CarouselSlider
                                    slideItems={
                                        brands &&
                                        brands.map((item) => {
                                            return (
                                                <BlockItem
                                                    key={item.slug}
                                                    image={
                                                        item.image
                                                            ? item.image
                                                            : '/assets/images/default_product_image.png'
                                                    }
                                                    name={item.name}
                                                    link={`/shop/brand/${item.slug}`}
                                                />
                                            );
                                        })
                                    }
                                />
                            </PanelBody>
                        </Panel>
                    )}

                    {homeCategories &&
                        homeCategories.map((category) => {
                            return (
                                <Panel className="section-product-slider" key={category.name}>
                                    <PanelTitle
                                        title={category.name}
                                        action={[
                                            {
                                                label: `${langs.labels.viewAll}`,
                                                type: 'primary',
                                                onClick: () =>
                                                    handleLink(`/shop/category/${category.slug}`)
                                            }
                                        ]}
                                    />
                                    <PanelBody>
                                        <CarouselSlider
                                            slideItems={category.products.map((item) => {
                                                return (
                                                    <ProductItem
                                                        key={item.id}
                                                        image={item.main_image}
                                                        name={item.name}
                                                        handleAddToCart={() => {
                                                            addToCart(item);
                                                        }}
                                                        quickViewLink={`/shop/product-detail/${item.id}`}
                                                    />
                                                );
                                            })}
                                        />
                                    </PanelBody>
                                </Panel>
                            );
                        })}
                    {newArrivals && newArrivals.length > 0 && (
                        <Panel className="section-product-slider" key={'new-arrivals'}>
                            <PanelTitle title={langs.labels.newArrivals} />
                            <PanelBody>
                                <CarouselSlider
                                    slideItems={
                                        newArrivals &&
                                        newArrivals.map((item) => {
                                            return (
                                                <ProductItem
                                                    key={item.id}
                                                    image={item.main_image}
                                                    name={item.name}
                                                    handleAddToCart={() => {
                                                        addToCart(item);
                                                    }}
                                                    quickViewLink={`/shop/product-detail/${item.id}`}
                                                />
                                            );
                                        })
                                    }
                                />
                            </PanelBody>
                        </Panel>
                    )}

                    {segments && segments.length > 0 && (
                        <Panel className="section-block-slider" key={'segments'}>
                            <PanelTitle title={langs.labels.segments} />
                            <PanelBody>
                                <CarouselSlider
                                    slideItems={
                                        segments &&
                                        segments.map((item) => {
                                            return (
                                                <BlockItem
                                                    key={item.slug}
                                                    image={
                                                        item.file_name
                                                            ? item.file_name
                                                            : '/assets/images/default_product_image.png'
                                                    }
                                                    name={item.name}
                                                    link={`/shop/products?segment[]=${setFilterVal(
                                                        item.slug,
                                                        item.name
                                                    )}&page=1`}
                                                />
                                            );
                                        })
                                    }
                                />
                            </PanelBody>
                        </Panel>
                    )}
                    {featuredProduct && featuredProduct.length > 0 && (
                        <Panel className="section-product-slider" key={'new-arrivals'}>
                            <PanelTitle title={langs.labels.featuredProducts} />
                            <PanelBody>
                                <CarouselSlider
                                    slideItems={
                                        featuredProduct &&
                                        featuredProduct.map((item) => {
                                            return (
                                                <ProductItem
                                                    key={item.id}
                                                    image={item.main_image}
                                                    name={item.name}
                                                    handleAddToCart={() => {
                                                        addToCart(item);
                                                    }}
                                                    quickViewLink={`/shop/product-detail/${item.id}`}
                                                />
                                            );
                                        })
                                    }
                                />
                            </PanelBody>
                        </Panel>
                    )}

                    {recommendedProducts && recommendedProducts.length > 0 && (
                        <Panel className="section-product-slider" key={'new-arrivals'}>
                            <PanelTitle title={langs.labels.recommendedProducts} />
                            <PanelBody>
                                <CarouselSlider
                                    slideItems={
                                        recommendedProducts &&
                                        recommendedProducts.map((item) => {
                                            return (
                                                <ProductItem
                                                    key={item.id}
                                                    image={item.main_image}
                                                    name={item.name}
                                                    handleAddToCart={() => {
                                                        addToCart(item);
                                                    }}
                                                    quickViewLink={`/shop/product-detail/${item.id}`}
                                                />
                                            );
                                        })
                                    }
                                />
                            </PanelBody>
                        </Panel>
                    )}

                    {bestSellers && bestSellers.length > 0 && (
                        <section id="trending-parts-container">
                            <div className="heading-box">
                                <Typography.Title level={5}>
                                    {langs.labels.bestSellers}
                                </Typography.Title>
                                {/* <Link href="#">
									<a className="view-all-btn">{langs.labels.viewAll} <RightOutlined /></a>
								</Link> */}
                            </div>
                            <div className="trend-row section-product-slider" >
                                {/* <CarouselSlider
                                    slideItems={
                                        bestSellers &&
                                        bestSellers.map((item) => (
                                            <TrendingPartsItems
                                                key={item.slug}
                                                image={item.main_image}
                                                name={item.name}
                                                price={item.price}
                                                productLink={`/shop/product-detail/${item.id}`}
                                                favouriteLink={() => {
                                                    addProductToFavourite(item);
                                                }}
                                                addToCartLink={() => {
                                                    addToCart(item);
                                                }}
                                                id={item.id}
                                                favouriteIds={favouriteIds}
                                            />
                                        ))
                                    }
                                /> */}
                                <CarouselSlider
                                    slideItems={
                                        bestSellers &&
                                        bestSellers.map((item) => {
                                            return (
                                                <ProductItem
                                                    key={item.id}
                                                    image={item.main_image}
                                                    name={item.name}
                                                    handleAddToCart={() => {
                                                        addToCart(item);
                                                    }}
                                                    quickViewLink={`/shop/product-detail/${item.id}`}
                                                />
                                            );
                                        })
                                    }
                                />
                            </div>
                        </section>
                    )}
                </div>
            </LoadData>
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }
export default withAppContext(Home);
