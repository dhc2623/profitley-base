import { Fragment } from 'react';
import { Typography } from 'antd';
import dynamic from 'next/dynamic';
import { WhatsAppOutlined, FilePdfOutlined } from '@ant-design/icons';
import Panel, { PanelActions, PanelHidden, PanelRowItem, PanelSeparator, PanelTitle } from '../common/panel';
import { formatToCurrency, getDate, getStatusColor, printPDF, whatsAppURL } from '../../helper/Utils';
import { langs } from '../../localization';
const StatusTag = dynamic(() => import('../common/tag'));
const { Text } = Typography;

const InvoiceItem = (props) => {
    const { invoice, index } = props;

    return (
        <Fragment>
            <Panel className="invoice-mobile-list">
                <PanelTitle
                    title={
                        <Fragment>
                            <Text className="text-blue">{invoice.code}</Text>
                        </Fragment>
                    }
                    collapseKey={`${invoice.invoicable_id}--${index}`}
                    subTitle={getDate(invoice.invoice_date)}
                    headerRight={
                        <div className="invoice-action">
                            <StatusTag value={invoice.status} color={getStatusColor(invoice.status)} />
                        </div>
                    }
                />
                <PanelHidden collapseKey={`${invoice.invoicable_id}--${index}`}>
                    <PanelSeparator
                        list={[
                            {
                                label: `${langs.labels.invoiceAmount}`,
                                value: <Text type="success">{formatToCurrency(invoice.total)}</Text>
                            },
                            {
                                label: `${langs.labels.received}`,
                                value: <Text type="success">{formatToCurrency(invoice.received_amount)}</Text>
                            },
                            {
                                label: `${langs.labels.outstanding}`,
                                value: <Text type="danger">{formatToCurrency(parseFloat(invoice.total - invoice.received_amount))}</Text>
                            }
                        ]}
                    />
                    <PanelRowItem label={langs.labels.order} value={<strong>{invoice.order_number}</strong>} />
                    <PanelActions
                        actions={[{
                            render: () =>
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
                                    <Typography.Text
                                        // type={'danger'}
                                        strong
                                        className={'action-date'}>
                                        <WhatsAppOutlined
                                            className={'p-t0 p-r10'}
                                            style={{ fontSize: 18, color: '#32c971' }}
                                        />
                                        {langs.labels.whatsAppShare}
                                    </Typography.Text>
                                </a>
                        },
                        {
                            render: () =>
                                <a href={invoice.pdfUrl} target={'_blank'} className="pdf-download-icon">
                                    <Typography.Text
                                        // type={'danger'}
                                        strong
                                        className={'action-date'}><FilePdfOutlined
                                        className={'p-t0 p-r10'}
                                            style={{ fontSize: 18, color: '#ff8000' }}
                                        />  {langs.labels.downloadPdf}</Typography.Text>
                                </a>
                        }
                        ]}
                    ></PanelActions>
                </PanelHidden>
            </Panel>
        </Fragment>
    );
};
export default InvoiceItem;
