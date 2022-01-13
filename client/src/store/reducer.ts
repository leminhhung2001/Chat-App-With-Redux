import { original, produce, setAutoFreeze } from "immer";

import {
  SET_USERNAME_SUCCESS,
  RECEIVE_MESSAGE,
  SOCKET_ID,
  SAVE_SETTINGS,
  RESET_SETTINGS,
  UNREAD_MESSAGE,
  RESET_UNREAD_MESSAGE_COUNT,
  LOAD_SETTINGS,
} from "./constants";
import { ChatState, Message } from "../types/index";
import { ChatServerActionTypes } from "./actions";
import { Reducer } from "react";
setAutoFreeze(false);

export const initialState: ChatState = {
  messages: [],
  userName: "",
  socketId: "",
  theme: "light",
  clock: "24",
  sendMessageOnCtrlEnter: "false",
  unreadMessageCount: 0,
};

const chatReducer: Reducer<ChatState, ChatServerActionTypes> = produce(
  (draft, action) => {
    switch (action.type) {
      case SOCKET_ID: {
        const { socketId } = action.payload;
        draft.socketId = socketId;
        break;
      }

      case SET_USERNAME_SUCCESS: {
        const { userName } = action.payload;
        draft.userName = userName;
        break;
      }

      case RECEIVE_MESSAGE: {
        const { message } = action.payload;
        const { messages: existingMessages } = original(draft);
        const messageIndex = existingMessages.findIndex(
          (msg: Message) => msg.id === message.id
        );
        if (messageIndex < 0) {
          existingMessages.push(message);
        }
        draft.messages = [...existingMessages];
        break;
      }

      case SAVE_SETTINGS: {
        const {
          settings: { userName, theme, clock, sendMessageOnCtrlEnter },
          settings,
        } = action.payload;
        sessionStorage.setItem("settings", JSON.stringify(settings));
        draft.userName = userName;
        draft.theme = theme;
        draft.clock = clock;
        draft.sendMessageOnCtrlEnter = sendMessageOnCtrlEnter;
        break;
      }

      case RESET_SETTINGS: {
        draft.userName = original(draft).userName;
        draft.theme = "light";
        draft.clock = "24";
        draft.sendMessageOnCtrlEnter = "false";
        break;
      }

      case LOAD_SETTINGS: {
        const settings = JSON.parse(sessionStorage.getItem("settings"));
        const { userName, theme, clock, sendMessageOnCtrlEnter } = settings;
        draft.userName = userName;
        draft.theme = theme;
        draft.clock = clock;
        draft.sendMessageOnCtrlEnter = sendMessageOnCtrlEnter;
        break;
      }

      case UNREAD_MESSAGE: {
        let unreadMessageCount = original(draft).unreadMessageCount;
        unreadMessageCount += 1;
        draft.unreadMessageCount = unreadMessageCount;
        break;
      }

      case RESET_UNREAD_MESSAGE_COUNT: {
        draft.unreadMessageCount = 0;
        break;
      }
    }
  },
  initialState
);

export default chatReducer;
