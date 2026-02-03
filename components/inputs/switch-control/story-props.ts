import { ISwitchControl } from './interface';

export const switchControlProps: Omit<ISwitchControl, 'onChange'> = {
  name: 'Switch-1',
  checked: false,
  id: 'switch-1',
  disabled: false,
  state: 'base',
};
