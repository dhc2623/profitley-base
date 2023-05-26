import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import {
    Typography,
    Card,
    Collapse,
    Input,
    Select,
    Radio,
    Row,
    Col,
    Form,
    Checkbox,
    DatePicker
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsMeta } from '../../store/product/Action';
import { removeEmptyValues } from '../../helper/Utils';
import { setFilterVal } from '../../helper/FilterUtils';
import { langs } from '../../localization';
import { DATE_FORMAT } from '../../config/Constant';
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const FormInputWrapper = dynamic(() => import('../common/form/InputWrapper'));
const Image = dynamic(() => import('../common/image'));
const { Panel } = Collapse;
const { Option } = Select;

export default function ProductFilter({
    filterPage = '',
    filterCategory = true,
    filterBrand = true,
    filterModel = true,
    filterSegment = true,
    filterManufacturer = true,
    filterSku = true,
    filterPartNumber = true,
    filterName = true,
    filterListType = true,
    filterFrequently_order_on = false
}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { categories, brands, models, segments, manufacturers } = useSelector((state) => ({
        brands: state.product.metaData.brands,
        models: state.product.metaData.models,
        categories: state.product.metaData.categories,
        segments: state.product.metaData.segments,
        manufacturers: state.product.metaData.manufacturers
    }));
    const [frequentlyOrderType, setFrequentlyOrderOn] = useState(null);
    const [frequentlyOrderDate, setFrequentlyOrderDate] = useState(null);

    useEffect(() => {
        dispatch(getProductsMeta());
    }, []);

    useEffect(() => {
        form.setFieldsValue(router.query);
    }, [router.asPath]);

    /**
     * @name onFinish
     * @description It applies filter
     * @param {values}
     * @returns {}
     */
    const onFinish = (values) => {
        if (values.listType == 'All') {
            delete values.listType;
            delete router.query.listType;
        }
        if (values.period === 'custom_date__Custom%20Date') {
            values.dateFrom = dayjs(frequentlyOrderDate[0]).format('YYYY-MM-DD');
            values.dateTo = dayjs(frequentlyOrderDate[1]).format('YYYY-MM-DD');
            delete values.period;
        }
        const newFilter = { ...router.query, ...values };
        newFilter.page = 1;
        router.push({
            pathname: filterPage != '' ? filterPage : '/shop/products',
            query: removeEmptyValues(newFilter)
        });
    };

    /**
     * @name onReset
     * @description It resets filter
     * @param {}
     * @returns {}
     */
    const onReset = () => {
        const query = {
            page: 1
        };
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
            period: undefined,
            frequently_order_on: undefined
        });
        router.push({
            pathname: filterPage != '' ? filterPage : '/shop/products',
            query
        });
    };

    return (
        <Form form={form} initialValues={router.query} onFinish={onFinish}>
            <Card
                title={
                    <Typography.Title level={4} className="m-b0">
                        Filter
                    </Typography.Title>
                }
                className="product-filter"
                extra={
                    <a onClick={onReset}>
                        <Typography.Text type="danger">
                            <img src={'/assets/images/svg/close-icon-red.svg'} alt="" /> Clear All
                        </Typography.Text>
                    </a>
                }>
                <Collapse
                    accordion
                    expandIconPosition={'right'}
                    expandIcon={() => <DownOutlined />}>
                    {filterFrequently_order_on && (
                        <Panel header={langs.labels.frequentlyOrderOn} key="0">
                            <FormInputWrapper name={'period'}>
                                <Select
                                    size={'large'}
                                    style={{ width: '100%' }}
                                    allowClear
                                    onSelect={(e) => setFrequentlyOrderOn(e)}>
                                    <Option
                                        key={`period-current-quarter`}
                                        value={setFilterVal('current_quarter', 'Current Quarter')}>
                                        {'Current Quarter'}
                                    </Option>
                                    <Option
                                        key={`period-last-quarter`}
                                        value={setFilterVal('last_quarter', 'Last Quarter')}>
                                        {'Last Quarter'}
                                    </Option>
                                    <Option
                                        key={`period-last-month`}
                                        value={setFilterVal('last_month', 'Last Month')}>
                                        {'Last Month'}
                                    </Option>
                                    <Option
                                        key={`period-custom-date`}
                                        value={setFilterVal('custom_date', 'Custom Date')}>
                                        {'Custom Date'}
                                    </Option>
                                </Select>
                            </FormInputWrapper>
                            {frequentlyOrderType === 'custom_date__Custom%20Date' && (
                                <DatePicker.RangePicker
                                    size={'large'}
                                    style={{width:'100%'}}
                                    format={DATE_FORMAT}
                                    onChange={setFrequentlyOrderDate}
                                />
                            )}
                        </Panel>
                    )}
                    {filterCategory && (
                        <Panel header="Categories" key="1">
                            <div className="filter-options-content">
                                <FormInputWrapper name={'category[]'}>
                                    <Checkbox.Group style={{ display: 'block' }}>
                                        <ol className="items">
                                            {categories.length &&
                                                categories.map((item) => (
                                                    <li
                                                        className="item"
                                                        key={`category-${item.id}`}>
                                                        <div className="item-title">
                                                            <span className="icon">
                                                                {item.image && item.image != 0 && (
                                                                    <Image
                                                                        src={item.image}
                                                                        width={40}
                                                                        height={40}
                                                                        alt={item.name}
                                                                    />
                                                                )}
                                                            </span>
                                                            {item.name} {item.products_count && <Typography.Text type='secondary' className="p-l5">({item.products_count})</Typography.Text>}
                                                            <div className="custom-radio">
                                                                <Checkbox
                                                                    value={setFilterVal(
                                                                        item.slug,
                                                                        item.name
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                        </ol>
                                    </Checkbox.Group>
                                </FormInputWrapper>
                            </div>
                        </Panel>
                    )}
                    <Panel header="Type" key="7">
                        <FormInputWrapper name="listType">
                            <Radio.Group defaultValue={'All'}>
                                <Radio value={'All'}>All</Radio>
                                <Radio value={'best_sellers__Best Seller'}>Best Seller</Radio>
                                <Radio value={'fast_moving__Fast Moving'}>Fast Moving</Radio>
                            </Radio.Group>
                        </FormInputWrapper>
                    </Panel>
                    filterPartNumber
                    {filterSku && (
                        <Panel header="Search by SKU Number" key="8">
                            <FormInputWrapper name={'sku'}>
                                <Input size={'large'} />
                            </FormInputWrapper>
                        </Panel>
                    )}
                    {filterPartNumber && (
                        <Panel header="Search by Product Number" key="2">
                            <FormInputWrapper name={'part_number'}>
                                <Input size={'large'} />
                            </FormInputWrapper>
                        </Panel>
                    )}
                    {filterName && (
                        <Panel header="Search by Product Name" key="3">
                            <FormInputWrapper name={'name'}>
                                <Input size={'large'} />
                            </FormInputWrapper>
                        </Panel>
                    )}
                    {filterModel && (
                        <Panel header="Model Number" key="4">
                            <FormInputWrapper name={'model[]'}>
                                <Select
                                    size={'large'}
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select Models">
                                    {models.length &&
                                        models.map((item) => (
                                            <Option
                                                key={`model-${item.id}`}
                                                value={setFilterVal(item.slug, item.name)}>
                                                {item.name}
                                            </Option>
                                        ))}
                                </Select>
                            </FormInputWrapper>
                        </Panel>
                    )}
                    {filterBrand && (
                        <Panel header="Brands" key="5">
                            <div className="filter-options-content">
                                <FormInputWrapper name={'brand[]'}>
                                    <Checkbox.Group style={{ display: 'block' }}>
                                        <ol className="items">
                                            {brands.length &&
                                                brands.map((item) => (
                                                    <li className="item" key={`brand-${item.id}`}>
                                                        <div className="item-title">
                                                            <span className="icon">
                                                                {item.image && (
                                                                    <Image
                                                                        src={item.image}
                                                                        width={40}
                                                                        height={40}
                                                                        alt={item.name}
                                                                    />
                                                                )}
                                                            </span>
                                                            {item.name}
                                                            <div className="custom-radio">
                                                                <Checkbox
                                                                    value={setFilterVal(
                                                                        item.slug,
                                                                        item.name
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                        </ol>
                                    </Checkbox.Group>
                                </FormInputWrapper>
                            </div>
                            {/* <FormInputWrapper name={"brand[]"}>
							<Select
                                size={'large'}
								mode="multiple"
								allowClear
								style={{ width: "100%" }}
								placeholder="Please select brand"
							>
								{brands.length &&
									brands.map((item) => (
										<Option
											key={item.id}
											value={setFilterVal(
												item.slug,
												item.name
											)}
										>
											{item.name}
										</Option>
									))}
							</Select>
						</FormInputWrapper> */}
                        </Panel>
                    )}
                    {filterSegment && (
                        <Panel header="Segments" key="6">
                            <FormInputWrapper name={'segment[]'}>
                                <Select
                                    size={'large'}
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select Segments">
                                    {segments.length &&
                                        segments.map((item) => (
                                            <Option
                                                key={`segment-${item.id}`}
                                                value={setFilterVal(item.slug, item.name)}>
                                                {item.name}
                                            </Option>
                                        ))}
                                </Select>
                            </FormInputWrapper>
                        </Panel>
                    )}
                    {filterManufacturer && (
                        <Panel header="Manufacturers" key="7">
                            <FormInputWrapper name={'manufacturer[]'}>
                                <Select
                                    size={'large'}
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select Manufacturers">
                                    {manufacturers.length &&
                                        manufacturers.map((item) => (
                                            <Option
                                                key={`manufacturer-${item.id}`}
                                                value={setFilterVal(item.slug, item.name)}>
                                                {item.name}
                                            </Option>
                                        ))}
                                </Select>
                            </FormInputWrapper>
                        </Panel>
                    )}
                </Collapse>
                <div className="filter-options-action">
                    <ButtonWraper type="primary" htmlType="submit" block>
                        {'Apply'}
                    </ButtonWraper>
                </div>
            </Card>
        </Form>
    );
}
