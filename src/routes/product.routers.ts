import { Router } from "express";
import productControllers from "../controllers/product.controllers";
import upload from "../middlewares/upload-file";

export const productRoute = Router();

productRoute.post("/", upload.single("productImage"), productControllers.create);
productRoute.get("/", productControllers.findAll);
