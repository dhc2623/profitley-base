import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import {
    Select,
    Drawer,
    Button,
    Form,
    Input,
    Radio,
    Checkbox,
    Typography,
    Space,
    Tabs,
    Empty
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsMeta } from '../../store/product/Action';
import { removeEmptyValues } from '../../helper/Utils';
import { setFilterVal } from '../../helper/FilterUtils';
import { isUserLoggedIn } from '../../helper/AuthActions';
import { langs } from '../../localization';
const FormInputWrapper = dynamic(() => import('../common/form/InputWrapper'));
const { TabPane } = Tabs;
const { Option } = Select;

const ProductDrawerFilter = () => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [categoriesMenu, setCategoriesMenu] = useState([]);
    const [frequentlyOrderOn, setFrequentlyOrderOn] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { categories, brands, models, segments, manufacturers, metaLoading } = useSelector(
        (state) => ({
            brands: state.product.metaData.brands,
            models: state.product.metaData.models,
            categories: state.product.metaData.categories,
            segments: state.product.metaData.segments,
            manufacturers: state.product.metaData.manufacturers,
            metaLoading: state.product.metaLoading
        })
    );

    useEffect(() => {
        if (isUserLoggedIn()) {
            dispatch(getProductsMeta());
        }
        setFrequentlyOrderOn(router.pathname == '/shop/frequently-order');
    }, []);

    useEffect(() => {
        const nest = (items, parent = 0) => {
            const nested = [];
            Object.values(items).forEach(item => {
              // parent can be a string or a number
              /* eslint-disable-next-line eqeqeq */
              if (item.parent_id == parent) {
                const children = nest(items, item.id);
          
                if (children.length) {
                  /* eslint-disable-next-line no-param-reassign */
                  item.children = children;
                }
          
                nested.push(item);
              }
            });
          
            return nested;
          };
          
        setCategoriesMenu(nest(categories));
    }, [categories]);

    useEffect(() => {
        let routeQuery = router.query;
        switch (router.pathname) {
            case '/shop/category/[category]':
                const catName = categories.filter(
                    (item) =>
                        item.slug == routeQuery['category'] || item.slug == routeQuery['category[]']
                );
                if (catName.length > 0) {
                    routeQuery['category[]'] = [
                        `${routeQuery['category[]']}__${encodeURI(catName[0].name)}`
                    ];
                }
                break;
            case '/shop/brand/[brand]':
                const brandName = brands.filter(
                    (item) => item.slug == routeQuery['brand'] || item.slug == routeQuery['brand[]']
                );
                if (brandName.length > 0) {
                    routeQuery['brand[]'] = [
                        `${routeQuery['brand[]']}__${encodeURI(brandName[0].name)}`
                    ];
                }
                break;
            case '/shop/model/[model]':
                const modelName = models.filter(
                    (item) => item.slug == routeQuery['model'] || item.slug == routeQuery['model[]']
                );
                if (modelName.length > 0) {
                    routeQuery['model[]'] = [
                        `${routeQuery['model[]']}__${encodeURI(modelName[0].name)}`
                    ];
                }
                break;
            case '/shop/fast-moving':
                routeQuery['listType'] = 'fast_moving__Fast Moving';
                break;
            case '/shop/best-sellers':
                routeQuery['listType'] = 'best_sellers__Best Seller';
                break;
            default:
                break;
        }
        if (!routeQuery['category[]']) {
            routeQuery['category[]'] = [];
        }
        if (!routeQuery['brand[]']) {
            routeQuery['brand[]'] = [];
        }
        if (!routeQuery['manufacturer[]']) {
            routeQuery['manufacturer[]'] = [];
        }
        if (!routeQuery['model[]']) {
            routeQuery['model[]'] = [];
        }
        if (!routeQuery['segment[]']) {
            routeQuery['segment[]'] = [];
        }
        setTimeout(() => form.setFieldsValue(routeQuery), 1000);
    }, [router.asPath, metaLoading]);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    /**
     * @name onFinish
     * @description It applies filter
     * @param {}
     * @returns {}
     */
    const onFinish = () => {
        var path = router.pathname;
        form.validateFields()
            .then((values) => {
                values.page = 1;
                let submitPath = '';
                if (values.listType == 'best_sellers__Best Seller') {
                    submitPath = '/shop/best-sellers';
                } else if (values.listType == 'fast_moving__Fast Moving') {
                    submitPath = '/shop/fast-moving';
                } else {
                    if (frequentlyOrderOn) {
                        submitPath = '/shop/frequently-order';
                    } else {
                        submitPath = '/shop/products';
                    }
                    delete values.listType;
                }
                router.push({
                    pathname: submitPath,
                    query: removeEmptyValues(values)
                });
                setVisible(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    /**
     * @name onReset
     * @description It resets filter
     * @param {}
     * @returns {}
     */
    const onReset = () => {
        var path = router.pathname;
        var isInventory = path.search('inventory');
        form.setFieldsValue({
            'category[]': undefined,
            'brand[]': undefined,
            'model[]': undefined,
            'segment[]': undefined,
            'manufacturer[]': undefined,
            sku: undefined,
            part_number: undefined,
            name: undefined,
            search: undefined,
            listType: 'All',
            frequently_order_on: undefined
        });
        router.push({
            pathname:
                isInventory != -1
                    ? `/inventory/categories/${router.query.category}`
                    : '/shop/products'
        });
        setVisible(false);
    };


    return (
        <Fragment>
            <a onClick={showDrawer} className="filter-icon">
                <img src="/assets/images/svg/filter-icon.svg" alt="Filter" />
            </a>
            <Drawer
                title={langs.labels.productFilter}
                placement="left"
                closable={true}
                width={'100%'}
                onClose={onClose}
                visible={visible}
                className="product-filter-tabs"
                footer={
                    <div
                        style={{
                            textAlign: 'right'
                        }}>
                        <Button type={'ghost'} onClick={onReset} style={{ marginRight: 8 }}>
                            {langs.labels.reset}
                        </Button>
                        <Button type="primary" onClick={onFinish}>
                            {langs.labels.submit}
                        </Button>
                    </div>
                }>
                <Form name="filter" form={form} initialValues={router.query} layout={'vertical'}>
                    <div className="filter-box-top">
                        <FormInputWrapper label={langs.labels.type} name="listType">
                            <Radio.Group defaultValue={'All'}>
                                <Space direction="horizontal">
                                    <Radio value={'All'}>{langs.labels.all}</Radio>
                                    <Radio value={'best_sellers__Best Seller'}>{langs.labels.bestSeller}</Radio>
                                    <Radio value={'fast_moving__Fast Moving'}>{langs.labels.fastMoving}</Radio>
                                </Space>
                            </Radio.Group>
                        </FormInputWrapper>
                    </div>
                    <Tabs defaultActiveKey="1" tabPosition={'left'}>
                        {frequentlyOrderOn && (
                            <TabPane tab={langs.labels.frequentlyOrderOn} key="2">
                                <FormInputWrapper name={'frequently_order_on'}>
                                    <Select
                                        style={{ width: '100%' }}
                                        allowClear
                                        size={'large'}
                                        placeholder={langs.labels.pleaseSelectFrequentlyOrder}
                                    >
                                        <Option
                                            key={`frequently_order_on-current-quater`}
                                            value={setFilterVal(
                                                'current_quater',
                                                'Current Quater'
                                            )}>
                                            {langs.labels.currentQuarter}
                                        </Option>
                                        <Option
                                            key={`frequently_order_on-last-quater`}
                                            value={setFilterVal('last_quater', 'Last Quater')}>
                                            {langs.labels.lastQuarter}
                                        </Option>
                                        <Option
                                            key={`frequently_order_on-last-month`}
                                            value={setFilterVal('last_month', 'Last Month')}>
                                            {langs.labels.lastMonth}
                                        </Option>
                                    </Select>
                                </FormInputWrapper>
                            </TabPane>
                        )}
                        <TabPane tab={langs.labels.openText} key="3">
                            <FormInputWrapper label={langs.labels.searchBySkuNumber} name="sku">
                                <Input size={'large'} placeholder={langs.labels.sku} />
                            </FormInputWrapper>
                            <FormInputWrapper label={langs.labels.searchByPartNumber} name="part_number">
                                <Input size={'large'} placeholder={langs.labels.partNumber} />
                            </FormInputWrapper>
                            <FormInputWrapper label={langs.labels.searchByPartName} name="name">
                                <Input size={'large'} placeholder={langs.labels.partName} />
                            </FormInputWrapper>
                        </TabPane>
                        <TabPane tab={langs.labels.categories} key="6">
                            <div className="filter-checkbox-content">
                                <FormInputWrapper name={'category[]'}>
                                    <Checkbox.Group style={{ display: 'block' }}>
                                        <ol className="items">
                                            {categoriesMenu.length > 0 &&
                                                categoriesMenu.map((item) => (
                                                    <Fragment key={`category-${item.id}`}>
                                                        <li className="item">
                                                            <div className="item-title">
                                                                <div className="custom-radio">
                                                                    <Checkbox
                                                                        value={setFilterVal(
                                                                            item.slug,
                                                                            item.name
                                                                        )}
                                                                    />
                                                                </div>
                                                                {item.name}{' '}
                                                                {item.products_count && (
                                                                    <Typography.Text
                                                                        type="secondary"
                                                                        className="p-l5">
                                                                        ({item.products_count})
                                                                    </Typography.Text>
                                                                )}
                                                            </div>
                                                            {item.children && item.children.length > 0 && (
                                                                <ul className="sub-item">
                                                                    {item.children.map(function (
                                                                        item
                                                                    ) {
                                                                        return (
                                                                            <li
                                                                                key={`subCategory-${item.id}`}
                                                                                className="item">
                                                                                <div className="item-title">
                                                                                    <div className="custom-radio">
                                                                                        <Checkbox
                                                                                            value={setFilterVal(
                                                                                                item.slug,
                                                                                                item.name
                                                                                            )}
                                                                                        />
                                                                                    </div>
                                                                                    {item.name}{' '}
                                                                                    {item.products_count && (
                                                                                        <Typography.Text
                                                                                            type="secondary"
                                                                                            className="p-l5">
                                                                                            (
                                                                                            {
                                                                                                item.products_count
                                                                                            }
                                                                                            )
                                                                                        </Typography.Text>
                                                                                    )}
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    </Fragment>
                                                ))}
                                        </ol>
                                    </Checkbox.Group>
                                </FormInputWrapper>
                            </div>
                        </TabPane>
                        <TabPane tab={langs.labels.brands} key="7">
                            <div className="filter-checkbox-content">
                                <FormInputWrapper name="brand[]">
                                    <Checkbox.Group style={{ display: 'block' }}>
                                        <ol className="items">
                                            {brands.length ?
                                                brands.map((item) => (
                                                    <li
                                                        className="item"
                                                        key={`brand-${item.id}`}>
                                                        <div className="item-title">
                                                            <div className="custom-radio">
                                                                <Checkbox
                                                                    value={setFilterVal(
                                                                        item.slug,
                                                                        item.name
                                                                    )}
                                                                />
                                                            </div>
                                                            {item.name}{' '}
                                                            {item.products_count && (
                                                                <Typography.Text
                                                                    type="secondary"
                                                                    className="p-l5">
                                                                    ({item.products_count})
                                                                </Typography.Text>
                                                            )}
                                                        </div>
                                                    </li>
                                                )):
                                                <Empty />
                                            }
                                        </ol>
                                    </Checkbox.Group>
                                </FormInputWrapper>
                            </div>
                        </TabPane>
                        <TabPane tab={langs.labels.models} key="8">
                            <div className="filter-checkbox-content">
                                <FormInputWrapper name="model[]">
                                    <Checkbox.Group style={{ display: 'block' }}>
                                        <ol className="items">
                                            {models.length ?
                                                models.map((item) => (
                                                    <li
                                                        className="item"
                                                        key={`models-${item.id}`}>
                                                        <div className="item-title">
                                                            <div className="custom-radio">
                                                                <Checkbox
                                                                    value={setFilterVal(
                                                                        item.slug,
                                                                        item.name
                                                                    )}
                                                                />
                                                            </div>
                                                            {item.name}{' '}
                                                            {item.products_count && (
                                                                <Typography.Text
                                                                    type="secondary"
                                                                    className="p-l5">
                                                                    ({item.products_count})
                                                                </Typography.Text>
                                                            )}
                                                        </div>
                                                    </li>
                                                )):
                                                <Empty />
                                            }
                                        </ol>
                                    </Checkbox.Group>
                                </FormInputWrapper>
                            </div>
                        </TabPane>
                        <TabPane tab={langs.labels.segments} key="9">
                            <div className="filter-checkbox-content">
                                <FormInputWrapper name={'segment[]'}>
                                    <Checkbox.Group style={{ display: 'block' }}>
                                        <ol className="items">
                                            {segments.length ?
                                                segments.map((item) => (
                                                    <li
                                                        className="item"
                                                        key={`segments-${item.id}`}>
                                                        <div className="item-title">
                                                            <div className="custom-radio">
                                                                <Checkbox
                                                                    value={setFilterVal(
                                                                        item.slug,
                                                                        item.name
                                                                    )}
                                                                />
                                                            </div>
                                                            {item.name}{' '}
                                                            {item.products_count && (
                                                                <Typography.Text
                                                                    type="secondary"
                                                                    className="p-l5">
                                                                    ({item.products_count})
                                                                </Typography.Text>
                                                            )}
                                                        </div>
                                                    </li>
                                                )):
                                                <Empty />
                                            }
                                        </ol>
                                    </Checkbox.Group>
                                </FormInputWrapper>
                            </div>
                        </TabPane>
                        <TabPane tab={langs.labels.manufacturers} key="10">
                            <div className="filter-checkbox-content">
                                <FormInputWrapper name={'manufacturer[]'}>
                                    <Checkbox.Group style={{ display: 'block' }}>
                                        <ol className="items">
                                            {manufacturers.length ?
                                                manufacturers.map((item) => (
                                                    <li
                                                        className="item"
                                                        key={`manufacturers-${item.id}`}>
                                                        <div className="item-title">
                                                            <div className="custom-radio">
                                                                <Checkbox
                                                                    value={setFilterVal(
                                                                        item.slug,
                                                                        item.name
                                                                    )}
                                                                />
                                                            </div>
                                                            {item.name}{' '}
                                                            {item.products_count && (
                                                                <Typography.Text
                                                                    type="secondary"
                                                                    className="p-l5">
                                                                    ({item.products_count})
                                                                </Typography.Text>
                                                            )}
                                                        </div>
                                                    </li>
                                                )):
                                                <Empty />
                                            }
                                        </ol>
                                    </Checkbox.Group>
                                </FormInputWrapper>
                            </div>
                        </TabPane>
                    </Tabs>
                </Form>
            </Drawer>
        </Fragment>
    );
};
export default ProductDrawerFilter;
