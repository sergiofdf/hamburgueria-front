import { Spinner } from '../../components/Spinner';
import { HeaderManutencao } from './components/HeaderManutencao';
import { useManutencaoController } from './useManutencaoController';

export function Manutencao() {

  const {
    isLoading,
  } = useManutencaoController();


  return(
    <>
      {isLoading && (
        <div className='w-full h-full flex items-center justify-center translate-y-[-120px]'>
          <Spinner className='w-12 h-12 fill-red-500'/>
        </div>
      )}
      {(!isLoading) && (
        <div className='flex justify-center w-full mt-10'>
          <HeaderManutencao />
          <div className='w-full grid grid-cols-1 xl:grid-cols-2 gap-y-16 justify-items-center'>
            Teste
          </div>
        </div>
      )}
    </>
  );
}
