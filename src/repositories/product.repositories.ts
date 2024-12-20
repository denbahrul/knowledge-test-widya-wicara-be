import { CreateProductDTO, UpdateProductDTO } from "../dto/product.dto";
import { prisma } from "../libs/prisma";

class ProductRepositories {
  async findAll() {
    return await prisma.product.findMany();
  }
  async create(data: CreateProductDTO) {
    return await prisma.product.create({
      data,
    });
  }

  async update(productId: number, data: UpdateProductDTO) {
    return await prisma.product.update({
      where: {
        id: productId,
      },
      data,
    });
  }
}

export default new ProductRepositories();
