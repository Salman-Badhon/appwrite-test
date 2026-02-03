import { IInputControl } from './interface';

export const inputControlProps: Omit<IInputControl, 'onChange'> = {
  value: 'Test',
  name: 'example',
  type: 'text',
  placeholder: 'Placeholder',
  label: 'Input Label',
  autoComplete: 'on',
  required: true,
  disabled: false,
  helperText: 'Helper text',
  state: 'base',
  showIcon: false,
};
