import { Router } from "express";
import { YoutubeVideoController } from "./youtube-video.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { checkQuota } from "../../shared/middlewares/quota.middleware.js";

export const youtubeVideoRoute = Router()

youtubeVideoRoute.post('/save-transcription', authenticate, YoutubeVideoController.saveTranscription)
youtubeVideoRoute.post('/save-translation', authenticate, YoutubeVideoController.saveTranslation)
youtubeVideoRoute.post('/', authenticate, checkQuota, YoutubeVideoController.init)