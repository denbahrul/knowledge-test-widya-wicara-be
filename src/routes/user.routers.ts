import { Router } from "express";
import userControllers from "../controllers/user.controllers";
import { authentication } from "../middlewares/authentication";
import upload from "../middlewares/upload-file";

export const userRoute = Router();

userRoute.post("/register", userControllers.register);
userRoute.post("/login", userControllers.login);
userRoute.get("/me", authentication, userControllers.getUserLogged);
userRoute.get("/profile", authentication, userControllers.getUserProfile);
userRoute.patch("/update", authentication, upload.single("profilePhoto"), userControllers.updateProfile);
