import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({path: resolve(__dirname, '../.env')})
await import( './transcription.worker.js')

console.log('workers iniciados')
