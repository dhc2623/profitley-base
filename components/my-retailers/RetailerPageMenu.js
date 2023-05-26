import PageMenu from "../common/page-menu"
import { convertToSlug } from "../../helper/Utils"
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { langs } from "../../localization";
const RetailerPageMenu = (props) => {
    const {  hasAppSettings } = useContext(UserContext);
    return <PageMenu
        navItem={[
            {
                name: `${langs.labels.dashboard}`,
                slug: 'details',
                active: props.active == 'details',
                onClick: () =>
                    props.push(
                        '/my-retailers/retailer-detail/[retailerId]/[title]',
                        `/my-retailers/retailer-detail/${props.query.retailerId}/${convertToSlug(props.query.title)}`
                    )
            },
            {
                name: `${langs.labels.orders}`,
                slug: 'orders',
                active: props.active == 'orders',
                onClick: () =>
                    props.push(
                        '/my-retailers/retailer-orders/[retailerId]/[title]',
                        `/my-retailers/retailer-orders/${props.query.retailerId}/${convertToSlug(props.query.title)}`
                    )
            },
            {
                name: `${langs.labels.collection}`,
                slug: 'collection',
                active: props.active == 'collection',
                onClick: () =>
                    props.push(
                        '/my-retailers/retailer-payment/[retailerId]/[title]',
                        `/my-retailers/retailer-payment/${props.query.retailerId}/${convertToSlug(props.query.title)}`
                    )
            },
            {
                name: `${langs.labels.ledger}`,
                slug: 'ledger',
                active: props.active == 'ledger',
                hidden: !hasAppSettings('Integration', 'tally'),
                onClick: () =>
                    props.push(
                        '/my-retailers/retailer-ledger/[retailerId]/[title]',
                        `/my-retailers/retailer-ledger/${props.query.retailerId}/${convertToSlug(props.query.title)}`
                    )
            },
            {
                name: `${langs.labels.visits}`,
                slug: 'visits',
                active: props.active == 'visits',
                onClick: () =>
                    props.push(
                        '/my-retailers/retailer-visits/[retailerId]/[title]',
                        `/my-retailers/retailer-visits/${props.query.retailerId}/${convertToSlug(props.query.title)}`
                    )
            },
            {
                name: `${langs.labels.invoices}`,
                slug: 'invoices',
                active: props.active == 'invoices',
                hidden: !hasAppSettings('Integration', 'tally'),
                onClick: () =>
                    props.push(
                        '/my-retailers/retailer-invoices/[retailerId]/[title]',
                        `/my-retailers/retailer-invoices/${props.query.retailerId}/${convertToSlug(props.query.title)}`
                    )
            }
        ]}
    />
}
export default RetailerPageMenu;