import { useUniqueId } from '@/lib/hooks/unique-id';
import { ITextareaControl } from './interface';
import styles from '../common/styles/input-style.module.css';
import { InputHeading } from '../common/input-heading';
import { inputFieldCommonClassesGenerator } from '../common/styles';
import { cn } from '@/lib/shadcn/utils';
import { StatusText } from '../common/status-text';
import { HelperText } from '../common/helper-text';

/** A flexible textarea component with built-in error handling and helper text.
 * It supports custom styling and is optimized for accessibility and usability.
 */
export function TextareaControl({
  name,
  value,
  onChange,
  placeholder,
  label,
  required,
  disabled,
  message,
  state,
  helperText,
  className,
  labelClassName,
  helperTextClassName,
  messageClassName,
  ariaLabel,
}: ITextareaControl) {
  const uniqueId = useUniqueId();
  const isValue = value?.toString().length > 0;
  const textareaClassName = cn(
    styles['default-form-input'],
    'resize-none min-h-[5rem] p-3',
    // Additional custom className (optional)
    className
  );
  return (
    <div className="flex w-full flex-col gap-1">
      <div className="relative flex w-full flex-col gap-1">
        {label && (
          <InputHeading
            htmlFor={uniqueId}
            label={label}
            required={required}
            disabled={disabled}
            className={labelClassName}
            tagName="label"
          />
        )}
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          id={uniqueId}
          disabled={disabled}
          className={inputFieldCommonClassesGenerator({
            className: textareaClassName,
            disabled: disabled,
            isError: state === 'error',
            isSuccess: state === 'success',
            isValue,
          })}
          aria-disabled={disabled}
          aria-invalid={state === 'error'}
          aria-label={ariaLabel}
        />
      </div>

      {/* Status message  */}
      {message && (
        <StatusText
          message={message}
          state={state}
          className={messageClassName}
          disabled={disabled}
        />
      )}

      {/* Helper text  */}
      {helperText && (
        <HelperText
          message={helperText}
          className={helperTextClassName}
          disabled={disabled}
        />
      )}
    </div>
  );
}
