import {MouseEventHandler, MouseEvent} from "react";
import { UmgCalendarState } from "../umg-calendar/umg-calendar-interface";
import { IReminder } from "../../../redux/slices/slice-interface";

export type UmgCalendarTableState = {
    umgCalendarState: UmgCalendarState;
    addDayEvent: MouseEventHandler<SVGElement>;
    reminders: IReminder,
    displayEditModal: (e: MouseEvent<SVGElement>, idx: number) => void;
    deleteReminderFromTable: (e: MouseEvent<SVGElement>, idx: number) => void;
};