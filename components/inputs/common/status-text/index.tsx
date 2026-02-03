import { cn } from '@/lib/shadcn/utils';
import { Typography } from '@/components/typography';
import { IStatusText } from './interface';

/**
 * StatusText component
 *
 * This component displays a status message with conditional styling based on the state.
 *
 * @param {IStatusText} props - The properties object.
 * @param {string} props.message - The status message to display.
 * @param {'success' | 'error' | 'base'} props.state - The state of the status message, determines the text color.
 * @param {string} [props.className] - Optional additional class names for styling.
 *
 * @returns {JSX.Element} The rendered StatusText component.
 */
export function StatusText({ message, state, className }: IStatusText) {
  return (
    <Typography
      size="c1"
      className={cn(
        state === 'success' && 'text-success',
        state === 'error' && 'text-danger',
        className
      )}
    >
      {message}
    </Typography>
  );
}
