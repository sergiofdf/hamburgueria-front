import { Modal } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Spinner } from '../../../components/Spinner';
import { productsService } from '../../../../app/services/productsService';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface ConfirmationModalProps {
  visible: boolean;
  itemId: number | undefined;
  itemName: string | undefined;
  onClose?(): void;
}

export function ConfirmationModal({ itemId, itemName, visible, onClose }: ConfirmationModalProps) {

  const [ isLoadingDelete, setIsLoadingDelete ] = useState(false);

  const queryClient = useQueryClient();

  async function handleDelete(){
    const path = window.location.pathname;
    if(path.includes('produtos')){
      try {
        setIsLoadingDelete(true);
        await productsService.deleteProduct(itemId!);
        queryClient.invalidateQueries({ queryKey: ['listProducts'] });
        setIsLoadingDelete(false);
        toast.success('Produto deletado com sucesso!');
        onClose?.();
      } catch (error) {
        setIsLoadingDelete(false);
        toast.error('Erro ao deletar o produto!');
        onClose?.();
      }
    }
  }

  return (
    <Modal open={visible} onClose={onClose}>
      <div className='text-gray-800 font-bold text-lg space-y-6'>
        <header className='flex items-center justify-between text-2xl text-center'>
          <span className='w-full'>Tem certeza que deseja excluir o item {itemId} - {itemName}?</span>
        </header>
        <div className='flex items-center justify-around'>
          <Button className='w-[136px] h-[48px] bg-red-500 hover:bg-red-400' disabled={isLoadingDelete} onClick={handleDelete}>
            {isLoadingDelete ? <Spinner className='w-6 h-6 fill-green-600'/> : 'Sim'}
          </Button>
          <Button className='w-[136px] h-[48px] bg-gray-400 hover:bg-gray-300' onClick={onClose} disabled={isLoadingDelete}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>

  );
}
