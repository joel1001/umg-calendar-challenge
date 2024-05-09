import { FC } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { ReminderCardProps } from './umg-reminder-card-interface';
import './umg-reminder-card.css'
;
const ReminderCard: FC<ReminderCardProps> = ({
  umgCalendarState,
  closeModal,
  saveReminderTime,
  updateReminderDescription,
  updateLocationDescription,
  storeReminderAndData,
  reminderCardDialogs,
  dialogToClose,
  open
}) => {
  const monthsNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const timeParts = umgCalendarState.saveReminderTimeDatePicker.split(":");
  const reminderTime = new Date();
  reminderTime.setHours(parseInt(timeParts[0], 10));
  reminderTime.setMinutes(parseInt(timeParts[1], 10));
  return (
    <Dialog
      open={open}
      onClose={() => closeModal(dialogToClose)}
      className="dialog__box"
      maxWidth="xl"
    >
      <DialogTitle>{reminderCardDialogs.title}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TimePicker
          ampm
          label="Select Time"
          value={reminderTime}
          onChange={saveReminderTime}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
        <TextField
          margin="dense"
          label="Reminder Description"
          type="text"
          fullWidth
          value={umgCalendarState.reminderText}
          onChange={updateReminderDescription}
          inputProps={{ maxLength: 30 }}
        />
        <TextField
          margin="dense"
          label="Reminder Location"
          type="text"
          fullWidth
          value={umgCalendarState.locationText}
          onChange={updateLocationDescription}
          inputProps={{ maxLength: 30 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeModal(dialogToClose)}>
          {reminderCardDialogs.primaryButton}
        </Button>
        <Button onClick={(e) => storeReminderAndData(e)}>{reminderCardDialogs.secondaryButton}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default ReminderCard;
