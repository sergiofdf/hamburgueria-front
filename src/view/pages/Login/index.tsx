import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useLoginController } from './useLoginController';

export function Login() {
  const { handleSubmit, register, errors, isLoading } = useLoginController();
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-center text-3xl font-bold text-white ">Entre com seu e-mail e senha para acessar sua conta</h1>
      <form
        className="flex flex-col items-center gap-4 w-80"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <Input
            type="email"
            placeholder="E-mail"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        <div className="w-full">
          <Input
            type="password"
            placeholder="Senha"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>
        <div className="mt-2">
          <p className="text-white">Ainda não é cadastrado?</p>
          <Link to="/register" className="text-red-500">Clique aqui para criar novo cadastro</Link>
        </div>
        <Button className='mt-2 w-full' isLoading={isLoading} type="submit">ENTRAR</Button>
      </form>
    </div>
  );
}
