import { Cross2Icon } from '@radix-ui/react-icons';
import { Modal } from '../../../components/Modal';
import { useOrderModalController } from './useOrderModalController';
import { formatCurrency } from '../../../../app/utils/formatCurrency';
import { Button } from '../../../components/Button';
import { Spinner } from '../../../components/Spinner';
import { OrderStatus, orderStatusConversion } from '../../../../app/entities/Order';

interface OrderModalProps {
  visible: boolean;
  orderId: number | undefined;
  onClose?(): void;
}

export function OrderModal({ orderId, visible, onClose }: OrderModalProps) {

  const { order, isLoading, handleCancelOrder, handleUpdateStatus, isLoadingCancel, isLoadingApproval } = useOrderModalController({id: orderId, onClose});

  const textoStatus = orderStatusConversion.find( status => status.orderStatusCancelEnum == order?.status)?.orderStatusPortugues;

  return (
    <Modal open={visible} onClose={onClose}>
      {(isLoading) &&
        <div className='w-full h-full fixed top-1/2 left-1/2 -translate-x-[24px] -translate-y-[24px]'>
          <Spinner className='w-12 h-12 fill-red-500'/>
        </div>
      }
      {(order?.orderId && !isLoading) &&
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
        <span className='block'>Status: {textoStatus}</span>
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
          {order.status == OrderStatus.WAITING_EVALUATION &&
            <Button className='w-[136px] h-[48px]' disabled={isLoadingCancel} onClick={handleUpdateStatus}>
              {isLoadingApproval ? <Spinner className='w-6 h-6 fill-green-600'/> : 'Aprovar'}
            </Button>
          }
          {order.status != OrderStatus.CANCELLED &&
            <Button className='w-[136px] h-[48px] bg-red-500 hover:bg-red-400' onClick={handleCancelOrder} disabled={isLoadingApproval}>
              {isLoadingCancel ? <Spinner className='w-6 h-6 fill-red-500'/> : 'Cancelar'}
            </Button>
          }
        </div>
      </div>
      }

    </Modal>


  );
}
