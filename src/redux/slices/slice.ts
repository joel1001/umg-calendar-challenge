// slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReminder, Month } from "./slice-interface";

const initialState: IReminder = {};

const remindersSlice = createSlice({
    name: "reminders",
    initialState,
    reducers: {
        setReminders: (state, action: PayloadAction<{ [key: number]: Month }>) => {
            return action.payload;
        }
    }
});

export const { setReminders } = remindersSlice.actions;
export default remindersSlice.reducer;
