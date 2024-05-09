export type UmgCalendarState = {
    selectedYear: number;
    selectedMonth: number;
    days: Date[];
    displayDayReminderModal: boolean;
    dayNumber: number;
    saveReminderTimeDatePicker: string;
    reminderText: string;
    locationText: string;
    showEditModal: boolean;
    reminderDayIndexer: number;
    elementToIndexertoEdit: number
};