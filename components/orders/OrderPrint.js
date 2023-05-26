import React, { Fragment } from 'react';
import { formatToCurrency, getDate, getSettings } from '../../helper/Utils';

const OrderPrint = ({ data }) => {
    console.log(data);
    let settings = getSettings();
    let generalSettings = settings.General;

    return (
        <div
            id="order_print_wrap"
            style={{ visibility: 'hidden', height: '0', width: 0, overflow: 'hidden' }}
        >
                <style dangerouslySetInnerHTML={{__html: `
                    @media print {
                        #order_print_wrap{
                            visibility: visible !important; height: auto !important; width: auto !important
                        }
                        body, html {margin: 0;font-family: "Roboto", sans-serif, "Helvetica Neue", Arial, "Noto Sans", sans-serif;font-size: 16px; font-weight: 400;line-height: 1.65;color: #526484;text-align: left; } 
                        *, *::before, *::after {box-sizing: border-box; } 
                        .right-title{
                            color: #FF0000;
                            font-size: 50px;
                        }
                        .print-wrap{width: 100%;max-width: 1366px;margin: 0 auto; } 
                        .font-weight-bold, .fw-bold {font-weight: 700 !important; } 
                        .text-left {text-align: left !important; } 
                        .text-center {text-align: center !important; } 
                        .text-right {text-align: right !important; } 
                        small, .small {font-size: 85%;font-weight: 400; } 
                        .fs-14px{font-size: 14px; } 
                        .card{box-shadow: none;position: relative;word-wrap: break-word;background-color: #fff;background-clip: border-box;border: none;border-radius: 4px; } 
                        .card-header{border-radius: 3px 3px 0 0;padding:10px 10px;background-color: #e5e9f2;-webkit-print-color-adjust: exact;  } 
                        .card-header .card-title{font-size: 16px;margin: 0;line-height: 18px; } 
                        .card-inner{padding: 10px; } 
                        .card-inner-two{padding: 10px 0 6px 0; clear: both;} 
                        table.main-table { page-break-after:auto } 
                        table.main-table tr    { page-break-inside:avoid; page-break-after:auto } 
                        table.main-table td    { page-break-inside:avoid; page-break-after:auto } 
                        table.main-table thead { display:table-header-group } 
                        table.main-table tfoot { display:table-footer-group } 
                        .table {width: 100%;margin-bottom: 0;color: #526484;border-collapse: collapse; } 
                        .table th{padding: 3px 5px 6px 5px;font-size: 14px;line-height: 18px;vertical-align: top;border-top: none;white-space: nowrap; } 
                        .table td{padding: 5px 5px;font-size: 14px;line-height: 18px;vertical-align: top;border-top: none;vertical-align: middle !important; } 
                        .table td:first-child, 
                        .table th:first-child {padding-left:10px; } 
                        .table td:last-child, 
                        .table th:last-child {padding-right:10px; } 
                    }
                `}} />
            <div className="print-wrap" >
                <table cellSpacing={0} cellPadding={0} width="100%" className="main-table">
                    <tbody>
                        <tr>
                            <td>
                                <table
                                    cellSpacing={0}
                                    cellPadding={0}
                                    width="100%"
                                    style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '50%', verticalAlign: 'top' }}>
                                                {/* <img src="{{url('images/logo-dark.png')}}" srcSet="{{url('images/logo-dark.png')}}" alt="" align="left" width={150} /> */}
                                                <img
                                                    src={generalSettings.mobile_logo.value}
                                                    width={150}
                                                    alt={`${generalSettings.site_name.value} Logo`}
                                                />
                                            </td>
                                            <td
                                                align="right"
                                                valign="top"
                                                style={{
                                                    width: '50%',
                                                    verticalAlign: 'top',
                                                    textAlign: 'right'
                                                }}
                                            >
                                                <h1 className="custom-h3" style={{ margin: 0, textAlign: 'right' }}>Order</h1>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table cellSpacing={0} cellPadding={0} width="100%">
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '60%', verticalAlign: 'top' }}>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div
                                                                    style={{
                                                                        margin: 0,
                                                                        fontSize: '14px'
                                                                    }}>
                                                                    <b>Buyer:</b>{' '}
                                                                    {data.shop_name}{' '}
                                                                    <span
                                                                        style={{
                                                                            color: '#A8A8A8'
                                                                        }}>
                                                                       ({data.username})
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div style={{ margin: 0 }}>
                                                                    <b>Shipping Address:</b>
                                                                    {`
                                                                        ${data.shipping['name']}, 
                                                                        ${data.shipping['address1']}, 
                                                                        ${data.shipping['address2'] != '' && data.shipping['address2'] +','}
                                                                        ${data.shipping['city']}, 
                                                                        ${data.shipping['city']}, 
                                                                        ${data.shipping['state']}, 
                                                                        ${data.shipping['pincode']}, 
                                                                        ${data.shipping['country']}
                                                                    `}
                                                                    
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <div style={{ margin: 0 }}>
                                                                    <b>Billing Address:</b>
                                                                    {`
                                                                        ${data.billing['name']}, 
                                                                        ${data.billing['address1']}, 
                                                                        ${data.billing['address2'] != '' && data.billing['address2'] +','}
                                                                        ${data.billing['city']}, 
                                                                        ${data.billing['city']}, 
                                                                        ${data.billing['state']}, 
                                                                        ${data.billing['pincode']}, 
                                                                        ${data.billing['country']}
                                                                    `}
                                                                    
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td
                                                align="right"
                                                valign="top"
                                                style={{
                                                    width: '40%',
                                                    verticalAlign: 'top',
                                                    textAlign: 'right'
                                                }}>
                                                <div style={{ margin: 0, textAlign: 'right', background:'red' }}>
                                                    <b>Order Number: </b> {data.order_number}
                                                </div>
                                                <div style={{ margin: 0, textAlign: 'right', background:'red' }}>
                                                    <b>Order Date: </b> {getDate(data.created_at)}
                                                </div>
                                                <div style={{ margin: 0, textAlign: 'right', background:'red' }}>
                                                    <b>Order Amount: </b>{' '}
                                                    <em className="icon ni ni-sign-inr" />{' '}
                                                    {formatToCurrency(data.amount)}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div
                                    className="card"
                                    style={{
                                        marginTop: '14px',
                                        marginBottom: '16px',
                                        clear: 'both',
                                        width:'100%'
                                    }}>
                                    <div className="card-header">
                                        <h6 className="card-title">Item Details:</h6>
                                    </div>
                                    <div className="card-inner-two">
                                        <div className="order-table" style={{ clear: 'both' }}>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            style={{
                                                                borderBottom: '1px solid #dbdfea'
                                                            }}
                                                            className="text-left">
                                                            SKU
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            style={{
                                                                borderBottom: '1px solid #dbdfea'
                                                            }}
                                                            className="text-left">
                                                            Product Name
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            style={{
                                                                borderBottom: '1px solid #dbdfea'
                                                            }}
                                                            className="text-right">
                                                            Price
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            style={{
                                                                borderBottom: '1px solid #dbdfea'
                                                            }}
                                                            className="text-center">
                                                            Qty
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            style={{
                                                                borderBottom: '1px solid #dbdfea'
                                                            }}
                                                            className="text-right">
                                                            Sub Total
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.items.map((item) => (
                                                        <tr>
                                                            <td
                                                                style={{
                                                                    borderBottom:
                                                                        '1px solid #dbdfea',
                                                                    paddingLeft: '10px'
                                                                }}>
                                                                {item['sku_code']}
                                                            </td>
                                                            <td
                                                                style={{
                                                                    borderBottom:
                                                                        '1px solid #dbdfea'
                                                                }}>
                                                                {item['name']}

                                                                <br />
                                                                <span style={{ color: '#A8A8A8' }}>
                                                                    ({item['part_number']})
                                                                </span>
                                                            </td>
                                                            <td
                                                                className="text-right"
                                                                style={{
                                                                    borderBottom:
                                                                        '1px solid #dbdfea'
                                                                }}>
                                                                <em className="icon ni ni-sign-inr" />

                                                                {formatToCurrency(item['amount'])}
                                                            </td>
                                                            <td
                                                                className="text-center"
                                                                style={{
                                                                    borderBottom:
                                                                        '1px solid #dbdfea'
                                                                }}>
                                                                {item['quantity']}
                                                            </td>
                                                            <td
                                                                className="text-right"
                                                                style={{
                                                                    borderBottom:
                                                                        '1px solid #dbdfea'
                                                                }}>
                                                                <em className="icon ni ni-sign-inr" />

                                                                {formatToCurrency(
                                                                    item['amount'] *
                                                                        item['quantity']
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="total-table" style={{ clear: 'both' }}>
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                className="fw-bold text-right"
                                                                width="75%">
                                                                <span>Sub Total</span>
                                                            </td>
                                                            <td className="text-right" width="25%">
                                                                <span>
                                                                    <em className="icon ni ni-sign-inr" />
                                                                    {formatToCurrency(
                                                                        data.sub_total
                                                                    )}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="fw-bold text-right">
                                                                <span>CGST</span>
                                                            </td>
                                                            <td className="text-right">
                                                                <span>
                                                                    <em className="icon ni ni-sign-inr" />{' '}
                                                                    0
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="fw-bold text-right">
                                                                <span>SGST</span>
                                                            </td>
                                                            <td className="text-right">
                                                                <span>
                                                                    <em className="icon ni ni-sign-inr" />{' '}
                                                                    0
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="fw-bold text-right">
                                                                <span>IGST</span>
                                                            </td>
                                                            <td className="text-right">
                                                                <span>
                                                                    <em className="icon ni ni-sign-inr" />{' '}
                                                                    0
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        {data.special_discount !== '0.00' && (
                                                        <tr>
                                                            <td className="fs-14px fw-bold text-right">
                                                                <span>Special Discount</span>
                                                            </td>
                                                            <td className="fs-14px text-right">
                                                                <span>
                                                                    -
                                                                    <em className="icon ni ni-sign-inr" />
                                                                    <span id="special_discount">
                                                                        {data.special_discount}
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        )}
                                                        {data.special_discount !== '0.00' && (
                                                        <tr>
                                                            <td className="fs-14px fw-bold text-right">
                                                                <span>Order Value Discount</span>
                                                            </td>
                                                            <td className="fs-14px text-right">
                                                                <span>
                                                                    -
                                                                    <em className="icon ni ni-sign-inr" />
                                                                    <span id="order_value_discount">
                                                                        {data.order_value_discount}
                                                                    </span>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        )}
                                                        <tr style={{ borderBottom: 'none' }}>
                                                            <td className="text-right fs-16px fw-bold">
                                                                Grand Total <br />{' '}
                                                                <small>(inclusive of taxes)</small>
                                                            </td>
                                                            <td className="text-right fw-bold fs-16px text-primary">
                                                                <em className="icon ni ni-sign-inr" />{' '}
                                                                {formatToCurrency(data.amount)}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {data.notes &&
                        <tr>
                            <td>
                                <div className="card">
                                    <div className="card-header">
                                        <h6 className="card-title">Notes:</h6>
                                    </div>
                                    <div className="card-inner">
                                        <p style={{ margin: 0 }}>{data.notes}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default OrderPrint;
