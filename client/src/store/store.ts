import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSocketIoMiddleware from "redux-socket.io";
import { SERVER_URL } from "./constants";
import chatReducer from "./reducer";
import io from "socket.io-client";

let savedUserName = "";

let socket = null;

let newServerURL = "";

const savedSettings = JSON.parse(sessionStorage.getItem("settings"));
if (savedSettings && Object.keys(savedSettings).length > 0) {
  savedUserName = savedSettings.userName;
  newServerURL = SERVER_URL + `?savedUsername=${savedUserName}`;
  socket = io(newServerURL);
} else {
  socket = io(SERVER_URL);
}

const socketIoMiddleware = createSocketIoMiddleware(socket, "chatServer/");
const middleWares = [socketIoMiddleware];

const rootReducer = combineReducers({
  chatReducer,
});
const enhancer = composeWithDevTools(applyMiddleware(...middleWares));

const store = createStore(rootReducer, enhancer);

export default store;
