import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Fragment, useRef, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import _ from 'lodash';
import { AudioOutlined, SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { Drawer, Form, Input, List, Avatar, AutoComplete, Tooltip } from 'antd';
import { errorResponse, formatToCurrency } from '../../../helper/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsList, getProductsListFailure } from '../../../store/product/Action';
import Link from 'next/link';
import { getProductsListService } from '../../../store/product/Service';
import Responsive from '../../responsive/Responsive';
import { langs } from '../../../localization';
const ButtonWraper = dynamic(() => import('../form/ButtonWrapper'));

const Dictaphone = ({ handleOnChange }) => {
    const [audioToggle, setAudioToggle] = useState(false);
    const { transcript, resetTranscript, listening } = useSpeechRecognition();

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }

    useEffect(() => {
        if (!listening && transcript) {
            // setTimeout(() => {
                handleOnChange(transcript);
            // }, 1000);
        }
    }, [audioToggle]);

    const handleAudioStart = () => {
        setAudioToggle(true);
        SpeechRecognition.startListening();
    };

    const handleAudioEnd = () => {
        setAudioToggle(false);
        SpeechRecognition.stopListening();
    };

    const audioTerm = {
        onMouseDown: handleAudioStart,
        onTouchStart: handleAudioStart,
        onMouseUp: handleAudioEnd,
        onTouchEnd: handleAudioEnd
    };

    return (
        <Tooltip
            placement="topRight"
            title={
                <Fragment>
                    {langs.labels.searchByVoice} <br />
                    {langs.labels.holdAndSpeak}
                </Fragment>
            }>
            <ButtonWraper type="secondary" {...audioTerm}>
                <AudioOutlined />
            </ButtonWraper>
        </Tooltip>
    );
};

const HeaderSearch = ({ hideDesktopSearch }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [drawerToggle, setDrawerToggle] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [productList, setProductList] = useState([]);
    const [searchVal, setSearchVal] = useState('');

    useEffect(() => {}, [productList]);

    /**
     * @method handleSearch
     * @description handles search term.
     * @param {search}
     */
    const handleSearch = async (search) => {
        setSearchLoading(true);
        try {
            const result = await getProductsListService({ search, page: 1 });
            // await console.log('result', result.success.data)
            const list = await result.success.data.map((item) => ({
                value: item.id,
                label: renderOption(item)
            }));
            await setSearchLoading(false);
            await setProductList(list);
        } catch (error) {
            errorResponse(error, 'HANDLE_SEARCH');
            setSearchLoading(false);
            dispatch(getProductsListFailure(error));
        }
    };

    const handleOnClose = () => setDrawerToggle(false);
    const handleOnOpen = () => setDrawerToggle(true);

    const handleSearchDebounce = useRef(_.debounce((val) => handleSearch(val), 700)).current;
    const handleOnChange = (val) => {
        setSearchVal(val);
        handleSearchDebounce(val);
    };

    const onSelect = (value) => {
        router.push(`/shop/product-detail/[productId]`, `/shop/product-detail/${value}`);
        setSearchVal('');
        setProductList([]);
        setDrawerToggle(false);
    };

    const renderOption = (item) => {
        const items = [item];
        return (
            <List
                size="small"
                dataSource={items}
                itemLayout="horizontal"
                renderItem={(product) => (
                    <List.Item onClick={() => onSelect(product.slug)} key={product.slug}>
                        <List.Item.Meta
                            avatar={<Avatar src={product.image} shape="square" />}
                            title={
                                <Link
                                    href={`/shop/product-detail/[productId]`}
                                    as={`/shop/product-detail/${product.slug}`}>
                                    <a>{product.name}</a>
                                </Link>
                            }
                            description={
                                <div className="search-drawer-box ">
                                    <div className={'price-box'}>
                                        {product.discount == 0 ? (
                                            <span className="regular-price">
                                                {formatToCurrency(product.price)}
                                            </span>
                                        ) : (
                                            <Fragment>
                                                <span className="regular-price">
                                                    {formatToCurrency(product.price)}
                                                </span>
                                                <span className="old-price">
                                                    {formatToCurrency(product.regular_price)}
                                                </span>
                                                {!!product.discount && (
                                                    <span className="price-off">
                                                        {product.discount}% {langs.labels.off}
                                                    </span>
                                                )}
                                            </Fragment>
                                        )}
                                    </div>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        );
    };

    return (
        <Fragment>
            <Responsive.Mobile>
                <a className="header-search d-hide" onClick={handleOnOpen}>
                    <SearchOutlined />
                </a>
            </Responsive.Mobile>
            {!hideDesktopSearch && (
                <Responsive.Desktop>
                    <div className="global-search-wrapper">
                        <AutoComplete
                            dropdownMatchSelectWidth={252}
                            style={{ width: '100%' }}
                            options={productList}
                            onSelect={onSelect}
                            onSearch={handleOnChange}
                            value={searchVal}
                            onChange={handleOnChange}
                            dropdownClassName="search-list-box-desktop">
                            <Input.Search
                                placeholder={langs.labels.searchProduct}
                                enterButton
                                loading={searchLoading}
                                maxLength={40}
                                size="large"
                                suffix={
                                    <ButtonWraper
                                        className="search-btn"
                                        style={{ marginRight: -12 }}
                                        size="large"
                                        type="primary">
                                        {/* <Icon type="search" /> */}
                                        <SearchOutlined />
                                    </ButtonWraper>
                                }
                            />
                        </AutoComplete>
                    </div>
                </Responsive.Desktop>
            )}

            <Drawer
                title={langs.labels.searchProducts}
                placement="right"
                closable={true}
                width={'100%'}
                onClose={handleOnClose}
                visible={drawerToggle}
                footer={false}
                bodyStyle={{ padding: 5 }}
                className={'search-drawer-wrap'}>
                <Input.Search
                    placeholder={langs.labels.pleaseTypeKeyword}
                    maxLength={40}
                    // enterButton={<SearchOutlined style={{ fontSize: "20px" }} />}
                    addonAfter={<Dictaphone handleOnChange={handleOnChange} />}
                    value={searchVal}
                    size="large"
                    onSearch={handleOnChange}
                    onChange={(e) => handleOnChange(e.target.value)}
                />
                <List
                    itemLayout="horizontal"
                    dataSource={productList}
                    size="small"
                    loading={searchLoading}
                    renderItem={(item) => item.label}
                    className={'search-list-box'}
                />
            </Drawer>
        </Fragment>
    );
};

export default HeaderSearch;
