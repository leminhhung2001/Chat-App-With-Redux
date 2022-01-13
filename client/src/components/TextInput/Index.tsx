import React, { Ref } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles, createStyles } from "@mui/styles";
import { marginType, inputSize, inputVariant } from "../../types/index";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexGrow: 1,
      margin: "1rem",
      "& > * + *": {
        margin: "0rem 0rem 0rem 1rem",
      },
    },
    input: {
      display: "flex",
      flexGrow: 1,
    },
  })
);

interface TextInputProps {
  inputValue: string;
  onInputChange: (string) => void;
  onKeyPress: (string) => void;
  placeHolder: string;
  marginType: marginType;
  labelText: string;
  inputSize: inputSize;
  inputVariant: inputVariant;
  inputRef?: Ref<HTMLInputElement>;
}

function TextInput({
  inputValue,
  onInputChange,
  onKeyPress,
  placeHolder,
  marginType,
  labelText,
  inputSize,
  inputVariant,
  inputRef,
}: TextInputProps): React.FunctionComponentElement<TextInputProps> {
  const classes = useStyles();

  return (
    <TextField
      label={labelText || ""}
      placeholder={placeHolder}
      margin={marginType}
      InputLabelProps={{
        shrink: true,
      }}
      variant={inputVariant}
      size={inputSize}
      className={classes.input}
      onChange={onInputChange}
      onKeyPress={onKeyPress}
      value={inputValue}
      inputRef={inputRef}
    />
  );
}

export default TextInput;
