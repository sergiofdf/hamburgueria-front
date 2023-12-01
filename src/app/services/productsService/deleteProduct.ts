import { httpClient } from '../httpClient';


export async function deleteProduct(id: number) {
  return await httpClient.delete(`/products/${id}`);
}
