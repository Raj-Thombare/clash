import { ConnectionOptions, DefaultJobOptions } from "bullmq";
import { Redis } from "@upstash/redis";

export const redisConnection: ConnectionOptions = {
    host: process.env.REDIS_HOST,
    port: 6379,
}

// export const redisConnection = new Redis({
//     url: process.env.REDIS_URL,
//     token: process.env.REDIS_TOKEN,
// })

export const defaultQueueOptions: DefaultJobOptions = {
    removeOnComplete: {
        count: 20,
        age: 60 * 60,
    },
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 3000
    },
    removeOnFail: false
}