import {z} from 'zod'
import { isSecureLink } from '../../shared/utils/link.js'

//Esquema de validación de link en controller principal de yt-video
export const videoSchema = z.object({
    videoLink: z.string().refine(isSecureLink, {message:'Link seguro'})
})
