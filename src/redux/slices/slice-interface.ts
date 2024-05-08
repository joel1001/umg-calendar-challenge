export interface IReminder {
    [key: number]: Month;
}

type Reminder = {
    reminderTime: string;
    reminderLocation: string;
    reminderDescription: string;
}

export type Month = {
    [key: number]: Day;
}

type Day = {
    [key: number]: Reminder[];
}