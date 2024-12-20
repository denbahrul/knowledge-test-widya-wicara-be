import { Router } from "express";
import { userRoute } from "./user.routers";
import { productRoute } from "./product.routers";

export const router = Router();

router.use("/user", userRoute);
router.use("/product", productRoute);
