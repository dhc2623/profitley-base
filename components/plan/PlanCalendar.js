import { Drawer } from 'antd';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import { useDispatch } from 'react-redux';
import { getDate, importLoading } from '../../helper/Utils';
import { langs } from '../../localization';
import { setVisitDate } from '../../store/plan/Action';
import { getVisitCalendarService } from '../../store/plan/Service';
import './planCalendar.less';
const DayVisitList = dynamic(() => import('./DayVisitList'), {
    loading: importLoading
});

function PlanCalendar({ userId }) {
    const [date, setDate] = useState(new Date());
    const [month, setMonth] = useState([]);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const data = {
            activeStartDate: dayjs(),
            view: 'month'
        }
        handleMonthChange(data);
    }, []);

    //Get month data
    const handleMonthChange = async (data) => {
        if (data.view === 'month') {
            const monthData = await getVisitCalendarService({
                userId,
                month: dayjs(data.activeStartDate).month() + 1,
                year: dayjs(data.activeStartDate).year()
            });
            setMonth(monthData);
        }
    };

    //Set date
    const handleOnChange = (date) => {
        setDate(date);
        setVisible(true)
        dispatch(setVisitDate(dayjs(date).format('YYYY-MM-DD')));
    };

    // Set Calendar date box
    const setDateTile = (data) => {
        const date = month.filter(item => item.planned_date === dayjs(data.date).format('YYYY-MM-DD'))
        return (
            data.view === 'month' && (
                <div className="cal-tile">
                    {
                        date.length ?
                            <span
                                className={`vists-count date-status-${date[0].visitsCount}`}
                            >{date[0].visitsCount} {langs.labels.visits}</span>
                            : ''
                    }
                </div>
            )
        );
    };

    const getVisitsCount = (date) => {
        const visitMonth = month.filter(item => item.planned_date === dayjs(date).format('YYYY-MM-DD'))
        return visitMonth.length ? visitMonth[0].visitsCount : 0
    }

    return (
        <div>
            <Calendar
                onClickDay={handleOnChange}
                onActiveStartDateChange={handleMonthChange}
                value={date}
                tileContent={setDateTile}
            />
            <Drawer
                title={`${langs.labels.visitsCount} (${getVisitsCount(date)}) - ${getDate(date)}`}
                placement={'right'}
                closable={true}
                onClose={() => setVisible(false)}
                visible={visible}
                bodyStyle={{ padding: '0 0.5rem' }}
                width={'100%'}
            >
                <DayVisitList actions={false} userId={userId}/>
            </Drawer>
        </div>
    );
}

export default PlanCalendar;