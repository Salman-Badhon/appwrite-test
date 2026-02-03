import { InputHTMLAttributes } from 'react';
import { IInputs } from '../common/interface';

export type ISwitchControl = IInputs<
  (params: { name: string; value: boolean }) => void
> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'>;
