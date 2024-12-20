import { Router } from "express";
import { userRoute } from "./user.routers";

export const router = Router();

router.use("/user", userRoute);
