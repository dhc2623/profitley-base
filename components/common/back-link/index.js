import { Typography } from 'antd';
import Link from 'next/link';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const BackLink = ({ onClick }, props) => {
    return (
        <div onClick={onClick}>
            <a className="header-back-link">
                <ArrowLeftOutlined />
            </a>
        </div>
    );
};
export default BackLink;
