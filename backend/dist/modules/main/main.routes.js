import { Router } from "express";
import { init } from "./main.controller.js";
import { validateProcessVideo } from "../../shared/middlewares/video.middleware.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { checkQuota } from "../../shared/middlewares/quota.middleware.js";
export const mainRoute = Router();
mainRoute.post('/', authenticate, checkQuota, validateProcessVideo, init);
