import * as React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

import Linkify from "linkify-react";
import moment from "moment";

import { Message as ChatMessage } from "../../types";
import MessageMetadata from "../MessageMetadata/Index";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: { sender: string }) => {
      const { sender } = props;
      if (sender === "other") {
        return {
          backgroundColor:
            theme.palette.mode === "light" ? "#e0e0e0" : "#424242",
          width: "fit-content",
          margin: "0rem 6rem 1rem 1rem",
          alignSelf: "flex-start",
          wordBreak: "break-word",
        };
      }
      return {
        backgroundColor: theme.palette.mode === "light" ? "#ffffe0" : "#eeeeee",
        color: theme.palette.common.black,
        width: "fit-content",
        margin: "0rem 1rem 1rem 6rem",
        alignSelf: "flex-end",
        wordBreak: "break-word",
      };
    },
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "0.5rem 1rem",
    },
  })
);

interface MessageProps {
  message: ChatMessage;
  sender: string;
  clock: string;
}

const ChatMessages = ({
  message,
  sender,
  clock,
}: MessageProps): React.FunctionComponentElement<MessageProps> => {
  const classes = useStyles({ sender });
  const timeFormat =
    clock === "24" ? "MMM D YYYY HH:mm:ss" : "MMM D YYYY h:mm:ss a";

  return (
    <Paper elevation={6} className={classes.root}>
      <Box className={classes.container}>
        <Typography variant='h6' gutterBottom>
          <Linkify>{message.text}</Linkify>
        </Typography>
        {message.links &&
          message.links.map((link) => (
            <MessageMetadata link={link} key={link.url} />
          ))}
        <Typography gutterBottom>
          <Linkify>{message.sender}</Linkify>
        </Typography>
        <Typography variant='caption' gutterBottom>
          {moment(message.time).format(timeFormat)}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ChatMessages;
