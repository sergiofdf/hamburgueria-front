import { Modal } from '../../../../components/Modal';
import { Button } from '../../../../components/Button';
import { InputFundoBranco } from '../../../../components/InputFundoBranco';
import { Cross2Icon, TrashIcon } from '@radix-ui/react-icons';
import { Order } from '../../../../../app/entities/Order';
import { useOrderUpdateController } from './useOrderUpdateController';

interface EditOrderModalProps {
  visible: boolean;
  order: Order | undefined;
  onClose?(): void;
}

export function EditOrderModal({ order, visible, onClose }: EditOrderModalProps) {

  const {
    handleSubmit,
    register,
    errors,
    handleOrderProductRemotion
  } = useOrderUpdateController(order, onClose);

  return (
    <Modal
      open={visible}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>

        <header className='flex items-center justify-between text-2xl'>
          <span>Edição pedido</span>
          <button
            className='h-8 w-8 flex items-center justify-center bg-red-500 rounded-sm'
            onClick={onClose}
          >
            <Cross2Icon className='h-8 w-8 text-white'/>
          </button>
        </header>

        <div className="mt-10 flex flex-col gap-4">
          {order?.orderProduct.map( orderProduct => (
            <div key={orderProduct.orderProductId} className='flex items-center justify-between'>
              <InputFundoBranco
                className='text-gray-600 border-b-black w-14'
                type="text"
                placeholder="Qt"
                error={errors.quantity?.message}
                {...register('quantity')}
              />
              <span className='w-[200px]'>{orderProduct.product.name}</span>
              <img
                src={`http://localhost:3000/products/getImage/${orderProduct.product.productId}`}
                className='w-12'
              />

              <button
                className='text-red-500 hover:text-red-300 transition-all'
                onClick={() => handleOrderProductRemotion(orderProduct.orderProductId)}
              >
                <TrashIcon className='h-5 w-5 md:h-8 md:w-8' />
              </button>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full mt-6" isLoading={false}>
          Salvar
        </Button>
      </form>
    </Modal>
  );

}
