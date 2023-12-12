import { Modal } from '../../../../components/Modal';
import { Button } from '../../../../components/Button';
import { InputFundoBranco } from '../../../../components/InputFundoBranco';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useOrderAddController } from './useOrderAddController';

interface AddOrderModalProps {
  visible: boolean;
  onClose?(): void;
}

export function AddOrderModal({ visible, onClose }: AddOrderModalProps) {

  const {
    handleSubmit,
    register,
    isLoading,
    errors,
  } = useOrderAddController(onClose);

  return (
    <Modal
      open={visible}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>

        <header className='flex items-center justify-between text-2xl'>
          <span>Criação novo pedido</span>
          <button
            className='h-8 w-8 flex items-center justify-center bg-red-500 rounded-sm'
            onClick={onClose}
          >
            <Cross2Icon className='h-8 w-8 text-white'/>
          </button>
        </header>

        <div className="mt-10 flex flex-col gap-4">
          <InputFundoBranco
            className='text-gray-600 border-b-black'
            type="text"
            placeholder="Id do cliente"
            error={errors.user_id?.message}
            {...register('user_id')}
          />

          <InputFundoBranco
            className='text-gray-600 border-b-black'
            type="text"
            placeholder="Id do produto"
            error={errors.product_id?.message}
            {...register('product_id')}
          />

          <InputFundoBranco
            className='text-gray-600 border-b-black'
            type="text"
            placeholder="Quantidade"
            error={errors.quantity?.message}
            {...register('quantity')}
          />

        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Cadastrar
        </Button>
      </form>
    </Modal>
  );

}
