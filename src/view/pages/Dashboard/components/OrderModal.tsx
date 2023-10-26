import { Cross2Icon } from '@radix-ui/react-icons';
import { Modal } from '../../../components/Modal';
import { userOrderModalController } from './userOrderModalController';

interface OrderModalProps {
  visible: boolean;
  orderId: number | undefined;
  onClose?(): void;
}

export function OrderModal({ visible, orderId, onClose }: OrderModalProps) {

  if(!visible || !orderId){
    return null;
  }

  const { order } = userOrderModalController(orderId);

  return (
    <Modal open={visible} onClose={onClose}>
      {order?.orderId &&
      <div>
        <header className='flex items-center justify-between'>
          <span>Pedido Número: {order.orderId}</span>
          <button
            className='h-8 w-8 flex items-center justify-center bg-red-500 rounded-sm'
            onClick={onClose}
          >
            <Cross2Icon className='h-8 w-8 text-white'/>
          </button>
        </header>
        <span>Status: {order.status}</span>
        {order.orderProduct.map((product) => (
          <div key={product.orderProductId}>
            <div className='flex items-center justify-between'>
              <p>{product.quantity}</p>
              <p>{product.product.name}</p>
              <p>{product.quantity * product.product.price}</p>
            </div>
            <p>{product.product.price}</p>
          </div>
        ))}
        <span>{order.total}</span>
      </div>
      }

    </Modal>


  );
}
