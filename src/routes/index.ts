import { Router } from "express";
import { userRoute } from "./user.routers";
import { productRoute } from "./product.routers";
import { authentication } from "../middlewares/authentication";

export const router = Router();

router.use("/user", userRoute);
router.use("/product", authentication, productRoute);
