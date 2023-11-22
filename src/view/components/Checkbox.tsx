import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { cn } from '../../app/utils/cn';
import { useState } from 'react';

interface CheckboxProps {
  id: string;
  className?: string;
  handleClick?: (checked: boolean) => void;
}

export function Checkbox({id, className, handleClick}: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  function handleCheckClick() {
    setChecked(prevState => (
      !prevState
    ));
    handleClick!(!checked);
  }

  return (
    <RadixCheckbox.Root className={cn('CheckboxRoot bg-transparent border-2 border-white rounded-sm w-6 h-6 flex items-center justify-center', className)} defaultChecked={false} checked={checked} id={id} onCheckedChange={handleCheckClick}>
      <RadixCheckbox.Indicator className="CheckboxIndicator">
        <CheckIcon className='w-6 h-6' />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
