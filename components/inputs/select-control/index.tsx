import { useUniqueId } from '@/lib/hooks/unique-id';
import { InputHeading } from '../common/input-heading';
import { ISelectControl } from './interface';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/shadcn/utils';
import { useState } from 'react';
import styles from '../common/styles/input-style.module.css';
import { inputFieldCommonClassesGenerator } from '../common/styles';
import { StatusText } from '../common/status-text';
import { HelperText } from '../common/helper-text';

/**
 * A customizable select control component for form inputs,
 * designed to be flexible and easy to integrate into various forms.
 *
 * This component supports a variety of props to customize its
 * appearance and behavior, including support for labels, error
 * messages, helper text, and more. It also provides a mechanism
 * for handling value changes through a callback function.
 *
 * If you need to implement a revert option, add an item to
 * the `items` array with an empty string value as the first item.
 * This will allow users to deselect a previously selected option,
 * effectively reverting their selection.
 */
export const SelectControl = ({
  name,
  items,
  onChange,
  label,
  required,
  helperText,
  message,
  state,
  labelClassName,
  helperTextClassName,
  value,
  disabled,
  className,
  messageClassName,
  ariaLabel,
}: ISelectControl) => {
  const uniqueId = useUniqueId();
  const isValue = value && value.toString().length > 0 ? true : false;
  const [focus, setFocus] = useState<boolean>(false);
  const placeholderText = !items[0]?.value ? items[0]?.label : '';

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
        <Select
          name={name}
          disabled={disabled}
          onValueChange={(value) => {
            // Here we need to call trim function for work the revert functionality with placeholder
            onChange({ value: value.trim(), name });
          }}
          value={value}
          onOpenChange={setFocus}
        >
          <SelectTrigger
            className={cn(
              inputFieldCommonClassesGenerator({
                isError: state === 'error',
                isSuccess: state === 'success',
                isValue,
                disabled,
                className: cn(
                  className,
                  'opacity-100 disabled:opacity-100' // Prevent default disable style
                ),
              }),
              styles['default-form-input'],
              styles['hide-input-appearance'],
              // Focus Style
              'transition-all duration-700 focus:outline-0 focus:ring-0 focus:ring-offset-0 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:stroke-black [&>svg]:opacity-100 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:data-[state=open]:rotate-180',
              // Placeholder and selected value style
              [isValue ? 'text-black' : 'text-gray-dark']
            )}
            id={uniqueId}
            name={name}
            aria-disabled={disabled}
            aria-required={required}
            aria-invalid={state === 'error'}
            aria-label={
              !!placeholderText?.length
                ? placeholderText
                : ariaLabel || 'Select an option'
            }
          >
            {focus && !isValue ? (
              <span>-</span>
            ) : (
              <SelectValue placeholder={placeholderText} />
            )}
          </SelectTrigger>
          <SelectContent className="bg-white transition-all duration-700">
            {items?.map(({ label, value }, i) => (
              <SelectItem
                key={i}
                value={value || ' '}
                className={cn(
                  'cursor-pointer rounded bg-white transition-all duration-300 hover:bg-gray-light',
                  // Revert option style
                  !value && i == 0 && 'text-black [&_svg]:hidden'
                )}
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
};
