import { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { IInputs } from '../common/interface';

export type ICheckboxControl = IInputs<ChangeEventHandler<HTMLInputElement>> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'>;
