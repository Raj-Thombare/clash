import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue.js";
import prisma from "../config/database.js";

export const votingQueueName = 'votingQueue';

export const votingQueue = new Queue(votingQueueName, {
    connection: redisConnection,
    defaultJobOptions: {
        ...defaultQueueOptions,
        delay: 500
    }
})

export const queueWorker = new Worker(votingQueueName, async (job: Job) => {
    const data = job.data;
    await prisma.clashItem.update({
        where: {
            id: Number(data?.clashItemId)
        },
        data: {
            count: {
                increment: 1
            }
        }
    })
}, {
    connection: redisConnection
})