import {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  MouseEventHandler,
  MouseEvent
} from "react";
import ReminderIcon from "../../../assets/images/reminder-icon.png";
import "react-vertical-timeline-component/style.min.css";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { useSelector, useDispatch } from "react-redux";

import { IReminder } from "../../../redux/slices/slice-interface";
import {
  setReminders,
  editReminder,
  deleteReminder,
} from "../../../redux/slices/slice";
import { UmgCalendarState } from "./umg-calendar-interface";
import "./umg-calendar.css";
import CalendarTable from "../umg-calendar-table/umg-calendar-table";
import VerticalTime from "../../molecules/umg-vertical-time-elem/umg-vertical-time-elem";
import ReminderCard from "../umg-reminder-card/umg-reminder-card";
import UmgFormControl from "../umg-form-control/umg-form-control";

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
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [umgCalendarState, setUmgCalendarState] = useState<UmgCalendarState>({
    selectedYear: currentYear,
    selectedMonth: currentMonth,
    days: [],
    displayDayReminderModal: false,
    dayNumber: 0,
    saveReminderTimeDatePicker: "",
    reminderText: "",
    locationText: "",
    showEditModal: false,
    reminderDayIndexer: 0,
    elementToIndexertoEdit: 0
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
    umgCalendarState.dayNumber,
    reminders,
  ]);

  const handleMonthClicked = useCallback(
    (selectedMonth: number) => {
      setUmgCalendarState((prevState) => ({
        ...prevState,
        selectedMonth,
      }));
    },
    [reminders]
  );

  const handleYearClicked = useCallback(
    (selectedYear: number) => {
      setUmgCalendarState((prevState) => ({
        ...prevState,
        selectedYear,
      }));
    },
    [reminders]
  );
  const addDayEvent: MouseEventHandler<SVGElement> = useCallback((event) => {
    const target = event.target as SVGElement;
    const tdParent = target.parentNode as HTMLElement;

    let dayNumber = "";

    if (tdParent && tdParent.childNodes[1].nodeValue) {
      dayNumber = tdParent.childNodes[1].nodeValue.trim();
    }

    setUmgCalendarState((prevState) => ({
      ...prevState,
      dayNumber: parseInt(dayNumber),
      displayDayReminderModal: true,
    }));
  }, []);

  const saveReminderTime = (time: any) => {
    const hours = time.$d.getHours();
    const minutes = time.$d.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    setUmgCalendarState((prevState) => ({
      ...prevState,
      saveReminderTimeDatePicker: formattedTime,
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

  const displayEditModal = (e: MouseEvent<SVGElement>, reminderIndex: number) => {
    const target = e.target as SVGElement;
    const tdParent = target.parentNode as HTMLElement;
    const daySelectedToShare = tdParent?.parentNode?.parentNode?.parentNode?.childNodes[1]?.nodeValue
    if(daySelectedToShare){
      setUmgCalendarState((prevState) => ({
        ...prevState,
        showEditModal: true,
        reminderDayIndexer: reminderIndex,
        elementToIndexertoEdit: parseInt(daySelectedToShare)
      }));
    }
  };

  const editReminderAsync: MouseEventHandler<HTMLButtonElement> = (e) => {
    setUmgCalendarState((prevState) => ({
      ...prevState,
      showEditModal: false,
    }));

    const remiderDetailsToUpdate = {
      reminderTime: umgCalendarState.saveReminderTimeDatePicker,
      reminderLocation: umgCalendarState.locationText,
      reminderDescription: umgCalendarState.reminderText,
    };
      dispatch(
        editReminder({
          year: umgCalendarState.selectedYear,
          month: umgCalendarState.selectedMonth,
          day: umgCalendarState.elementToIndexertoEdit,
          reminderIndex: umgCalendarState.reminderDayIndexer,
          reminderToUpdate: remiderDetailsToUpdate,
        })
      );
  };

  const deleteReminderFromTable = (event: MouseEvent<SVGElement>, idx: number) => {
    const target = event.target as SVGElement;
    const tdParent = target.parentNode as HTMLElement;
    const dayToDeleteReminder = tdParent?.parentNode?.parentNode?.parentNode?.parentNode?.childNodes[1]?.nodeValue;
    
    if (dayToDeleteReminder) {
        const reminderDetailsToUpdate = {
        reminderTime: umgCalendarState.saveReminderTimeDatePicker,
        reminderLocation: umgCalendarState.locationText,
        reminderDescription: umgCalendarState.reminderText,
      };
  
      dispatch(
        deleteReminder({
          year: umgCalendarState.selectedYear,
          month: umgCalendarState.selectedMonth,
          day: parseInt(dayToDeleteReminder),
          reminderIndex: idx,
          reminderToUpdate: reminderDetailsToUpdate,
        })
      );
    }
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
                reminderTime: umgCalendarState.saveReminderTimeDatePicker,
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

  return (
    <div className="umg__calendar">
      <div className="calendar__header">
        <span className="material-symbols-outlined"></span>
        <img src={ReminderIcon} alt="Reminder Icon" />
        <span>UMG Remider Calendar</span>
      </div>
      <div className="form-control-container">
        <UmgFormControl
            handleClick={handleYearClicked}
            inputTitle='Select Year:'
            dropdownData={years}
            defaultValue={umgCalendarState.selectedYear}
            returnItem
        />
        <UmgFormControl
            handleClick={handleMonthClicked}
            inputTitle='Select Month:'
            dropdownData={monthsNames}
            defaultValue={umgCalendarState.selectedMonth}
            returnItem={false}
        />
      </div>
      <div className="umg__calendar__container">
        <div className="calendar__table">
            <CalendarTable
                umgCalendarState={umgCalendarState}
                addDayEvent={addDayEvent}
                reminders={reminders}
                displayEditModal={displayEditModal}
                deleteReminderFromTable={deleteReminderFromTable}
            />
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
            <VerticalTime
                reminders={reminders}
                umgCalendarState={umgCalendarState}
                icon={<img src={ReminderIcon} alt="myLogo" />}
            />    
          ) : null}
        </div>
      </div>

      <ReminderCard
         umgCalendarState={umgCalendarState}
         closeModal={closeModal}
         saveReminderTime={saveReminderTime}
         updateReminderDescription={updateReminderDescription}
         updateLocationDescription={updateLocationDescription}
         storeReminderAndData={storeReminderAndData}
         reminderCardDialogs={{title: `Add reminder to ${
            monthsNames[umgCalendarState.selectedMonth]
          } - ${umgCalendarState.dayNumber}`, primaryButton: 'Cancel', secondaryButton: 'Add Reminder'}}
          open={umgCalendarState.displayDayReminderModal}
          dialogToClose={{displayDayReminderModal: false}}
      />
        <ReminderCard
            umgCalendarState={umgCalendarState}
            closeModal={closeModal}
            saveReminderTime={saveReminderTime}
            updateReminderDescription={updateReminderDescription}
            updateLocationDescription={updateLocationDescription}
            storeReminderAndData={editReminderAsync}
            reminderCardDialogs={{title: `Edit Reminder ${
                monthsNames[umgCalendarState.selectedMonth]
              } - ${umgCalendarState.dayNumber} reminder number ${
                umgCalendarState.reminderDayIndexer + 1
              }`, primaryButton: 'Cancel', secondaryButton: 'Edit Reminder'}}
              open={umgCalendarState.showEditModal}
            dialogToClose={{showEditModal: false}}
        />
    </div>
  );
};

export default UMGCalendar;
