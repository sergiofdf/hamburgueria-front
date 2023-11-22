/* eslint-disable no-inner-declarations */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersService } from '../../../../app/services/ordersService';
import toast from 'react-hot-toast';
import { OrderStatus } from '../../../../app/entities/Order';

interface UseOrderDetailControllerProps {
  id?: number;
  onClose?(): void;
}


export function useOrderDetailController( {id}: UseOrderDetailControllerProps){
  if(id) {

    const queryClient = useQueryClient();

    const { isLoading: isLoadingCancel, mutateAsync: cancelOrder } = useMutation(ordersService.cancelOrder);

    const { isLoading: isLoadingFinishing, mutateAsync: finishOrder } = useMutation(ordersService.updateOrderStatus);

    async function handleCancelOrder() {
      try {

        await cancelOrder(id!);

        queryClient.invalidateQueries({ queryKey: ['orders'] });
        toast.success('Pedido cancelado com sucesso!');

      } catch {
        toast.error('Erro ao cancelar o pedido!');
      }
    }

    async function handleFinishPreparation() {
      try {
        await finishOrder({ id: id!, orderStatus: OrderStatus.IN_TRANSPORT});
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        toast.success('Pedido pronto para transporte!');
      } catch {
        toast.error('Erro ao finalizar o pedido!');
      }
    }

    return {
      handleCancelOrder,
      handleFinishPreparation,
      isLoadingCancel,
      isLoadingFinishing
    };
  }

  return{
    order: undefined,
  };

}
