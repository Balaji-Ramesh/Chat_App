import { io, Socket } from "socket.io-client";

const URL = "http://localhost:3000";

const token = localStorage.getItem("token");

export const socket: Socket = io(URL, {
  auth: { token },
  transports: ["websocket", "polling"],
  withCredentials: true,
  autoConnect: false,
});
