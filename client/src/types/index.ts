export enum marginType {
  normal = "normal",
  dense = "dense",
}

export enum inputSize {
  medium = "medium",
  small = "small",
}

export enum inputVariant {
  outlined = "outlined",
  standard = "standard",
  filled = "filled",
}

export interface ChatState {
  messages: Message[];
  userName: string;
  socketId: string;
  theme: string;
  clock: string;
  sendMessageOnCtrlEnter: string;
  unreadMessageCount: number;
}

export interface Message {
  id: string;
  sender: string;
  socketId: string;
  text: string;
  time: number;
  links?: LinkMeta[];
}

export type LinkMeta = {
  url: string;
  title: string;
  image: string;
  description: string;
};

export interface Settings {
  userName: string;
  theme: string;
  clock: string;
  sendMessageOnCtrlEnter: string;
}

export interface User {
  socketId: string;
  name: string;
  joined: number;
}
