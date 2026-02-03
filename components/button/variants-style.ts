import { cva } from 'class-variance-authority';

export const customButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 relative text-base font-normal ring-offset-primary-light transition-colors ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-7 py-2 min-h-[3rem]',
  {
    variants: {
      /**
       * Buttons may be one of a variety of color variant.
       * Note: The ColorScheme field corresponds to the style field in the design.
       */
      colorScheme: {
        primary:
          'bg-primary text-white hover:bg-primary-dark active:bg-primary',
        secondary:
          'bg-white text-black hover:bg-gray-light hover:text-black active:bg-primary active:text-white',
      },
    },
    defaultVariants: {
      colorScheme: 'primary',
    },
  }
);
