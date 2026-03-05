import { Router } from "express";
import { init } from "./main.controller.js";
import { validateProcessVideo } from "../../shared/middlewares/video.middleware.js";

export const mainRoute = Router()

mainRoute.post('/', validateProcessVideo, init)

