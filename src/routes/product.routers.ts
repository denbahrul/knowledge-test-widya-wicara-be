import { Router } from "express";
import productControllers from "../controllers/product.controllers";
import upload from "../middlewares/upload-file";

export const productRoute = Router();

productRoute.post("/create", upload.single("productImage"), productControllers.create);
productRoute.put("/update/:id", upload.single("productImage"), productControllers.update);
productRoute.get("/", productControllers.findAll);
productRoute.get("/:id", productControllers.findById);
productRoute.delete("/delete/:id", productControllers.delete);
