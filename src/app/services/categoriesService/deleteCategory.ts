import { httpClient } from '../httpClient';


export async function deleteCategory(id: number) {
  return await httpClient.delete(`/products/category/${id}`);
}
