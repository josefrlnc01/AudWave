import { Router } from "express";
import { DocumentController } from "./document.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";

export const documentRoute = Router()

documentRoute.post('/create', authenticate, DocumentController.create)