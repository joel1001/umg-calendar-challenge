import { ChangeEvent } from "react";
import { UmgCalendarState } from "../umg-calendar/umg-calendar-interface";

export interface ReminderCardProps {
    umgCalendarState: UmgCalendarState;
    closeModal: (e: object) => void;
    saveReminderTime: (e: any) => void;
    updateReminderDescription: (event: ChangeEvent<HTMLInputElement>) => void;
    updateLocationDescription: (event: ChangeEvent<HTMLInputElement>) => void;
    storeReminderAndData: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    reminderCardDialogs: ReminderCardDialogs;
    dialogToClose: object;
    open: boolean;
}

type ReminderCardDialogs = {
    title: string;
    primaryButton: string;
    secondaryButton: string;
}