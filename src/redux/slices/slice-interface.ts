export interface IReminder {
    [key: number]: Month;
}

type Reminder = {
    reminderTime: string;
    reminderLocation: string;
}

export type Month = {
    [key: string]: Day;
}

type Day = {
    [key: number]: Reminder[];
}