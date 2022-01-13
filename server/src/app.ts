import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";
const port = config.get<number>("port");
const host = config.get<string>("host");
const corsOrigin = config.get<string>("corsOrigin");
const app = express();
const httpServer = createServer(app);
import logger from "./utils/logger";
import socket from "./socket";

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get("/", (_, res) => {
  res.send("Hello, world!");
});

httpServer.listen(port, host, () => {
  logger.info({ msg: "🚀 Server listening at port 8080 🚀" });
  socket({ io });
});
