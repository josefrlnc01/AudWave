import {Queue} from 'bullmq'

const isProd = process.env.NODE_ENV === 'production'

export const getConnection = () => ({
    host: isProd ? process.env.REDIS_HOST : '127.0.0.1',
    port: Number(process.env.REDIS_PORT ?? 6379),
    maxRetriesPerRequest: null
})

export const fileTranscriptionQueue = new Queue('fileTranscription', {connection: getConnection()})


export const youtubeTranscriptionQueue = new Queue('youtubeTranscription', {connection: getConnection()})