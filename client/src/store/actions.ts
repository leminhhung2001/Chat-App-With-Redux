import { Message, Settings } from "../types/index";
import {
  SEND_MESSAGE,
  SET_USERNAME,
  RECEIVE_MESSAGE,
  SET_THEME,
  SAVE_SETTINGS,
  RESET_SETTINGS,
  UNREAD_MESSAGE,
  RESET_UNREAD_MESSAGE_COUNT,
  LOAD_SETTINGS,
  SOCKET_ID,
  SET_USERNAME_SUCCESS,
} from "./constants";

interface ServerSendSocketIdAction {
  type: typeof SOCKET_ID;
  payload: {
    socketId: string;
  };
}

interface setUsernameSuccessAction {
  type: typeof SET_USERNAME_SUCCESS;
  payload: {
    userName: string;
  };
}

interface SendMessageAction {
  type: typeof SEND_MESSAGE;
  payload: {
    message: Message;
  };
}

interface ReceiveMessageAction {
  type: typeof RECEIVE_MESSAGE;
  payload: {
    message: Message;
  };
}

interface SetUsernameAction {
  type: typeof SET_USERNAME;
  payload: {
    userName: string;
  };
}

interface SetThemeAction {
  type: typeof SET_THEME;
  payload: {
    theme: string;
  };
}

interface SaveSettingsAction {
  type: typeof SAVE_SETTINGS;
  payload: {
    settings: Settings;
  };
}

interface ResetSettingsAction {
  type: typeof RESET_SETTINGS;
}

interface LoadSettingsAction {
  type: typeof LOAD_SETTINGS;
}

interface UnreadMessageAction {
  type: typeof UNREAD_MESSAGE;
}

interface ResetUnreadMessageCountAction {
  type: typeof RESET_UNREAD_MESSAGE_COUNT;
}

export function receiveMessage(message: Message): ReceiveMessageAction {
  return {
    type: RECEIVE_MESSAGE,
    payload: {
      message,
    },
  };
}

export function setUsername(userName: string): SetUsernameAction {
  return {
    type: SET_USERNAME,
    payload: {
      userName,
    },
  };
}

export function setTheme(theme: string): SetThemeAction {
  return {
    type: SET_THEME,
    payload: {
      theme,
    },
  };
}

export function saveSettings(settings: Settings): SaveSettingsAction {
  return {
    type: SAVE_SETTINGS,
    payload: {
      settings,
    },
  };
}

export function resetSettings(): ResetSettingsAction {
  return {
    type: RESET_SETTINGS,
  };
}

export function loadSettings(): LoadSettingsAction {
  return {
    type: LOAD_SETTINGS,
  };
}

export function unreadMessage(): UnreadMessageAction {
  return {
    type: UNREAD_MESSAGE,
  };
}

export function resetUnreadMessageCount(): ResetUnreadMessageCountAction {
  return {
    type: RESET_UNREAD_MESSAGE_COUNT,
  };
}

export function sendMessage(message: Message): SendMessageAction {
  return {
    type: SEND_MESSAGE,
    payload: {
      message,
    },
  };
}

export function setUsernameSuccess(userName: string): setUsernameSuccessAction {
  return {
    type: SET_USERNAME_SUCCESS,
    payload: {
      userName,
    },
  };
}

export function serverSendSocketId(socketId: string): ServerSendSocketIdAction {
  return {
    type: SOCKET_ID,
    payload: {
      socketId,
    },
  };
}

export type ChatServerActionTypes =
  | SendMessageAction
  | ReceiveMessageAction
  | SetUsernameAction
  | SetThemeAction
  | SaveSettingsAction
  | ResetSettingsAction
  | LoadSettingsAction
  | UnreadMessageAction
  | ResetUnreadMessageCountAction
  | setUsernameSuccessAction
  | ServerSendSocketIdAction;
