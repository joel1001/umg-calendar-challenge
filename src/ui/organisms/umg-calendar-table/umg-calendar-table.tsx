import { FC } from "react";
import { format, isSameMonth, isSaturday, isSunday, startOfMonth, endOfMonth, addDays, getDay } from "date-fns";
import { CiCirclePlus } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import { UmgCalendarTableState } from "./umg-calendar-table-interface";
import './umg-calendar-table.css';

const CalendarTable: FC<UmgCalendarTableState> = ({
  umgCalendarState,
  addDayEvent,
  reminders,
  displayEditModal,
  deleteReminderFromTable
}) => {
  let dayCounter: number = 0;
  let tdelem;
  const daysNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const firstDayOfMonth = startOfMonth(new Date(umgCalendarState.selectedYear, umgCalendarState.selectedMonth));
  const lastDayOfMonth = endOfMonth(new Date(umgCalendarState.selectedYear, umgCalendarState.selectedMonth));

  const daysBeforeMonth = getDay(firstDayOfMonth);
  const daysAfterMonth = 6 - getDay(lastDayOfMonth);

  const totalDaysToShow = daysBeforeMonth + lastDayOfMonth.getDate() + daysAfterMonth;

  return (
    <table>
      <thead>
        <tr>
          {daysNames.map((day, idx) => (
            <th key={idx}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(Math.ceil(totalDaysToShow / 7))].map((_, weekIndex) => {
          const startIdx = weekIndex * 7;
          const endIdx = startIdx + 7;
          const weekDays = [];
          
          for (let i = startIdx; i < endIdx; i++) {
            let day;
            if (i < daysBeforeMonth) {
              day = addDays(firstDayOfMonth, i - daysBeforeMonth);
            } else if (i >= daysBeforeMonth && i < daysBeforeMonth + lastDayOfMonth.getDate()) {
              day = addDays(firstDayOfMonth, i - daysBeforeMonth);
            } else {
              day = addDays(lastDayOfMonth, i - (daysBeforeMonth + lastDayOfMonth.getDate() - 1));
            }
            weekDays.push(day);
          }

          return (
            <tr key={weekIndex}>
              {weekDays.map((day, dayIndex) => {
                const isWeekend = isSaturday(day) || isSunday(day);
                const backgroundColor = isWeekend ? "#f0f0f0" : "inherit";
                const fontColor = isWeekend ? "#333" : "inherit";
                if (
                  !day ||
                  (!isSameMonth(day, firstDayOfMonth) && !isSameMonth(day, lastDayOfMonth))
                ) {
                  return <td key={`${weekIndex}-${dayIndex}`} style={{ opacity: 0.5, backgroundColor, color: fontColor }}>{format(day, "d")}</td>;
                } else {
                  dayCounter++;
                  tdelem = (
                    <td
                      key={`${weekIndex}-${dayIndex}`}
                      style={{ backgroundColor, color: fontColor }}
                    >
                      <CiCirclePlus
                        className="umg__plus__icon"
                        onClick={addDayEvent}
                      />
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
                          ][dayCounter].map((reminder: any, idx: number) => (
                            <div className="umg__reminder__container" key={idx}>
                              <div className="umg__remider">
                                {reminder.reminderTime}
                              </div>
                              <div className="umg__details__icons">
                                <CiEdit onClick={(e) => displayEditModal(e, idx)} />
                                <MdDelete
                                  onClick={(e) => deleteReminderFromTable(e, idx)}
                                />
                              </div>
                            </div>
                          ))}
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
  );
};

export default CalendarTable;
