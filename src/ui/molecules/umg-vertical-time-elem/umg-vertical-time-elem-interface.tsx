import { ReactElement } from "react";
import { IReminder } from "../../../redux/slices/slice-interface";
import { UmgCalendarState } from "../../organisms/umg-calendar/umg-calendar-interface";

export interface VerticalTimeProps {
    reminders: IReminder;
    umgCalendarState: UmgCalendarState;
    icon: ReactElement;
}