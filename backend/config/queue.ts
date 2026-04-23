import {Queue} from 'bullmq'

const isProd = process.env.NODE_ENV === 'production'

export const connection = {
    host: isProd ? process.env.REDIS_HOST : '45.90.237.66',
    port: Number(process.env.REDIS_PORT ?? 6379),
    maxRetriesPerRequest: null
}

export const fileTranscriptionQueue = new Queue('fileTranscription', {connection})


export const youtubeTranscriptionQueue = new Queue('youtubeTranscription', {connection})


console.log('redis connection', connection)