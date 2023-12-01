import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const path = window.location.pathname;
    if(path.includes('categorias')){
      setCategoriasActive(true);
    } else if(path.includes('pedidos')) {
      setPedidosActive(true);
    } else if(path.includes('usuarios')) {
      setUsuariosActive(true);
    } else {
      setProdutosActive(true);
    }
  }, []);

  return(
    <>
      <div className='w-full h-[112px] flex justify-between sm:justify-around sm:text-2xl sm:font-bold items-center px-8'>
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
      <Outlet />
    </>
  );
}
