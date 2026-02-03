export interface IStatusText {
  /** The message to display */
  message: string;
  /** Whether the component should be disabled */
  disabled?: boolean;
  /** CSS class name for additional styling */
  className?: string;
  /** The state of the status message, determines the text color */
  state: 'success' | 'error' | 'base';
}
