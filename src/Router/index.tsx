import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthGuard } from './AuthGuard';
import { Login } from '../view/pages/Login';
import { Register } from '../view/pages/Register';
import { AuthLayout } from '../view/layouts/AuthLayout';
import { Header } from '../view/components/Header';
import { Operacao } from '../view/pages/Dashboard';
import { Cozinha } from '../view/pages/Cozinha';
import { Financeiro } from '../view/pages/Financeiro';
import { HeaderManutencao } from '../view/pages/Manutencao/components/HeaderManutencao';
import { ManutencaoProdutos } from '../view/pages/Manutencao/ManutencaoProdutos';

export function Router () {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<Header />}>
            <Route path="/" element={<Operacao />}/>
            <Route path="/cozinha" element={<Cozinha />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route element={<HeaderManutencao />}>
              <Route path="/manutencao/produtos" element={<ManutencaoProdutos />} />
            </Route>
          </Route>
        </Route>
      </Routes>

    </BrowserRouter>
  );
}
