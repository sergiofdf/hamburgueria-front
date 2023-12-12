import { useQuery } from '@tanstack/react-query';
import { ordersService } from '../services/ordersService';

export function useOrders(initialDateString?: string, finalDateString?: string) {

  const { data, isFetching } = useQuery({
    queryKey: ['ordersList'],
    queryFn: () => ordersService.listOrders(initialDateString, finalDateString)
  });

  return { orders: data ?? [], isFetching };
}
