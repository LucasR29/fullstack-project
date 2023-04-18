import { Router } from "express"
import { createSessionController } from "../controllers/session.controller"

export const loginRoutes = Router()

loginRoutes.post("", createSessionController)