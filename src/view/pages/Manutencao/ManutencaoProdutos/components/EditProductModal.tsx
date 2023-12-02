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
  if(product){
    const {
      errors,
      handleSubmit,
      register,
      //control,
      isLoading,
    } = useProductUpdateController(product);

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


          </div>

          <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
            Salvar
          </Button>
        </form>
      </Modal>
    );
  }

  return(<></>);


}
