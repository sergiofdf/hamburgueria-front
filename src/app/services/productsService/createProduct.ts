import { httpClient } from '../httpClient';

export interface createProductProps {
  name: string;
  description: string;
  size: string;
  price: number;
  imageUrl?: string;
  category_id: number;
}

export async function createProduct({...params}: createProductProps) {
  return await httpClient.post('/products', params);
}
