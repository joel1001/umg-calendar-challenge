export interface IReminder {
    [key: number]: Month;
}

export type Reminder = {
    reminderTime: string;
    reminderLocation: string;
    reminderDescription: string;
}

export type Month = {
    [key: number]: Day;
}

export type Day = {
    [key: number]: Reminder[];
}