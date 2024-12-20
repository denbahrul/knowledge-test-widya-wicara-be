import { Router } from "express";
import userControllers from "../controllers/user.controllers";

export const userRoute = Router();

userRoute.post("/register", userControllers.register);
