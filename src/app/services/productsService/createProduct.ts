import { httpClient } from '../httpClient';

export interface createProductProps {
  name: string;
  description: string;
  size: string;
  price: number;
  imageUrl?: string;
  category_id: number;
}

export interface createProductResponse {
  productId: number;
  name: string;
  description: string;
  size: string;
  price: number;
  imageUrl?: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  category_id: number;
}

export async function createProduct({...params}: createProductProps) {
  const { data } = await httpClient.post<createProductResponse>('/products', params);
  return data;
}
