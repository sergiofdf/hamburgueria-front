import { httpClient } from '../httpClient';

export interface updateCategoryProps {
  id: number;
  name: string;
}

export async function updateCategory({id, ...params}: updateCategoryProps) {
  return await httpClient.patch(`/products/category/${id}`, params);
}
