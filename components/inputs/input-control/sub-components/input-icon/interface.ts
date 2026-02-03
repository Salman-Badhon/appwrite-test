import type { JSX } from 'react';

export interface IInputIcon {
  /** Determine the state of the input. */
  state: 'success' | 'error' | 'base';
  /** A label for the input control. */
  label?: string;
  /** any custom icon  of the input . */
  customIcon?: JSX.Element;
}
