import express, { Express, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { sendEmail } from "./config/mail.js";
import Routes from "./routes/index.js";
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/EmailJob.js";
import { appLimitter } from "./config/rateLimit.js";

const app: Express = express();

const PORT = process.env.PORT || 7000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(appLimitter)
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(Routes);

app.get('/', async (req: Request, res: Response): Promise<any> => {
    return res.json({
        message: "Server is running!"
    })
    // try {
    //     const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
    //         name: "Raj Thombare"
    //     });

    //     // await sendEmail('wewiyab904@kvegg.com', 'Hello Mr Walter', html);

    //     await emailQueue.add(emailQueueName, { to: 'wewiyab904@kvegg.com', subject: 'Testing queue email', body: html })
    //     res.json({ msg: "Email sent successfully!" });
    // } catch (error) {
    //     res.json({ error: "Error occured!" });
    // }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
