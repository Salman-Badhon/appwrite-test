import { IRadioControl } from './interface';

export const radioControlProps: Omit<IRadioControl, 'onChange'> = {
  name: 'Radio',
  checked: false,
  disabled: false,
  state: 'base',
};
