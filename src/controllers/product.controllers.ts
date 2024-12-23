import { Request, Response } from "express";
import productServices from "../services/product.services";
import { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto";
import cloudinaryServices from "../services/cloudinary.services";
import { CreateProductSchema, UpdateProductSchema } from "../utils/schemas/product.schema";

class ProductControllers {
  async findAll(req: Request, res: Response) {
    // #swagger.tags = ['Product']
    // #swagger.summary = 'Get all product'
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

  async findById(req: Request, res: Response) {
    // #swagger.tags = ['Product']
    // #swagger.summary = 'Get a product by params id'
    try {
      const productId = +req.params.id;
      const data = await productServices.findById(productId);
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
    // #swagger.tags = ['Product']
    // #swagger.summary = 'Update Product'
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/createProductSchema"
                        }  
                    }
                }
            } 
      */
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

  async update(req: Request, res: Response) {
    // #swagger.tags = ['Product']
    // #swagger.summary = 'UpdateProduct'
    /*  #swagger.requestBody = {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/updateProductSchema"
                        }  
                    }
                }
            } 
      */
    try {
      const productId = +req.params.id;
      const body: UpdateProductDTO = req.body;
      const fileUpload = req.file;

      if (fileUpload) {
        const image = await cloudinaryServices.upload(fileUpload as Express.Multer.File);
        body.productImage = image.secure_url;
      }

      const value = await UpdateProductSchema.validateAsync(body);
      const data = await productServices.update(productId, value);
      res.json({
        message: `Product ${data.productName} was updated`,
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

  async delete(req: Request, res: Response) {
    // #swagger.tags = ['Product']
    // #swagger.summary = 'Delete product'
    try {
      const productId = +req.params.id;
      const data = await productServices.delete(productId);
      res.json({
        message: `Product ${data.productName} was deleted`,
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
