import React from "react";
import moment from "moment";
import { makeStyles, createStyles } from "@mui/styles";
import { Message as ChatMessage } from "../../types/index";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "fit-content",
      margin: "0rem 1rem 1rem 1rem",
      alignSelf: "center",
    },
  })
);

interface ServerMessageProps {
  message: ChatMessage;
  clock: string;
}

function ServerMessage({
  message,
  clock,
}: ServerMessageProps): React.FunctionComponentElement<ServerMessageProps> {
  const classes = useStyles();
  const timeFormat =
    clock === "24" ? "MMM D YYYY HH:mm:ss" : "MMM D YYYY h:mm:ss a";
  return (
    <Typography variant='subtitle1' gutterBottom className={classes.root}>
      {`[Server: ${moment(message.time).format(timeFormat)} ]: ${message.text}`}
    </Typography>
  );
}

export default ServerMessage;
