import { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { IInputs } from '../common/interface';

export interface ITextareaControl
  extends
    IInputs<ChangeEventHandler<HTMLTextAreaElement>>,
    Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'name'> {
  /** The current value of the textarea control. */
  value: string;
  /** A label for the textarea control. */
  label?: string;
  /** A helper text to display below the textarea control. */
  helperText?: string;
  /** CSS class name for the label. */
  labelClassName?: string;
  /** CSS class name for the helper text. */
  helperTextClassName?: string;
}
