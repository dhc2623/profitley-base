import { Tag } from 'antd';
const StatusTag = ({ value, color, type, className }, props) => {
    return <Tag color={color} className={className}>{value}</Tag>;
};
export default StatusTag;
