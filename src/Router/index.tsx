import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthGuard } from './AuthGuard';
import { Login } from '../view/pages/Login';
import { Register } from '../view/pages/Register';
import { AuthLayout } from '../view/layouts/AuthLayout';
import { Header } from '../view/components/Header';
import { Operacao } from '../view/pages/Dashboard';
import { Cozinha } from '../view/pages/Cozinha/Cozinha';
import { Financeiro } from '../view/pages/Financeiro/Financeiro';
import { Manutencao } from '../view/pages/Manutencao/Manutencao';

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
            <Route path="/manutencao" element={<Manutencao />} />
          </Route>
        </Route>
      </Routes>

    </BrowserRouter>
  );
}
