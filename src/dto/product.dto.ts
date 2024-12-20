export interface IProduct {
  productName: string;
  description: string;
  productImage?: string;
}

export type CreateProductDTO = IProduct;

export type UpdateProductDTO = CreateProductDTO;
