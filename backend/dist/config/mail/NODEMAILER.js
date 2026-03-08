import nodemailer from 'nodemailer';
import { getRequiredEnv } from '../../shared/utils/variables.js';
const transport = nodemailer.createTransport({
    host: getRequiredEnv('SMTP_HOST'),
    port: Number(getRequiredEnv('SMTP_PORT')),
    auth: {
        user: getRequiredEnv('SMTP_USER'),
        pass: getRequiredEnv('SMTP_PASS')
    }
});
export default transport;
