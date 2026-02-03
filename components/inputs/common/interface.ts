export interface IInputs<T> {
  /** The name of the control. */
  name: string;
  /** Event handler for when the value changes. */
  onChange: T;
  /** Specifies whether the control is disabled. */
  disabled?: boolean;
  /** Additional CSS class names for styling purposes. */
  className?: string;
  /** ARIA label for accessibility purposes. */
  ariaLabel?: string;
  // CSS class name for styling the message
  messageClassName?: string;
  /** Determine the state of the inputs. */
  state: 'success' | 'error' | 'base';
  /** any message of the input . */
  message?: string;
}
