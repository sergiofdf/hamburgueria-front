import { useQuery } from '@tanstack/react-query';
import { ordersService } from '../../../../app/services/ordersService';

export function useOrdersCardController(id: number){
  if(id) {
    const { data, isFetching } = useQuery({
      queryKey: ['ordersid', id.toString()],
      queryFn: () => ordersService.findOneOrder(id),
    });

    return {
      order: data ?? undefined,
      isLoading: isFetching,
    };
  }

  return{
    order: undefined,
    isLoading: false,
  };

}
