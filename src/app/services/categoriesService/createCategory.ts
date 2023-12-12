import { httpClient } from '../httpClient';

export interface createCategoryProps {
  name: string;
}

export interface createCategoryResponse {
  categoryId: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export async function createCategory({...params}: createCategoryProps) {
  const { data } = await httpClient.post<createCategoryResponse>('/products/category', params);
  return data;
}
