import { InputHTMLAttributes } from 'react';
import { IInputs } from '../common/interface';

interface IItem {
  //label of the item
  label: string;
  //value of the item
  value: string;
}
export interface ISelectControl
  extends
    IInputs<(params: { value: string; name: string }) => void>,
    Omit<InputHTMLAttributes<HTMLSelectElement>, 'onChange' | 'name'> {
  // Array of items for the select control.
  items: IItem[];
  // Value for the select control.
  value: string;
  // Label for the select control.
  label?: string;
  // Helper text to provide additional guidance or information.
  helperText?: string;
  // CSS class name for the label.
  labelClassName?: string;
  // CSS class name for the helper text.
  helperTextClassName?: string;
}
