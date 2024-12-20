import Joi from "joi";
import { CreateProductDTO } from "../../dto/product.dto";

export const CreateProductSchema = Joi.object<CreateProductDTO>({
  productName: Joi.string().required(),
  description: Joi.string().required(),
  productImage: Joi.string(),
});
