import { useQuery } from '@tanstack/react-query';
import { ordersService } from '../../../../../app/services/ordersService';

export function useOperacaoController(){
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersService.listOrders(),
  });
  return {
    orders: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchOrders: refetch
  };
}
