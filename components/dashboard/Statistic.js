import { Typography } from 'antd';
import { useEffect } from 'react';
import Panel, { PanelBody } from '../common/panel';
import { useRouter } from 'next/router';

const { Title, Text } = Typography;
const Statistic = ({
    icon = '/assets/images/svg/notebook-icon.svg',
    color = '#FEEEF1',
    value = 0,
    label = '',
    onclick = '',
    getQuery
}) => {
    useEffect(() => {}, []);
    const router = useRouter();
    const getPath = ()=>{
        router.push({
            pathname: onclick,
            query: getQuery,
        })
    }
    return (
        <a onClick={getPath} className={onclick ? '' : 'eventnone'}>
        <Panel className="db-statistic p-t15 p-r15 p-b15 p-l15" >
            <span className="icon" style={{ backgroundColor: color }}>
                <img src={icon} alt="" />
            </span>

            <Title level={4} strong className="m-b0 fs-18">
                {value}
            </Title>
            <Text className="label">{label}</Text>
        </Panel>
        </a>
    );
};
export default Statistic;