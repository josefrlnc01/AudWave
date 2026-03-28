import cors from 'cors'
export const isProd = process.env.NODE_ENV === 'production'
import { getRequiredEnv } from '../shared/utils/variables.js'

let frontendUrl: string | undefined

if (isProd) {
    frontendUrl = getRequiredEnv('FRONTEND_URL')
} else {
    frontendUrl = getRequiredEnv('FRONTEND_URL_DEV')
}

export const corsMiddleware = () => cors({
    credentials: true,
    origin: (origin, callback) => {
        console.log("ORIGIN:", origin);

        const ACCEPTED_ORIGINS = [
            "https://audwave.es",
            "https://www.audwave.es"
        ];

        if (!origin) return callback(null, true);

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("No permitido por CORS"));
    }
})




