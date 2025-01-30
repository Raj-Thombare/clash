import express, { Express, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import Routes from "./routes/index.js";
import "./jobs/index.js";
import { appLimitter } from "./config/rateLimit.js";
import fileUpload from "express-fileupload";
import cors from "cors";
import { Server } from "socket.io";
import { createServer, Server as HttpServer } from "http";
import { setupSocket } from "./socket.js";
import helmet from "helmet";

const app: Express = express();
const server: HttpServer = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_APP_URL,
    }
});

export { io };

setupSocket(io);

const PORT = process.env.PORT || 7000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(appLimitter)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
app.use(express.static('public'))
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(Routes);

app.get('/', async (req: Request, res: Response): Promise<any> => {
    return res.json({
        message: "Server is running!"
    })
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
