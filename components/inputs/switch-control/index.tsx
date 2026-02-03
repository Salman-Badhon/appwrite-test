import { Switch } from '@/components/ui/switch';
import { ISwitchControl } from './interface';
import { cn } from '@/lib/shadcn/utils';

/**
 * `SwitchControl` component toggles between true and false values
 * which also includes error handling and a disabled property.
 */
export const SwitchControl = ({
  name,
  checked,
  id,
  disabled,
  className,
  onChange,
  ariaLabel,
  state,
}: ISwitchControl) => {
  const switchClasses = cn(
    /** Default style */
    'h-[1.125rem] w-9 border transition-all duration-300 [&>span]:size-[0.875rem]',

    /** Unchecked Style */
    // Default Style
    'data-[state=unchecked]:bg-gray-dark data-[state=unchecked]:border-gray-dark data-[state=unchecked]:[&>span]:translate-x-[0.0625rem]',
    // Hover Style
    'data-[state=unchecked]:hover:bg-black data-[state=unchecked]:hover:border-black',

    /** Checked Style */
    // Default Style
    'data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:[&>span]:translate-x-[1.1875rem]',

    /** Error Style */
    state === 'error' && '!border-danger',
    /** Disable Style */
    'disabled:!bg-gray-light disabled:!border-gray-light',
    className
  );
  return (
    <Switch
      name={name}
      checked={checked}
      id={id}
      disabled={disabled}
      className={switchClasses}
      onCheckedChange={(value) => onChange({ name, value })}
      aria-label={ariaLabel || 'Toggle switch'}
      aria-disabled={disabled}
      aria-invalid={state === 'error'}
    />
  );
};
