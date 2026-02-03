import { IconStore } from '@/components/icon-store';
import { cn } from '@/lib/shadcn/utils';
import { IInputIcon } from './interface';

export function InputIcon({ state, label, customIcon }: IInputIcon) {
  // common classes for iconStore
  const iconCommonClasses = cn(
    // common classes
    'absolute right-3 top-1/2 cursor-default text-lg leading-none text-success',
    // label depending classes
    label ? 'top-[53%]' : 'top-[30%]',
    //color classes depeding on state
    state === 'success' && 'text-success',
    state === 'error' && 'text-danger'
  );
  /**
   * if customIcon is true it will override the success/error icons.
   */
  if (customIcon) {
    return customIcon;
  } else if (state === 'success' || state === 'error') {
    const iconName = state === 'success' ? 'tick' : 'error';
    return <IconStore iconName={iconName} className={iconCommonClasses} />;
  } else return <></>;
}
