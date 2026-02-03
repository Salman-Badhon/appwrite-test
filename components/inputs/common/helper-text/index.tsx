import { cn } from '@/lib/shadcn/utils';
import { IHelperText } from './interface';
import { Typography } from '@/components/typography';

/**
 * HelperText component
 *
 * This component displays a helper text message with custom styling.
 *
 * @param {IHelperText} props - The properties object.
 * @param {string} props.message - The helper text message to display.
 * @param {string} [props.className] - Optional additional class names for styling.
 *
 * @returns {JSX.Element} The rendered HelperText component.
 */
export function HelperText({ message, className }: IHelperText) {
  return (
    <Typography size="c1" className={cn('text-gray-dark', className)}>
      {message}
    </Typography>
  );
}
