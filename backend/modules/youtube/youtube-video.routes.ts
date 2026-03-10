import { Router } from "express";
import { YoutubeVideoController } from "./youtube-video.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";

export const youtubeVideoRoute = Router()

youtubeVideoRoute.post('/save', authenticate, YoutubeVideoController.saveVideo)