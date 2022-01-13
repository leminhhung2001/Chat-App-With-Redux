import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import * as linkify from "linkifyjs";
import logger from "./utils/logger";
import { Message, LinkMeta } from "./types";
import getUrlMetaData from "./utils/getUrlMetaData";
import userService from "./Services/Users";

interface socketI {
  io: Server;
}

const EVENTS = {
  connection: "connection",
};

const disconnectReasons = {
  client: ["client namespace disconnect", "ping timeout", "transport close"],
  server: ["transport error", "server namespace disconnect"],
};
const createMessage = (text: string) => {
  return {
    id: nanoid(),
    text: text,
    time: new Date().getTime(),
    sender: "Server",
    socketId: "",
  };
};

const createLinkMessage = (message: Message, links: LinkMeta[]) => {
  return {
    id: message.id,
    text: message.text,
    links: links,
    time: message.time,
    sender: message.sender,
    socketId: message.socketId,
  };
};

function socket({ io }: socketI) {
  logger.info("🔥 Socket enable! 🔥");
  io.on(EVENTS.connection, (socket: Socket) => {
    const { query } = socket.handshake;
    let createdUserName = null;
    if (query.savedUsername) {
      const { savedUsername } = query;
      createdUserName = userService.addNewUser(socket, savedUsername);
    } else {
      createdUserName = userService.addNewUser(socket);
    }
    socket.emit("action", {
      type: "chatClient/SOCKET_ID",
      payload: { socketId: socket.id },
    });
    socket.emit("action", {
      type: "chatClient/SET_USERNAME_SUCCESS",
      payload: { userName: createdUserName },
    });
    const joinNotificationMessage = createMessage(
      `${createdUserName} has joined the chat!`
    );
    io.emit("action", {
      type: "chatClient/RECEIVE_MESSAGE",
      payload: { message: joinNotificationMessage },
    });

    socket.on("disconnect", (reason) => {
      if (disconnectReasons.client.includes(reason)) {
        userService
          .removeUser(socket.id)
          .then((removeMessage) => {
            const removeNotification = createMessage(
              `${removeMessage} due to ${reason}`
            );
            io.emit("action", {
              type: "chatClient/RECEIVE_MESSAGE",
              payload: { message: removeNotification },
            });
          })
          .catch((notFoundMessage) => {
            const removeNotification = createMessage(notFoundMessage);
            io.emit("action", {
              type: "chatClient/RECEIVE_MESSAGE",
              payload: { message: removeNotification },
            });
          });
      } else if (disconnectReasons.server.includes(reason)) {
        // manually reconnect
      }
    });

    socket.on("action", (action) => {
      if (action.type === "chatServer/hello") {
        socket.emit("action", { type: "message", data: "good day!" });
      } else if (action.type === "chatServer/SET_USERNAME") {
        const { userName } = action.payload;
        userService
          .changeUserName(socket.id, userName)
          .then((response) => {
            if (response === "success") {
              socket.emit("action", {
                type: "chatClient/SET_USERNAME_SUCCESS",
                payload: { userName: userName },
              });
              const nameChangeNotification = createMessage(
                `${createdUserName} is now called ${userName}`
              );
              io.emit("action", {
                type: "chatClient/RECEIVE_MESSAGE",
                payload: { message: nameChangeNotification },
              });
            }
          })
          .catch(() => {
            const newMessage = createMessage("Failed to change username!");
            socket.emit("action", {
              type: "chatClient/RECEIVE_MESSAGE",
              payload: { message: newMessage },
            });
          });
      } else if (action.type === "chatServer/SEND_MESSAGE") {
        const { message } = action.payload;
        const links = linkify.find(message.text);
        if (links.length > 0) {
          const promiseArr = [];
          links.forEach((link) => {
            if (link.type === "url") {
              const metaPromise = getUrlMetaData(link.href);
              promiseArr.push(metaPromise);
            }
          });
          Promise.all(promiseArr)
            .then((results) => {
              const linkData = results.filter((item) => item !== null);
              const linkMessage = createLinkMessage(message, linkData);
              io.emit("action", {
                type: "chatClient/RECEIVE_MESSAGE",
                payload: { message: linkMessage },
              });
            })
            .catch((reason) => console.log("error reason! = ", reason));
        } else {
          io.emit("action", {
            type: "chatClient/RECEIVE_MESSAGE",
            payload: { message: message },
          });
        }
      }
    });
  });
}

export default socket;
