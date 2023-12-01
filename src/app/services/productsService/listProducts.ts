import { Product } from '../../entities/Product';
import { httpClient } from '../httpClient';

type ProductsListResponse = Array<Product>;

export async function listProducts() {
  const { data } = await httpClient.get<ProductsListResponse>('/products');
  return data;
}
