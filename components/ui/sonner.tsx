'use client';

import { cn } from '@/lib/shadcn/utils';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-right"
      className="toaster group"
      closeButton
      visibleToasts={9}
      toastOptions={{
        classNames: {
          toast: cn(
            'group toast group-[.toaster]:font-primary group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:border-gray group-[.toaster]:shadow-light',

            // icons colors override based on data-type
            '[&[data-type="info"]&_[data-icon]]:text-black',
            '[&[data-type="warning"]&_[data-icon]]:text-warning',
            '[&[data-type="success"]&_[data-icon]]:text-success',
            '[&[data-type="error"]&_[data-icon]]:text-danger'
          ),
          title: cn('group-[.toast]:font-bold group-[.toast]:text-sm'),
          description: cn(
            'group-[.toast]:text-gray-dark group-[.toast]:text-sm group-[.toast]:mt-0.5'
          ),
          actionButton: cn('group-[.toast]:bg-black group-[.toast]:text-white'),
          cancelButton: cn(
            'group-[.toast]:bg-gray-light group-[.toast]:text-black'
          ),
          closeButton: cn('group-[.toast]:bg-white'),
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
