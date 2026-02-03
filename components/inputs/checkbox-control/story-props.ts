import { ICheckboxControl } from './interface';

export const checkboxControlProps: Omit<ICheckboxControl, 'onChange'> = {
  name: 'Checkbox',
  checked: false,
  disabled: false,
  state: 'base',
};
