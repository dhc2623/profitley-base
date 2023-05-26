import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { DatePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonWraper from '../../components/common/form/ButtonWrapper';
// import DayVisitMap from '../../components/plan/DayVisitMap';
import  withAppContext  from '../../config/withAppContext';
import { PlanContext } from '../../contexts/planContext';
import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import { importLoading } from '../../helper/Utils';
import { setVisitDate } from '../../store/plan/Action';
import { getVisitCalendarService } from '../../store/plan/Service';

const DocHead = dynamic(() => import('../../components/common/head'));
const PageTitle = dynamic(() => import('../../components/common/page-title'));
const DayVisitList = dynamic(() => import('../../components/plan/DayVisitList'), {
    loading: importLoading
});
const AddPlan = dynamic(() => import('../../components/plan/partial/AddPlan'), {
    loading: importLoading
});
const PlanAddCelebration = dynamic(() => import('../../components/plan/partial/PlanAddCelebration'));


const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const scrollLeft = (scrollRef) => {
    var wrapper = document.querySelector(".calander-list");
    var active = document.querySelector(".calander-list li.active");
    var activeWidth = active.offsetWidth / 2;
    var pos = active.offsetLeft + activeWidth;
    var elpos = wrapper.offsetLeft;
    var elW = wrapper.offsetWidth;
    pos = pos + elpos - elW / 2; // for center position if you want adjust then change this
    scrollRef.current.scrollTo({
        left: pos,
        behavior: 'smooth'
    })
}

const PlanHorizontalCalander = ({ date, userId }) => {
    const scrollRef = useRef();
    const dispatch = useDispatch();
    const [calendarDates, setCalendarDates] = useState([]);
    const context = useContext(PlanContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDate();
    }, [date]);

    useEffect(() => {
        context.planAddCount !== 0 && updateMonthData();
    }, [context.planAddCount]);

    useEffect(() => {
    }, [calendarDates]);

    const updateMonthData = async () => {
        await setLoading(true)
        const data = await getVisitCalendarService({
            userId,
            month: date.month() + 1,
            year: date.year()
        });
        const resetCalendarDates = calendarDates.map(item => ({ ...item, visitsCount: 0 }))
        const merged = await _.merge(_.keyBy(resetCalendarDates, 'planned_date'), _.keyBy(data, 'planned_date'));
        const values = await _.values(merged);
        await setCalendarDates(values);
        await setLoading(false)
    }

    const getDate = async () => {
        await setLoading(true)
        const data = await getVisitCalendarService({
            month: date.month() + 1,
            year: date.year()
        });
        const defaultMonthDays = await _.range(dayjs(date).daysInMonth());
        const defaultMonth = await defaultMonthDays.map(item => ({
            planned_date: dayjs(date).date(item + 1).format('YYYY-MM-DD'),
            visitsCount: 0,
            active: dayjs(date).date(item + 1).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')
        }))
        const merged = await _.merge(_.keyBy(defaultMonth, 'planned_date'), _.keyBy(data, 'planned_date'));
        const values = await _.values(merged);
        await !_.find(values, { 'active': true }) && _.set(values[0], 'active', true);
        await dispatch(setVisitDate(_.find(values, { 'active': true }).planned_date));
        await setCalendarDates(values);
        await setTimeout(function () { }, 500)
        await scrollLeft(scrollRef)
        await setLoading(false)

    }

    const handleSelectDate = async (selectedDate) => {
        let dates = calendarDates;
        const getOldIndex = await _.findIndex(dates, { 'active': true });
        await _.set(dates[getOldIndex], 'active', false);
        const getNewIndex = await _.findIndex(dates, { 'planned_date': selectedDate });
        await _.set(dates[getNewIndex], 'active', true);
        await setCalendarDates([...dates]);
        await dispatch(setVisitDate(selectedDate));
    };
    return <ul className="calander-list" ref={scrollRef}>{calendarDates.map(item => <li onClick={() => handleSelectDate(item.planned_date)} key={`date-${item.planned_date}`} className={`${item.active ? 'active' : ' '}`}><span className={'day'}>{days[dayjs(item.planned_date).get('day')]}</span><span className={`date`}>{dayjs(item.planned_date).get('date')}</span><span className="count">{item.visitsCount}</span></li>)}</ul>
}



const MyPlan = (props) => {
    
    const [visiblePopup, setPopupVisibility] = useState(false);
    const planDate = useSelector((state) => state.plan.visitDate);
    const [planDateMonth, setPlanDateMonth] = useState(dayjs());
    const [planAddCount, setPlanAddCount] = useState(0);

    const closePopup = () => {
        setPopupVisibility(false);
    };

    const handleChangeDashboardMonth = async (v) => {
        setPlanDateMonth(v);
    };

    return (
        <PlanContext.Provider value={{ planAddCount, setPlanAddCount }}>
            
            <DocHead pageTitle="My Plans" />
            <section className="wrap">
                <PageTitle title={'My Plans'} />
                <div className={'plan-header'}>
                    <div>
                        <div className="date-picker">
                            <DatePicker
                                onChange={handleChangeDashboardMonth}
                                picker="month"

                            />
                            <Typography.Title level={5}>
                                {dayjs(planDateMonth).format('MMMM YYYY')}
                            </Typography.Title>
                            <EditOutlined />
                        </div>
                    </div>
                    <div className={'action m-t5'} >
                        <ButtonWraper onClick={() => {
                            setPopupVisibility(true);
                        }}>
                            Add Plan
                        </ButtonWraper>
                    </div>
                </div>

                <PlanHorizontalCalander date={planDateMonth} userId={props.userMe.profile.id} />
                {/* <DayVisitMap /> */}
                <DayVisitList />
                <PlanAddCelebration />
            </section>
            {visiblePopup && (
                <AddPlan visible={visiblePopup} close={closePopup} planDate={planDate} />
            )}
        </PlanContext.Provider>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(MyPlan);
