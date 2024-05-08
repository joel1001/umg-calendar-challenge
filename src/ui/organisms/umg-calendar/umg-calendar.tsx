import { useEffect, useState, useCallback, MouseEvent, ChangeEvent } from "react";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  isSameMonth,
} from "date-fns";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useSelector, useDispatch } from "react-redux";

import { setReminders } from "../../../redux/slices/slice";
import { UmgCalendarState } from "./umg-calendar-interface";
import "./umg-calendar.css";

const UMGCalendar = () => {
  const reminders = useSelector((state: any) => state.reminders);
  const dispatch = useDispatch();

  const monthsNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [umgCalendarState, setUmgCalendarState] = useState<UmgCalendarState>({
    selectedYear: currentYear,
    selectedMonth: currentMonth,
    days: [],
    displayDayReminderModal: false,
    dayNumber: 0,
    saveReminderTime: "",
    reminderText: '',
    locationText: ''
  });
  const years = Array.from({ length: 41 }, (_, index) => 2004 + index);

  useEffect(() => {
    const startDate = startOfWeek(
      startOfMonth(
        new Date(umgCalendarState.selectedYear, umgCalendarState.selectedMonth)
      )
    );
    const endDate = endOfWeek(
      endOfMonth(
        new Date(umgCalendarState.selectedYear, umgCalendarState.selectedMonth)
      )
    );
    const daysOfMonth = eachDayOfInterval({ start: startDate, end: endDate });

    setUmgCalendarState((prevState) => ({
      ...prevState,
      days: daysOfMonth,
    }));
  }, [umgCalendarState.selectedYear, umgCalendarState.selectedMonth]);

  const handleYearClicked = useCallback((value: object) => {
    setUmgCalendarState((prevState) => ({
      ...prevState,
      ...value,
    }));
  }, []);

  const addDayEvent = useCallback((event: MouseEvent<HTMLDivElement>) => {
    setUmgCalendarState((prevState) => ({
      ...prevState,
      dayNumber: event.currentTarget.textContent,
      displayDayReminderModal: true,
    }));
    // const dayValue: string | null = event.currentTarget.textContent;
    // console.log('dayValue', dayValue);
    // console.log('object', {
    //     [umgCalendarState.selectedYear]: {
    //         [umgCalendarState.selectedMonth]: {
    //             day: [{ reminderTime: '8:00 am', reminderLocation: 'San José, CR' }]
    //         }
    //     }
    // });
    // if(dayValue){
    //     dispatch(setReminders({
    //         [umgCalendarState.selectedYear]: {
    //             [umgCalendarState.selectedMonth]: {
    //                 [dayValue]: [{ reminderTime: '8:00 am', reminderLocation: 'San José, CR' }]
    //             }
    //         }
    //     }));
    // }
  }, []);

  const saveReminderTime = (time: any) => {
    setUmgCalendarState((prevState) => ({
      ...prevState,
      saveReminderTime: time,
    }));
  };

  const updateReminderDescription = (event: ChangeEvent<HTMLInputElement>) =>{
    setUmgCalendarState((prevState) => ({
        ...prevState,
        reminderText: event?.target.value,
      }));
  };

  const updateLocationDescription = (event: ChangeEvent<HTMLInputElement>) =>{
    setUmgCalendarState((prevState) => ({
        ...prevState,
        locationText: event?.target.value,
      }));
  };

  const closeModal = () => {
    setUmgCalendarState((prevState) => ({
      ...prevState,
      displayDayReminderModal: false,
    }));
  };

  return (
    <div className="umg__calendar">
      <FormControl className="umg__calendar__dropdowns">
        <InputLabel id="year__dropdown__label">Select Year:</InputLabel>
        <Select
          onChange={(e) =>
            handleYearClicked({ selectedYear: e.target.value as number })
          }
          className="umg__labels"
          labelId="year__dropdown__label"
          value={umgCalendarState.selectedYear}
        >
          {years.map((year, index) => (
            <MenuItem key={index} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>

        <InputLabel id="year__dropdown__label">Select Month:</InputLabel>
        <Select
          onChange={(e) =>
            handleYearClicked({ selectedMonth: e.target.value as number })
          }
          className="umg__labels"
          labelId="year__dropdown__label"
          value={umgCalendarState.selectedMonth}
        >
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
            if (
              !weekDays.some((day) =>
                isSameMonth(
                  day,
                  new Date(
                    umgCalendarState.selectedYear,
                    umgCalendarState.selectedMonth
                  )
                )
              )
            ) {
              return null;
            }
            return (
              <tr key={weekIndex}>
                {weekDays.map((day, dayIndex) => {
                  if (
                    !day ||
                    !isSameMonth(
                      day,
                      new Date(
                        umgCalendarState.selectedYear,
                        umgCalendarState.selectedMonth
                      )
                    )
                  ) {
                    return <td key={`${weekIndex}-${dayIndex}`}></td>;
                  }
                  return (
                    <td onClick={addDayEvent} key={`${weekIndex}-${dayIndex}`}>
                      {format(day, "d")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Dialog
        open={umgCalendarState.displayDayReminderModal}
        onClose={closeModal}
        maxWidth='xl'
      >
        <DialogTitle>{`Add reminder to ${
          monthsNames[umgCalendarState.selectedMonth]
        } - ${umgCalendarState.dayNumber}`}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TimePicker
            ampm
            label="Select Time"
            value={umgCalendarState.saveReminderTime}
            onChange={saveReminderTime}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
          <TextField
            margin="dense"
            label="Reminder Description"
            type="text"
            fullWidth
            value={umgCalendarState.reminderText}
            onChange={updateReminderDescription}
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            margin="dense"
            label="Reminder Location"
            type="text"
            fullWidth
            value={umgCalendarState.locationText}
            onChange={updateLocationDescription}
            inputProps={{ maxLength: 30 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={() => {}}>Add Reminder</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UMGCalendar;
