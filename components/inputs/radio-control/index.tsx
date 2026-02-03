import { cn } from '@/lib/shadcn/utils';
import { IRadioControl } from './interface';

/**
 * The `RadioControl` component is a customizable radio button component for rendering
 * the design of a radio button. It can be used with a `fieldset` and `legend` element,
 * or as a standalone component. To make it functional and clickable, wrap it with a
 * label element or use the id and htmlFor attributes to associate it with a clickable title.
 *
 * @example
 * <RadioControl error={true} />
 */
export const RadioControl = ({
  value,
  name,
  checked,
  id,
  disabled,
  className,
  onChange,
  ariaLabel,
  state,
}: IRadioControl) => {
  const radioClasses = cn(
    //Default style
    'border border-solid size-[1.125rem] rounded-full appearance-none border-gray-dark relative flex items-center justify-center after:absolute after:size-[0.75rem] after:rounded-full after:bg-primary after:scale-0 after:transition-all after:duration-300 transition-all duration-300 cursor-pointer',
    //Hover style
    'hover:border-black',
    //Active style
    'checked:border-black checked:after:scale-100',
    //Error Style
    state === 'error' && '!border-danger',
    //Disable style
    'disabled:!border-gray-light disabled:after:!bg-gray-light',
    className
  );
  return (
    <input
      type="radio"
      value={value}
      name={name}
      checked={checked}
      id={id}
      disabled={disabled}
      className={radioClasses}
      onChange={onChange}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    />
  );
};
