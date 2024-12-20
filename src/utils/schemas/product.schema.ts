import Joi from "joi";
import { CreateProductDTO, UpdateProductDTO } from "../../dto/product.dto";

export const CreateProductSchema = Joi.object<CreateProductDTO>({
  productName: Joi.string().required(),
  description: Joi.string().required(),
  productImage: Joi.string(),
});

export const UpdateProductSchema = Joi.object<UpdateProductDTO>({
  productName: Joi.string(),
  description: Joi.string(),
  productImage: Joi.string(),
});
