/* eslint-disable no-inner-declarations */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ordersService } from '../../../../app/services/ordersService';
import toast from 'react-hot-toast';
import { OrderStatus } from '../../../../app/entities/Order';

interface UseOrderModalControllerProps {
  id?: number;
  onClose?(): void;
}


export function useOrderModalController( {id, onClose}: UseOrderModalControllerProps){
  if(id) {
    const { data, isFetching } = useQuery({
      queryKey: ['ordersid', id.toString()],
      queryFn: () => ordersService.findOneOrder(id),
      cacheTime: Infinity,
    });

    const queryClient = useQueryClient();

    const { isLoading: isLoadingCancel, mutateAsync: cancelOrder } = useMutation(ordersService.cancelOrder);

    const { isLoading: isLoadingApproval, mutateAsync: approveOrder } = useMutation(ordersService.updateOrderStatus);

    async function handleCancelOrder() {
      try {

        await cancelOrder(id!);

        queryClient.invalidateQueries({ queryKey: ['orders'] });
        toast.success('Pedido cancelado com sucesso!');
        onClose?.();

      } catch {
        toast.error('Erro ao cancelar o pedido!');
        onClose?.();
      }
    }

    async function handleUpdateStatus() {
      try {
        await approveOrder({ id: id!, orderStatus: OrderStatus.IN_PROGRESS});
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        toast.success('Pedido aprovado com sucesso!');
        onClose?.();

      } catch {
        toast.error('Erro ao aprovar o pedido!');
        onClose?.();
      }
    }

    return {
      order: data ?? undefined,
      isLoading: isFetching,
      handleCancelOrder,
      handleUpdateStatus,
      isLoadingCancel,
      isLoadingApproval
    };
  }

  return{
    order: undefined,
    isLoading: false,
  };

}
