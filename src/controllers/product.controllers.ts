import { Request, Response } from "express";
import productServices from "../services/product.services";
import { CreateProductDTO } from "../dto/product.dto";
import cloudinaryServices from "../services/cloudinary.services";
import { CreateProductSchema } from "../utils/schemas/product.schema";

class ProductControllers {
  async findAll(req: Request, res: Response) {
    try {
      const data = await productServices.findAll();
      res.json({
        data,
      });
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const body: CreateProductDTO = req.body;
      const fileUpload = req.file;

      if (fileUpload) {
        const image = await cloudinaryServices.upload(fileUpload as Express.Multer.File);
        body.productImage = image.secure_url;
      }

      const value = await CreateProductSchema.validateAsync(body);
      const data = await productServices.create(value);
      res.json({
        message: `Product ${data.productName} created`,
        data,
      });
    } catch (error) {
      console.log(error);

      const err = error as Error;
      res.status(500).json({
        message: err.message,
      });
    }
  }
}

export default new ProductControllers();
