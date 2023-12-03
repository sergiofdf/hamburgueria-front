import { Modal } from '../../../../components/Modal';
import { Button } from '../../../../components/Button';
import { Product } from '../../../../../app/entities/Product';
import { useProductUpdateController } from './useProductUpdateController';
import { InputFundoBranco } from '../../../../components/InputFundoBranco';

interface EditProductModalProps {
  visible: boolean;
  product: Product | undefined;
  onClose?(): void;
}

export function EditProductModal({ product, visible, onClose }: EditProductModalProps) {

  const {
    handleSubmit,
    register,
    isLoading,
    errors,
  } = useProductUpdateController(product, onClose);

  return (
    <Modal
      open={visible}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>

        <div className="mt-10 flex flex-col gap-4">
          <InputFundoBranco
            className='text-gray-600 border-b-black'
            type="text"
            placeholder="Nome do produto"
            error={errors.name?.message}
            {...register('name')}
          />

          <InputFundoBranco
            className='text-gray-600 border-b-black'
            type="text"
            placeholder="Descrição"
            error={errors.description?.message}
            {...register('description')}
          />

          <InputFundoBranco
            className='text-gray-600 border-b-black'
            type="text"
            placeholder="Dimensão"
            error={errors.size?.message}
            {...register('size')}
          />

          <InputFundoBranco
            className='text-gray-600 border-b-black'
            type="number"
            step="0.01"
            placeholder="Preço"
            error={errors.price?.message}
            {...register('price')}
          />

          <InputFundoBranco
            className='text-gray-600 border-b-black'
            type="number"
            step="0.01"
            placeholder="Categoria"
            error={errors.category_id?.message}
            {...register('category_id')}
          />

          <InputFundoBranco
            className='text-gray-600 border-b-black'
            type="text"
            placeholder="Imagem"
            error={errors.imageUrl?.message}
            {...register('imageUrl')}
          />

        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );

}
