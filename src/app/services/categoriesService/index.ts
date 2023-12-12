import { createCategory } from './createCategory';
import { deleteCategory } from './deleteCategory';
import { listCategories } from './listCategories';
import { updateCategory } from './updateCategory';

export const categoriesService = {
  listCategories,
  deleteCategory,
  updateCategory,
  createCategory
};
