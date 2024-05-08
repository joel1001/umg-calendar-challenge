export type UmgCalendarState = {
    selectedYear: number;
    selectedMonth: number;
    days: Date[];
    displayDayReminderModal: boolean;
    dayNumber: number | string | null;
    saveReminderTime: string;
    reminderText: string;
    locationText: string;
    showEditModal: boolean;
};