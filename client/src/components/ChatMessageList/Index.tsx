import React, { useEffect, createRef } from "react";
import List from "@mui/material/List";
import { makeStyles, createStyles } from "@mui/styles";
import { Message } from "../../types/index";
import ChatMessage from "../ChatMessage/Index";
import ServerMessage from "../ServerMessage";

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      width: "100%",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
    },
  })
);

interface ChatMessageListProps {
  messages: Message[];
  socketId: string;
  clock: string;
}

function ChatMessageList({
  messages,
  socketId,
  clock,
}: ChatMessageListProps): React.FunctionComponentElement<ChatMessageListProps> {
  const classes = useStyles();
  const listRef = createRef<HTMLUListElement>();
  useEffect(() => {
    const lastElement =
      listRef.current.children[listRef.current.children.length - 1];
    lastElement?.scrollIntoView();
  }, [messages]);
  return (
    <List ref={listRef} className={classes.list}>
      {messages?.length > 0 &&
        messages?.map((message) => {
          const sender = message.socketId === socketId ? "self" : "other";
          if (message.sender === "Server") {
            return (
              <ServerMessage key={message.id} message={message} clock={clock} />
            );
          }
          return (
            <ChatMessage
              key={message.id}
              message={message}
              sender={sender}
              clock={clock}
            />
          );
        })}
    </List>
  );
}

export default ChatMessageList;
