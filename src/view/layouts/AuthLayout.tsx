import { Outlet } from 'react-router-dom';
import { Logo } from '../components/Logo';

export function AuthLayout() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <Logo className="text-red-500 h-20"/>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
