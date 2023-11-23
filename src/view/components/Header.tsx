import { Link, Outlet } from 'react-router-dom';
import { Logo } from './Logo';
import { useState } from 'react';

export function Header() {

  const [operacaoActive, setOperacaoActive] = useState(true);
  const [cozinhaActive, setCozinhaActive] = useState(false);
  const [financeiroActive, setFinanceiroActive] = useState(false);
  const [manutencaoActive, setManutencaoActive] = useState(false);

  function inactivateAllStates(){
    setOperacaoActive(false);
    setCozinhaActive(false);
    setFinanceiroActive(false);
    setManutencaoActive(false);
  }

  return(
    <>
      <header className='w-full h-[112px] block sm:flex sm:justify-between sm:items-center sm:px-8 px-2'>
        <Logo className='m-4 sm:m-0 md:h-20 sm:h-16 h-6 '/>
        <div className='flex justify-around sm:justify-between items-center lg:w-[50%] sm:w-[70%] w-full font-bold sm:text-base md:text-2xl text-xs'>
          <Link to='/'>
            <span
              className={operacaoActive ? 'text-red-500' : 'text-white'} onClick={()=>{
                inactivateAllStates();
                setOperacaoActive(true);
              }}
            >
              Operação
            </span>
          </Link>
          <Link to='/cozinha'>
            <span
              className={cozinhaActive ? 'text-red-500' : 'text-white'} onClick={()=>{
                inactivateAllStates();
                setCozinhaActive(true);
              }}
            >
              Cozinha
            </span>
          </Link>
          <Link to='/financeiro'>
            <span
              className={financeiroActive ? 'text-red-500' : 'text-white'} onClick={()=>{
                inactivateAllStates();
                setFinanceiroActive(true);
              }}
            >
              Financeiro
            </span>
          </Link>
          <Link to='/manutencao'>
            <span
              className={manutencaoActive ? 'text-red-500' : 'text-white'} onClick={()=>{
                inactivateAllStates();
                setManutencaoActive(true);
              }}
            >
              Manutenção
            </span>
          </Link>
        </div>
      </header>
      <Outlet />
    </>
  );
}
