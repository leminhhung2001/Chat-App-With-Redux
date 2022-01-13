import React from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    radioGroup: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    formControl: {
      padding: "1rem 1rem",
      display: "flex",
      flexGrow: 1,
    },
  })
);

interface FormRadioGroupProps {
  label: string;
  onChange: (value) => void;
  value: string | boolean | number;
  radioLabels: string[];
  radioValues: string[] | number[] | boolean[];
}

function FormRadioGroup({
  label,
  onChange,
  value,
  radioLabels,
  radioValues,
}: FormRadioGroupProps): React.FunctionComponentElement<FormRadioGroupProps> {
  const classes = useStyles();
  const handleValueChange = (
    e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <FormControl className={classes.formControl} fullWidth>
      <FormLabel component='legend'>{label}</FormLabel>
      <RadioGroup
        aria-label={label}
        name={label}
        value={value}
        onChange={handleValueChange}
        className={classes.radioGroup}
      >
        <FormControlLabel
          value={radioValues[0]}
          control={<Radio />}
          label={radioLabels[0]}
          labelPlacement='end'
        />
        <FormControlLabel
          value={radioValues[1]}
          control={<Radio />}
          label={radioLabels[1]}
          labelPlacement='end'
        />
      </RadioGroup>
    </FormControl>
  );
}

export default FormRadioGroup;
