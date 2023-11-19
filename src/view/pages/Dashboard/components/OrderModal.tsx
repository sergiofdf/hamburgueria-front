import { Cross2Icon } from '@radix-ui/react-icons';
import { Modal } from '../../../components/Modal';
import { useOrderModalController } from './useOrderModalController';
import { formatCurrency } from '../../../../app/utils/formatCurrency';
import { Button } from '../../../components/Button';

interface OrderModalProps {
  visible: boolean;
  orderId: number | undefined;
  onClose?(): void;
}

export function OrderModal({ orderId, visible, onClose }: OrderModalProps) {

  const { order, isLoading, handleCancelOrder, handleUpdateStatus } = useOrderModalController({id: orderId, onClose});

  return (
    <Modal open={visible} onClose={onClose}>
      {order?.orderId &&
      <div className='text-gray-800 font-bold text-lg space-y-6'>
        <header className='flex items-center justify-between text-2xl'>
          <span>Pedido Número: {order.orderId}</span>
          <button
            className='h-8 w-8 flex items-center justify-center bg-red-500 rounded-sm'
            onClick={onClose}
          >
            <Cross2Icon className='h-8 w-8 text-white'/>
          </button>
        </header>
        <span className='block'>Status: {order.status}</span>
        {order.orderProduct.map((product) => (
          <div key={product.orderProductId}>
            <div className='flex items-center justify-between'>
              <img src={`http://localhost:3000/products/getImage/${product.product.productId}`} alt={product.product.name} width="24px"/>
              <p>{product.quantity}x</p>
              <p>{product.product.name}</p>
              <p>{formatCurrency(product.quantity * product.product.price)}</p>
            </div>
          </div>
        ))}
        <div className='flex items-center justify-between'>
          <p>Total</p>
          <span>{formatCurrency(order.total)}</span>
        </div>
        <div className='flex items-center justify-around'>
          <Button className='w-[136px] h-[48px]' disabled={isLoading} onClick={handleUpdateStatus}>Aprovar</Button>
          <Button className='w-[136px] h-[48px] bg-red-500 hover:bg-red-400' onClick={handleCancelOrder} disabled={isLoading}>Cancelar</Button>
        </div>
      </div>
      }

    </Modal>


  );
}
