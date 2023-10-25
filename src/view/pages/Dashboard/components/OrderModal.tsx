import { useOrdersCardController } from './useOrdersCardController';

interface OrderModalProps {
  visible: boolean;
  orderId: number | undefined;
}

export function OrderModal({ visible, orderId }: OrderModalProps) {

  if(!visible || !orderId){
    return null;
  }

  const { order } = useOrdersCardController(orderId);


  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity flex items-center justify-center">
      <div className="bg-white w-[480px] rounded-lg p-8">
        {order?.orderId && (
          <div>
            <header>Pedido Número: {order.orderId}</header>
            <span>{order.status}</span>
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
        )}
      </div>
    </div>
  );
}
