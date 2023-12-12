import { Modal } from '../../../../components/Modal';
import { Button } from '../../../../components/Button';
import { InputFundoBranco } from '../../../../components/InputFundoBranco';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useCategoryAddController } from './useCategoryAddController';

interface AddCategoryModalProps {
  visible: boolean;
  onClose?(): void;
}

export function AddCategoryModal({ visible, onClose }: AddCategoryModalProps) {

  const {
    handleSubmit,
    register,
    isLoading,
    errors,
  } = useCategoryAddController(onClose);

  return (
    <Modal
      open={visible}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>

        <header className='flex items-center justify-between text-2xl'>
          <span>Criação nova categoria</span>
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
            placeholder="Nome da categoria"
            error={errors.name?.message}
            {...register('name')}
          />

        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Cadastrar
        </Button>
      </form>
    </Modal>
  );

}
