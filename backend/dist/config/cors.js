import cors from 'cors';
export const isProd = process.env.NODE_ENV === 'production';
import { getRequiredEnv } from '../shared/utils/variables.js';
let frontendUrl;
if (isProd) {
    frontendUrl = getRequiredEnv('FRONTEND_URL');
}
else {
    frontendUrl = 'http://localhost:5173';
}
export const corsMiddleware = () => cors({
    credentials: true,
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            frontendUrl
        ];
        if (process.env.NODE_ENV === 'production' && ACCEPTED_ORIGINS.length === 0) {
            console.warn('Faltan las variables de produccion por definir');
            return callback(null, true);
        }
        if (!origin)
            return callback(null, true);
        if (ACCEPTED_ORIGINS.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('No permitido por cors'));
        }
    }
});
