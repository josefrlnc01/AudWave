
import fs from 'node:fs/promises'
import path from 'node:path'
import { getVideoMinutes } from '../../shared/utils/video.js'
import type { VideoSubtitles } from './video.types.js'
import { YoutubeVideoService } from '../youtube-video/youtube-video.service.js'
import { transcribeWhisperAudio } from '../transcription/whisper.service.js'


export class VideoService {
    

}

