import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

export function HeaderManutencao() {

  const [produtosActive, setProdutosActive] = useState(true);
  const [categoriasActive, setCategoriasActive] = useState(false);
  const [pedidosActive, setPedidosActive] = useState(false);
  const [usuariosActive, setUsuariosActive] = useState(false);

  function inactivateAllStates(){
    setProdutosActive(false);
    setCategoriasActive(false);
    setPedidosActive(false);
    setUsuariosActive(false);
  }

  return(
    <>
      <div className='w-full h-[112px] block sm:flex sm:justify-between sm:items-center sm:px-8 px-2'>
        <div className='flex justify-around sm:justify-between items-center lg:w-[50%] sm:w-[70%] w-full font-bold sm:text-base md:text-2xl text-xs'>
          <Link to='/manutencao/produtos'>
            <span
              className={produtosActive ? 'text-red-500' : 'text-white'} onClick={()=>{
                inactivateAllStates();
                setProdutosActive(true);
              }}
            >
              Produtos
            </span>
          </Link>
          <Link to='/manutencao/categorias'>
            <span
              className={categoriasActive ? 'text-red-500' : 'text-white'} onClick={()=>{
                inactivateAllStates();
                setCategoriasActive(true);
              }}
            >
              Categorias
            </span>
          </Link>
          <Link to='/manutencao/pedidos'>
            <span
              className={pedidosActive ? 'text-red-500' : 'text-white'} onClick={()=>{
                inactivateAllStates();
                setPedidosActive(true);
              }}
            >
              Pedidos
            </span>
          </Link>
          <Link to='/manutencao/usuarios'>
            <span
              className={usuariosActive ? 'text-red-500' : 'text-white'} onClick={()=>{
                inactivateAllStates();
                setUsuariosActive(true);
              }}
            >
              Usuários
            </span>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
