import { useEffect, useState, useCallback, MouseEvent, ChangeEvent } from "react";
import ReminderIcon from '../../../assets/images/reminder-icon.png';
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
import { FaExternalLinkAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import { IReminder } from "../../../redux/slices/slice-interface";
import { setReminders } from "../../../redux/slices/slice";
import { UmgCalendarState } from "./umg-calendar-interface";
import "./umg-calendar.css";

const UMGCalendar = () => {
  const reminders = useSelector((state: any) => state.reminders);
  const dispatch = useDispatch();
    console.log('reminders', reminders)
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
    locationText: '',
    showEditModal: false
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
  }, [umgCalendarState.selectedYear, umgCalendarState.selectedMonth, reminders]);

  const handleYearClicked = useCallback((value: object) => {
    setUmgCalendarState((prevState) => ({
      ...prevState,
      ...value,
    }));
  }, [reminders]);

  const addDayEvent = useCallback((event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const target = event.currentTarget.childNodes[0];
    let dayNumber = target.textContent
    if (target.firstChild instanceof HTMLElement) {
      dayNumber = target.firstChild.textContent;
    }
    setUmgCalendarState((prevState) => ({
      ...prevState,
      dayNumber: dayNumber,
      displayDayReminderModal: true,
    }));
  }, []);

  const saveReminderTime = (time: any) => {
    const hours = time.$d.getHours();
    const minutes = time.$d.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    setUmgCalendarState((prevState) => ({
      ...prevState,
      saveReminderTime: formattedTime,
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

  const editReminder = (reminderIndex: number) => {
    // const selectedYear = umgCalendarState.selectedYear;
    //     const selectedMonth = umgCalendarState.selectedMonth;
    //     const dayNumber = umgCalendarState.dayNumber;
    //     const newState: IReminder = {
    //     ...reminders,
    //     [selectedYear]: {
    //         ...reminders[selectedYear],
    //         [selectedMonth]: {
    //             ...reminders[selectedYear]?.[selectedMonth],
    //             [reminderIndex]: [
    //                 ...(reminders[selectedYear]?.[selectedMonth]?.[reminderIndex] || []),
    //                 {
    //                     reminderTime: umgCalendarState.saveReminderTime,
    //                     reminderLocation: umgCalendarState.locationText,
    //                     reminderDescription: umgCalendarState.reminderText
    //                 }
    //             ]
    //         }
    //     }
    // };
  };
  

  const storeReminderAndData = () => {
    if (umgCalendarState.dayNumber) {
        closeModal();
        const selectedYear = umgCalendarState.selectedYear;
        const selectedMonth = umgCalendarState.selectedMonth;
        const dayNumber = umgCalendarState.dayNumber;

        const newState: IReminder = {
            ...reminders,
            [selectedYear]: {
                ...reminders[selectedYear],
                [selectedMonth]: {
                    ...reminders[selectedYear]?.[selectedMonth],
                    [dayNumber]: [
                        ...(reminders[selectedYear]?.[selectedMonth]?.[dayNumber] || []),
                        {
                            reminderTime: umgCalendarState.saveReminderTime,
                            reminderLocation: umgCalendarState.locationText,
                            reminderDescription: umgCalendarState.reminderText
                        }
                    ]
                }
            }
        };

        dispatch(setReminders(newState));
    }
};

  let dayCounter = 0;
  let tdelem;

  return (
    <div className="umg__calendar">
      <div className="calendar__header">
        <span className="material-symbols-outlined"></span>
        <img src={ReminderIcon} alt="Reminder Icon"/>
        <span>UMG Remider Calendar</span>
      </div>
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
                  }else{
                    dayCounter++;
                    tdelem = <td onClick={addDayEvent} key={`${weekIndex}-${dayIndex}`}>
                        {format(day, "d")}
                        { 
                            reminders[umgCalendarState.selectedYear] && reminders[umgCalendarState.selectedYear][umgCalendarState.selectedMonth] && reminders[umgCalendarState.selectedYear][umgCalendarState.selectedMonth][dayCounter] ?
                                <div className="umg__reminder__wrapper">
                                    {reminders[umgCalendarState.selectedYear][umgCalendarState.selectedMonth][dayCounter].map((reminder: any, idx: number)=>(
                                        <div className="umg__reminder__container">
                                            <div className="umg__remider">
                                                {reminder.reminderTime}<FaExternalLinkAlt/>
                                            </div>
                                            <div className="umg__reminder__details">
                                                <div className="umg__remider__location">
                                                    {reminder.reminderLocation}
                                                </div>
                                                <div>
                                                    {reminder.reminderDescription}
                                                </div>
                                                <div className="umg__details__icons">
                                                    <CiEdit onClick={() => editReminder(idx)}/>
                                                    <MdDelete/>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            :
                                null
                        }
                    </td> 
                    return tdelem;
                  }
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
          <Button onClick={storeReminderAndData}>Add Reminder</Button>
        </DialogActions>
      </Dialog>

      {/* <Dialog
        open={umgCalendarState.showEditModal}
        onClose={closeModal}
        maxWidth='xl'
      >
        <DialogTitle>{`Edit Reminder ${
          monthsNames[umgCalendarState.selectedMonth]
        } - ${umgCalendarState.dayNumber}`}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TimePicker
            ampm
            label="Select Time"
            value={umgCalendarState.saveReminderTime}
            onChange={() => {}}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
          <TextField
            margin="dense"
            label="Reminder Description"
            type="text"
            fullWidth
            value={umgCalendarState.reminderText}
            onChange={() => {}}
            inputProps={{ maxLength: 30 }}
          />
          <TextField
            margin="dense"
            label="Reminder Location"
            type="text"
            fullWidth
            value={umgCalendarState.locationText}
            onChange={(() => {})}
            inputProps={{ maxLength: 30 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {}}>Cancel</Button>
          <Button onClick={() => {}}>Add Reminder</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default UMGCalendar;
