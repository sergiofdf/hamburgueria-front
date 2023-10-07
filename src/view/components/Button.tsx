import { ComponentProps } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ComponentProps<'button'>{}

export function Button({ className, ...props }: ButtonProps) {
  return(
    <button
      {...props}
      className={cn('bg-green-500 hover:bg-green-400 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed h-12 rounded-lg font-bold text-white transition-all w-full', className)}
    />
  );
}
