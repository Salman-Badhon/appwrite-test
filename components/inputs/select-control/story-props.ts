import { ISelectControl } from './interface';

export const selectControlProps: Omit<ISelectControl, 'onChange'> = {
  name: 'Language',
  value: '',
  items: [
    {
      label: 'Select a language',
      value: '',
    },
    {
      label: 'Java',
      value: 'java',
    },
    {
      label: 'C++',
      value: 'c++',
    },
    {
      label: 'Python',
      value: 'python',
    },
    {
      label: 'Javascript',
      value: 'javascript',
    },
  ],
  label: 'language',
  disabled: false,
  required: false,
  helperText: 'Helper Text',
  state: 'base',
};
