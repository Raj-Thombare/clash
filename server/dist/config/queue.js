// export const redisConnection: ConnectionOptions = {
//     host: process.env.REDIS_HOST,
//     port: 6379,
// }
export const redisConnection = {
    host: process.env.UPSTASH_REDIS_HOST,
    port: Number(process.env.UPSTASH_REDIS_PORT || 6379),
    password: process.env.UPSTASH_REDIS_PASSWORD,
};
export const defaultQueueOptions = {
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
};
