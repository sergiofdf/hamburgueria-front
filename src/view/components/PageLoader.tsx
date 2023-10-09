import { Logo } from './Logo';
import { Spinner } from './Spinner';

export function PageLoader() {
  return(
    <div className='bg-gray-0 fixed top-0 left-0 w-full h-full grid place-items-center'>
      <div className='flex flex-col gap-4 items-center'>
        <Logo className='h-10'/>
        <Spinner className='text-gray-600 fill-red-500'/>
      </div>
    </div>
  );
}
