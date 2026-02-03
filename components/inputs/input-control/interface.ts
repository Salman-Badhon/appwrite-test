import { InputHTMLAttributes, type JSX } from 'react';
import { ChangeEventHandler } from 'react';
import { IInputs } from '../common/interface';

export interface IInputControl
  extends IInputs<ChangeEventHandler<HTMLInputElement>>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'name'> {
  /** The current value of the input control. */
  value: string | number;
  /** A label for the input control. */
  label?: string;
  /** A helper text to display below the input control. */
  helperText?: string;
  /** CSS class name for the label. */
  labelClassName?: string;
  /** CSS class name for the helper text. */
  helperTextClassName?: string;
  /** any message of the input . */
  showIcon: boolean;
  /** any custom icon  of the input . */
  customIcon?: JSX.Element;
}
