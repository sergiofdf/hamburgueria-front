import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '../services/categoriesService';

export function useCategories() {

  const { data, isFetching } = useQuery({
    queryKey: ['listCategories'],
    queryFn: () => categoriesService.listCategories()
  });

  return { categories: data ?? [], isFetching };
}
