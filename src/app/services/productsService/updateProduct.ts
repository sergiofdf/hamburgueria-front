import { httpClient } from '../httpClient';

export interface updateProductProps {
  id: number;
  name?: string;
  description?: string;
  size?: string;
  price?: number;
  imageUrl?: string;
  category_id?: number;
}

export async function updateProduct({id, ...params}: updateProductProps) {
  return await httpClient.patch(`/products/${id}`, params);
}
