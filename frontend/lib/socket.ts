import { io } from "socket.io-client";
import Env from "./env";

const socket = io(Env.BACKEND_URL, {
    transports: ["websocket"],
    withCredentials: true
});

export default socket;