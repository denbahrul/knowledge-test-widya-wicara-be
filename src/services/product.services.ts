import { CreateProductDTO } from "../dto/product.dto";
import productRepositories from "../repositories/product.repositories";

class ProductServices {
  async findAll() {
    return await productRepositories.findAll();
  }

  async findById(productId: number) {
    return await productRepositories.findById(productId);
  }

  async create(body: CreateProductDTO) {
    return await productRepositories.create(body);
  }

  async update(productId: number, body: CreateProductDTO) {
    return await productRepositories.update(productId, body);
  }

  async delete(productId: number) {
    return await productRepositories.delete(productId);
  }
}

export default new ProductServices();
