import { Router } from "express";
import { VideoStoredController } from "./stored.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
export const storedRoute = Router();
storedRoute.post('/save', authenticate, VideoStoredController.saveVideo);
