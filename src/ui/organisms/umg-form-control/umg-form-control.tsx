import {
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from "@mui/material";
import { FC } from "react";
import './umg-form-control.css';
import { UmgFormControlProps } from "./umg-form-control-interface";

const UmgFormControl: FC<UmgFormControlProps> = ({ handleClick, inputTitle, dropdownData, defaultValue, returnItem }) => {
  return (
    <FormControl className="umg__calendar__dropdowns">
      <InputLabel id="year__dropdown__label">{inputTitle}</InputLabel>
      <Select
        onChange={(e) =>
          handleClick(e.target.value as number)
        }
        className="umg__labels"
        labelId="year__dropdown__label"
        value={defaultValue}
      >
        {dropdownData.map((item: any, index: number) => (
          <MenuItem key={index} value={returnItem ? item : index}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UmgFormControl