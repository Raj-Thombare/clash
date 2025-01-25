import { ZodError } from "zod"
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import moment from "moment";
import { supportMimes } from "./config/fileSystem.js";
import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";

export const formatError = (error: ZodError): any => {
    let errors: any = {};
    error.errors?.map((issue) => {
        errors[issue.path?.[0]] = issue.message;
    });

    return errors;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const renderEmailEjs = async (fileName: string, payload: any): Promise<string> => {
    const html: string = await ejs.renderFile(__dirname + `/views/emails/${fileName}.ejs`, payload);

    return html;
}

export const checkDateHourDiff = (date: Date | string): number => {
    const now = moment();
    const tokenSendAt = moment(date);

    const difference = moment.duration(now.diff(tokenSendAt))
    return difference.asHours()
}

export const imageValidator = (size: number, mime: string): string | null => {
    if (bytesToMB(size) > 2) {
        return "Image size must be less than 2 MB."
    } else if (!supportMimes.includes(mime)) {
        return "Image must be of type png, jpg, jpeg, webp or gif."
    }

    return null;
}

export const bytesToMB = (bytes: number): number => {
    return bytes / (1024 * 1024);
}

export const uploadFile = (image: UploadedFile) => {
    const imgExt = image?.name.split(".");
    const imageName = uuidv4() + "." + imgExt[1];
    const uploadPath = process.cwd() + "/public/images/" + imageName;
    image.mv(uploadPath, (err) => {
        if (err) throw err;
    });

    return imageName;
}

export const removeImage = (imageName: string) => {
    const path = process.cwd() + "/public/images/" + imageName;
    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
}