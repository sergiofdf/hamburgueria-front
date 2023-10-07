/* eslint-disable react/display-name */
import { ComponentProps, forwardRef } from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from '../../app/utils/cn';

interface InputProps extends ComponentProps<'input'>{
  name: string;
  error?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, placeholder, name, id, className, ...props }, ref) => {
  const inputId = id ?? name;
  return(
    <div className="relative w-full">
      <input
        {...props}
        ref={ref}
        name={name}
        id={inputId}
        className={cn('w-full border-b border-b-white px-4 pt-4 h-12 bg-transparent text-white peer placeholder-shown:pt-0 focus:outline-none focus:border-b-2 autofill:shadow-[inset_0_0_0px_1000px_rgb(55,65,81)] autofill:!text-white',
          error && 'border-b-red-500',
          className
        )}
        placeholder=" "
      />
      <label
        htmlFor={inputId}
        className="absolute text-[10px] left-[15.5px] top-2 text-white pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-[14px] transition-all"
      >
        {placeholder}
      </label>

      {error && (
        <div className='flex gap-2 items-center mt-2 text-red-500 text-sm'>
          <CrossCircledIcon />
          <span>{error}</span>
        </div>
      )}
    </div>

  );
});
Input.displayName = 'Input';
