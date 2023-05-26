import { Typography } from 'antd';
import { langs } from '../../../localization';
const PageTitle = ({ title, itemCount, action = false }) => {
    return (
        <div className="mobile-page-title">
            <Typography.Title level={2}>
                {title} {itemCount ? `(${itemCount} ${langs.labels.items})` : ''}
            </Typography.Title>
            {action && <div className={'title-action'}>{action}</div>}
        </div>
    );
};
export default PageTitle;
