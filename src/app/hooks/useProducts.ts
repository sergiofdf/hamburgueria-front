import { useQuery } from '@tanstack/react-query';
import { productsService } from '../services/productsService';

export function useProducts() {

  const { data, isFetching } = useQuery({
    queryKey: ['listProducts'],
    queryFn: () => productsService.listProducts()
  });

  return { products: data ?? [], isFetching };
}
