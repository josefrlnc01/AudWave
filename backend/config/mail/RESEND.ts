import {Resend} from 'resend'
import { getRequiredEnv } from '../../shared/utils/variables.js';

const resend = new Resend(getRequiredEnv('RESEND_KEY'))

export default resend