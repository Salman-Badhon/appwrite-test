import { ITextareaControl } from './interface';

export const textareaControlProps: Omit<ITextareaControl, 'onChange'> = {
  value: 'Test',
  name: 'example',
  placeholder: 'Placeholder',
  label: 'Input Label',
  required: true,
  disabled: false,
  state: 'base',
  helperText: 'Helper text',
};
