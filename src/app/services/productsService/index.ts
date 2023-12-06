import { createProduct } from './createProduct';
import { deleteProduct } from './deleteProduct';
import { listProducts } from './listProducts';
import { updateProduct } from './updateProduct';
import { uploadNewProductImage } from './uploadNewProductImage';

export const productsService = {
  listProducts,
  deleteProduct,
  updateProduct,
  uploadNewProductImage,
  createProduct
};
