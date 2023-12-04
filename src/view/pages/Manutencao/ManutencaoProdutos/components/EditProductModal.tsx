import { Modal } from '../../../../components/Modal';
import { Button } from '../../../../components/Button';
import { Product } from '../../../../../app/entities/Product';
import { useProductUpdateController } from './useProductUpdateController';
import { InputFundoBranco } from '../../../../components/InputFundoBranco';
import { Cross2Icon } from '@radix-ui/react-icons';

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
    handleFileChange,
    file
  } = useProductUpdateController(product, onClose);

  return (
    <Modal
      open={visible}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>

        <header className='flex items-center justify-between text-2xl'>
          <span>Edição produto</span>
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

          <div className='flex items-center justify-between gap-4'>
            {!file &&
              <img src={`http://localhost:3000/products/getImage/${product?.productId}`} alt={product?.name} width="24px"/>
            }

            <input type='file' onChange={handleFileChange}/>
            <InputFundoBranco
              className='text-gray-600 border-b-black'
              type="text"
              placeholder="Imagem"
              error={errors.imageUrl?.message}
              {...register('imageUrl')}
            />
          </div>



        </div>

        <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );

}
