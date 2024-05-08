import { useEffect, useState, useCallback, MouseEvent } from 'react';
import { eachDayOfInterval, startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, isSameMonth } from 'date-fns';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

import { UmgCalendarState } from './umg-calendar-interface';

import './umg-calendar.css';

const UMGCalendar = () => {

    const monthsNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'];
    const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const [umgCalendarState, setUmgCalendarState] = useState<UmgCalendarState>({
        selectedYear: currentYear,
        selectedMonth: currentMonth,
        days: []
    });
    const years = Array.from({ length: 41 }, (_, index) => 2004 + index);

    useEffect(() => {
        const startDate = startOfWeek(startOfMonth(new Date(umgCalendarState.selectedYear, umgCalendarState.selectedMonth)));
        const endDate = endOfWeek(endOfMonth(new Date(umgCalendarState.selectedYear, umgCalendarState.selectedMonth)));
        const daysOfMonth = eachDayOfInterval({ start: startDate, end: endDate });

        setUmgCalendarState(prevState => ({
            ...prevState,
            days: daysOfMonth
        }));
    }, [umgCalendarState.selectedYear, umgCalendarState.selectedMonth]);

    const handleYearClicked = useCallback((event: SelectChangeEvent<number>) => {
        const selectedYear = event.target.value as number;
        setUmgCalendarState(prevState => ({
            ...prevState,
            selectedYear: selectedYear
        }));
    }, []);

    const handleMonthClicked = useCallback((event: SelectChangeEvent<number>) => {
        const selecteMonth = event.target.value as number;
        setUmgCalendarState(prevState => ({
            ...prevState,
            selectedMonth: selecteMonth
        }));
    }, []);

    return (
        <div className="umg__calendar">
            <FormControl className='umg__calendar__dropdowns'>
                <InputLabel id="year__dropdown__label">Select Year:</InputLabel>
                <Select onChange={handleYearClicked} className='umg__labels' labelId="year__dropdown__label" value={umgCalendarState.selectedYear}>
                    {years.map((year, index) => (
                        <MenuItem key={index} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>

                <InputLabel id="year__dropdown__label">Select Month:</InputLabel>
                <Select onChange={handleMonthClicked} className='umg__labels' labelId="year__dropdown__label" value={umgCalendarState.selectedMonth}>
                    {monthsNames.map((month, index) => (
                        <MenuItem key={index} value={index}>
                            {month}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <table>
                <thead>
                    <tr>
                        {daysNames.map((day, idx) => (
                            <th key={idx}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(6)].map((_, weekIndex) => {
                        const startIdx = weekIndex * 7;
                        const endIdx = startIdx + 7;
                        const weekDays = umgCalendarState.days.slice(startIdx, endIdx);
                        if (!weekDays.some(day => isSameMonth(day, new Date(umgCalendarState.selectedYear, umgCalendarState.selectedMonth)))) {
                            return null;
                        }
                        return (
                            <tr key={weekIndex}>
                                {weekDays.map((day, dayIndex) => {
                                    if (!day || !isSameMonth(day, new Date(umgCalendarState.selectedYear, umgCalendarState.selectedMonth))) {
                                        return <td key={`${weekIndex}-${dayIndex}`}></td>;
                                    }
                                    return (
                                        <td key={`${weekIndex}-${dayIndex}`}>{format(day, 'd')}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UMGCalendar;
