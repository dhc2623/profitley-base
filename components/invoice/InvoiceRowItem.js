import { Fragment } from 'react';
import { Typography } from 'antd';
import dynamic from 'next/dynamic';
import { WhatsAppOutlined, FilePdfOutlined } from '@ant-design/icons';
import { formatToCurrency, getDate, getStatusColor, whatsAppURL, getConfirmPromise, getDataInCookies, printPDF } from '../../helper/Utils';
import { langs } from '../../localization';
const StatusTag = dynamic(() => import('../common/tag'));
const { Text } = Typography;

const InvoiceRowItem = (props) => {
    const { invoice } = props; 

    return (
        <Fragment>
            <tr>
                <td>
                    <Text className="text-blue">{invoice.code}</Text>
                </td>
                <td>
                    <Text className="text-blue">{invoice.order_number}</Text>
                </td>
                <td className="align-right">
                    <Text type="success">{formatToCurrency(invoice.total)}</Text>
                </td>
                <td className="align-center">
                    <StatusTag value={invoice.status} color={getStatusColor(invoice.status)} />
                </td>
                <td>{getDate(invoice.invoice_date)}</td>
                <td className="align-right">
                    <div className="invoice-action">
                        <a
                            href={whatsAppURL(
                                invoice.user_mobile,
                                `*${langs.labels.invoiceDetails}* 
                            %0a ${langs.labels.invoiceNumber}: ${invoice.code}
                            %0a ${langs.labels.invoiceDate}: ${getDate(invoice.invoice_date)}
                            %0a ${langs.labels.orderNumber}: ${invoice.order_number} 
                            %0a ${langs.labels.invoiceAmount}: ${formatToCurrency(invoice.total)}
                            %0a ${langs.labels.status}: ${invoice.status}  
                            %0a ${langs.labels.received}: ${invoice.received_amount}  
                            %0a ${langs.labels.outstanding}: ${formatToCurrency(parseFloat(invoice.total - invoice.received_amount))}  
                            `
                            )}>
                            <WhatsAppOutlined
                                className={'m-l10 p-t0'}
                                style={{ fontSize: 24, color: '#32c971' }}
                            />
                        </a>
                        <a  className="pdf-download-icon" href={invoice.pdfUrl} target={'_blank'} >
                            <FilePdfOutlined />
                        </a>
                    </div>
                </td>
            </tr>
        </Fragment>
    );
};
export default InvoiceRowItem;
