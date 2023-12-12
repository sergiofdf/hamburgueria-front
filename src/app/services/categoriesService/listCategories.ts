import { Category } from '../../entities/Category';
import { httpClient } from '../httpClient';

type CategoriesListResponse = Array<Category>;

export async function listCategories() {
  const { data } = await httpClient.get<CategoriesListResponse>('/products/category');
  return data;
}
