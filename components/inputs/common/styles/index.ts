import { cn } from '@/lib/shadcn/utils';
import { IInputControl } from '../../input-control/interface';

type Params = Pick<IInputControl, 'className' | 'disabled'> & {
  isError?: boolean;
  isValue?: boolean;
  isSuccess?: boolean;
};

export function inputFieldCommonClassesGenerator({
  isError,
  isValue,
  isSuccess,
  disabled,
  className,
}: Params): string {
  return cn(
    // Layout styles
    'flex items-center min-h-[3rem] w-full rounded-lg px-3 py-1',

    // General styles
    ' bg-white text-black placeholder:text-gray-dark text-sm',

    // Border styles
    ' border border-solid border-gray-light',

    // Hover styles
    'hover:border-gray-dark',

    // Focus styles
    'focus:border-black focus:ring-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0',

    // Disabled styles
    'disabled:text-gray-light disabled:placeholder:text-gray-light',

    // Animation
    'transition-all duration-300',

    // Border style
    {
      'border-black hover:border-black focus:border-black': isValue,
      'border-danger hover:border-danger focus:border-danger': isError,
      'border-success hover:border-success focus:border-success': isSuccess,
      'border-gray-light hover:border-gray-light focus:border-gray-light':
        disabled,
    },

    // Additional custom className (optional)
    className
  );
}
