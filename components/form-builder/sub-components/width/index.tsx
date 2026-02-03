import { cn } from '@/lib/shadcn/utils';
import { ReactNode } from 'react';

export interface IWidth {
  children: ReactNode;
  className?: string;
  width?: number;
}

export function Width({ children, className, width }: IWidth) {
  return (
    <div
      className={cn(
        className,
        // Form element wrapper styles
        'flex flex-col gap-2',
        // This padding is represented in the grid as a gap.
        'px-2'
      )}
      // Here we use the gridColumn property to set the width of the element.
      style={{ gridColumn: `span ${width || 100}` }}
    >
      {children}
    </div>
  );
}
