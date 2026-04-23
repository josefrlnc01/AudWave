import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { dirname, resolve } from 'node:path'
import dns from 'node:dns'
dns.setDefaultResultOrder('ipv4first')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = resolve(__dirname, '../../.env')
const result = dotenv.config({ path: envPath })
console.log('ENV PATH:', envPath)
console.log('DOTENV RESULT:', result.error ?? 'OK')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('REDIS_HOST:', process.env.REDIS_HOST)
await import( './transcription.worker.js')


console.log('workers iniciados')
