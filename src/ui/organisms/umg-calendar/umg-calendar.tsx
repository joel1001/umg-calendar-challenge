import {
  useEffect,
  useState,
  useCallback,
  MouseEvent,
  ChangeEvent,
  MouseEventHandler,
} from "react";
import ReminderIcon from "../../../assets/images/reminder-icon.png";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
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
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";

import { IReminder } from "../../../redux/slices/slice-interface";
import {
  setReminders,
  editReminder,
  deleteReminder,
} from "../../../redux/slices/slice";
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
    reminderText: "",
    locationText: "",
    showEditModal: false,
    reminderDayIndexer: 0,
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
  }, [
    umgCalendarState.selectedYear,
    umgCalendarState.selectedMonth,
    reminders,
  ]);

  const handleYearClicked = useCallback(
    (value: object) => {
      setUmgCalendarState((prevState) => ({
        ...prevState,
        ...value,
      }));
    },
    [reminders]
  );

  const addDayEvent: MouseEventHandler<SVGElement> = useCallback((event) => {
    debugger
    const target = event.target as SVGElement;
    const tdParent = target.parentNode as HTMLElement;

    let dayNumber = "";

    if (tdParent && tdParent.childNodes[1].nodeValue) {
      dayNumber = tdParent.childNodes[1].nodeValue.trim();
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
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    setUmgCalendarState((prevState) => ({
      ...prevState,
      saveReminderTime: formattedTime,
    }));
  };

  const updateReminderDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setUmgCalendarState((prevState) => ({
      ...prevState,
      reminderText: event?.target.value,
    }));
  };

  const updateLocationDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setUmgCalendarState((prevState) => ({
      ...prevState,
      locationText: event?.target.value,
    }));
  };

  const closeModal = (value: object) => {
    setUmgCalendarState((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  const displayEditModal = (reminderIndex: number) => {
    setUmgCalendarState((prevState) => ({
      ...prevState,
      showEditModal: true,
      reminderDayIndexer: reminderIndex,
    }));
  };

  const editReminderAsync = () => {
    debugger
    setUmgCalendarState((prevState) => ({
      ...prevState,
      showEditModal: false,
    }));

    const remiderDetailsToUpdate = {
      reminderTime: umgCalendarState.saveReminderTime,
      reminderLocation: umgCalendarState.locationText,
      reminderDescription: umgCalendarState.reminderText,
    };
    dispatch(
      editReminder({
        year: umgCalendarState.selectedYear,
        month: umgCalendarState.selectedMonth,
        day:
          typeof umgCalendarState.dayNumber === "string"
            ? parseInt(umgCalendarState.dayNumber)
            : umgCalendarState.dayNumber,
        reminderIndex: umgCalendarState.reminderDayIndexer,
        reminderToUpdate: remiderDetailsToUpdate,
      })
    );
  };

  const deleteReminderFromTable = (idx: number) => {
    setUmgCalendarState((prevState) => ({
      ...prevState,
      displayDayReminderModal: false,
    }));
    const remiderDetailsToUpdate = {
      reminderTime: umgCalendarState.saveReminderTime,
      reminderLocation: umgCalendarState.locationText,
      reminderDescription: umgCalendarState.reminderText,
    };
    dispatch(
      deleteReminder({
        year: umgCalendarState.selectedYear,
        month: umgCalendarState.selectedMonth,
        day:
          typeof umgCalendarState.dayNumber === "string"
            ? parseInt(umgCalendarState.dayNumber)
            : umgCalendarState.dayNumber,
        reminderIndex: idx,
        reminderToUpdate: remiderDetailsToUpdate,
      })
    );
  };

  const storeReminderAndData = () => {
    if (umgCalendarState.dayNumber) {
      closeModal({ displayDayReminderModal: false });
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
                reminderDescription: umgCalendarState.reminderText,
              },
            ],
          },
        },
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
        <img src={ReminderIcon} alt="Reminder Icon" />
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
      <div className="umg__calendar__container">
        <div className="calendar__table">
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
                      } else {
                        dayCounter++;
                        tdelem = (
                          <td key={`${weekIndex}-${dayIndex}`}>
                            <CiCirclePlus className='umg__plus__icon' onClick={addDayEvent} />
                            {format(day, "d")}
                            {reminders[umgCalendarState.selectedYear] &&
                            reminders[umgCalendarState.selectedYear][
                              umgCalendarState.selectedMonth
                            ] &&
                            reminders[umgCalendarState.selectedYear][
                              umgCalendarState.selectedMonth
                            ][dayCounter] ? (
                              <div className="umg__reminder__wrapper">
                                {reminders[umgCalendarState.selectedYear][
                                  umgCalendarState.selectedMonth
                                ][dayCounter].map(
                                  (reminder: any, idx: number) => (
                                    <div className="umg__reminder__container">
                                      <div className="umg__remider">
                                        {reminder.reminderTime}
                                      </div>
                                      <div className="umg__details__icons">
                                        <CiEdit
                                          onClick={() => displayEditModal(idx)}
                                        />
                                        <MdDelete
                                          onClick={() =>
                                            deleteReminderFromTable(idx)
                                          }
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : null}
                          </td>
                        );
                        return tdelem;
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="caldendar__details">
          <div className="calendar__details_header">
            {reminders[umgCalendarState.selectedYear] &&
            reminders[umgCalendarState.selectedYear][
              umgCalendarState.selectedMonth
            ] &&
            reminders[umgCalendarState.selectedYear][
              umgCalendarState.selectedMonth
            ][umgCalendarState.dayNumber || 0] ? (
              <p>
                {umgCalendarState.dayNumber},{" "}
                {monthsNames[umgCalendarState.selectedMonth]},{" "}
                {umgCalendarState.selectedYear}
              </p>
            ) : (
              <p>There are no events planned for this day.</p>
            )}
          </div>
          {reminders[umgCalendarState.selectedYear] &&
          reminders[umgCalendarState.selectedYear][
            umgCalendarState.selectedMonth
          ] &&
          reminders[umgCalendarState.selectedYear][
            umgCalendarState.selectedMonth
          ][umgCalendarState.dayNumber || 0] ? (
            <VerticalTimeline layout={"1-column-left"}>
              {reminders[umgCalendarState.selectedYear][
                umgCalendarState.selectedMonth
              ][umgCalendarState.dayNumber || 0].map(
                (reminder: any, i: number) => (
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    iconStyle={{
                      background: "rgb(33, 150, 243)",
                      color: "#fff",
                    }}
                    icon={<img src={ReminderIcon} alt="myLogo" />}
                  >
                    <h3 className="vertical-timeline-element-title">
                      {reminder.reminderTime}
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                      {reminder.reminderDescription}
                    </h4>
                    <p>{reminder.reminderLocation}</p>
                  </VerticalTimelineElement>
                )
              )}
            </VerticalTimeline>
          ) : null}
        </div>
      </div>

      <Dialog
        open={umgCalendarState.displayDayReminderModal}
        onClose={() => closeModal({ displayDayReminderModal: false })}
        className="dialog__box"
        maxWidth="xl"
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
          <Button
            onClick={() => closeModal({ displayDayReminderModal: false })}
          >
            Cancel
          </Button>
          <Button onClick={storeReminderAndData}>Add Reminder</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={umgCalendarState.showEditModal}
        onClose={() => closeModal({ showEditModal: false })}
        maxWidth="xl"
      >
        <DialogTitle>{`Edit Reminder ${
          monthsNames[umgCalendarState.selectedMonth]
        } - ${umgCalendarState.dayNumber} reminder number ${
          umgCalendarState.reminderDayIndexer + 1
        }`}</DialogTitle>
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
          <Button
            onClick={() =>
              closeModal({
                showEditModal: false,
                displayDayReminderModal: false,
              })
            }
          >
            Cancel
          </Button>
          <Button onClick={editReminderAsync}>Edit Reminder</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UMGCalendar;
