import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useRegisterController } from './useRegisterController';

export function Register() {
  const {errors, handleSubmit, register, isLoading} = useRegisterController();
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-white text-center text-3xl font-bold">Cadastro: preencha seus dados</h1>
      <form
        className="flex flex-col items-center gap-8 w-80"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder='Nome'
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          type="email"
          placeholder='E-mail'
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          type="password"
          placeholder='Senha'
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          type="text"
          placeholder='Celular'
          error={errors.phone_number?.message}
          {...register('phone_number')}
        />
        <Button type="submit" className='mt-2 w-full' isLoading={isLoading}>CADASTRAR</Button>
        <div className="text-start w-full">
          <p className="text-white">Já tem conta?</p>
          <Link to="/login" className="text-red-500">Clique aqui para acessar a tela de Login</Link>
        </div>
      </form>
    </div>
  );
}
