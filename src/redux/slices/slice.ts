import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReminder, Reminder } from "./slice-interface";

const initialState: IReminder = {};

const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    setReminders: (state, action: PayloadAction<IReminder>) => {
      return action.payload;
    },
    editReminder: (
      state,
      action: PayloadAction<{
        year: number;
        month: number;
        day: number | string | null;
        reminderIndex: number;
        reminderToUpdate: Reminder;
      }>
    ) => {
      const { year, month, day, reminderIndex, reminderToUpdate } =
        action.payload;
        if(typeof day === 'number'){
            const remindersArray = state[year][month][day];
            remindersArray[reminderIndex] = reminderToUpdate;
        }
    },
    deleteReminder:(
        state,
        action: PayloadAction<{
          year: number;
          month: number;
          day: number | string | null;
          reminderIndex: number;
          reminderToUpdate: Reminder;
        }>
      ) => {
        const { year, month, day, reminderIndex, reminderToUpdate } =
          action.payload;
          if(typeof day === 'number'){
              const remindersArray = state[year][month][day];
              remindersArray.splice(reminderIndex, 1)
          }
      },
  },
});

export const { setReminders, editReminder, deleteReminder } = remindersSlice.actions;
export default remindersSlice.reducer;
