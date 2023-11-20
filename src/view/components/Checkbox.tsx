import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { cn } from '../../app/utils/cn';

interface CheckboxProps {
  checked: boolean;
  id: string;
  className?: string;
}

export function Checkbox({checked, id, className}: CheckboxProps) {
  return (
    <RadixCheckbox.Root className={cn('CheckboxRoot bg-green-500 border-2 border-white rounded-sm w-6 h-6 flex items-center justify-center', className)} defaultChecked checked={checked} id={id}>
      <RadixCheckbox.Indicator className="CheckboxIndicator">
        <CheckIcon className='w-6 h-6' />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
