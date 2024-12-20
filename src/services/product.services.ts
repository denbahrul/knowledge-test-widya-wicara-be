import { CreateProductDTO } from "../dto/product.dto";
import productRepositories from "../repositories/product.repositories";

class ProductServices {
  async findAll() {
    return await productRepositories.findAll();
  }

  async create(body: CreateProductDTO) {
    return await productRepositories.create(body);
  }
}

export default new ProductServices();
