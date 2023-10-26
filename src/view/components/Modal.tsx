import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose?(): void;
}

export function Modal({ open, children, onClose }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm transition-opacity"/>
        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[480px] rounded-lg p-8 shadow-lg outline-none'>
          {children}
        </Dialog.Content>
      </Dialog.Portal >
    </Dialog.Root>
  );
}
