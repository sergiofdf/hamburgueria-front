import { useQuery } from '@tanstack/react-query';
import { ordersService } from '../services/ordersService';

export function useOrdersFilteredByDate(initialDateString: string, finalDateString: string) {

  const { data, isFetching } = useQuery({
    queryKey: ['ordersByDate'],
    queryFn: () => ordersService.listOrders(initialDateString, finalDateString)
  });

  return { orders: data ?? [], isFetching };
}
