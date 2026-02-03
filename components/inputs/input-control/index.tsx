'use client';

import { useState } from 'react';
import { IInputControl } from './interface';
import styles from '../common/styles/input-style.module.css';
import { PasswordControl } from './sub-components/password-contol';
import { cn } from '@/lib/shadcn/utils';
import { useUniqueId } from '@/lib/hooks/unique-id';
import { inputFieldCommonClassesGenerator } from '../common/styles';
import { InputHeading } from '../common/input-heading';
import { InputIcon } from './sub-components/input-icon';
import { StatusText } from '../common/status-text';
import { HelperText } from '../common/helper-text';

/** A flexible input component designed for various input types with built-in
 * error handling, helper text, and password visibility toggle. It supports
 * custom styling and is optimized for accessibility and usability.
 */
export function InputControl({
  name,
  type,
  required,
  disabled,
  autoComplete,
  value,
  onChange,
  className,
  placeholder,
  label,
  labelClassName,
  helperText,
  helperTextClassName,
  messageClassName,
  state,
  message,
  showIcon,
  customIcon,
  ariaLabel,
}: IInputControl) {
  const [inputType, setInputType] = useState<IInputControl['type']>(type);
  const uniqueId = useUniqueId();
  const isValue = value?.toString().length > 0;

  // Toggle password visibility
  const handlePasswordView = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  // Generate the class name for the input field
  const inputClassName = cn(
    styles['default-form-input'],
    styles['hide-input-appearance'],
    // Add right padding (pr-9) when the icon is shown on the right side.
    isValue && type === 'password' && 'pr-9',
    showIcon && type !== 'password' && 'pr-9',
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

        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          id={uniqueId}
          disabled={disabled}
          type={type == 'password' ? inputType : type}
          autoComplete={autoComplete ? 'on' : 'off'}
          className={inputFieldCommonClassesGenerator({
            className: inputClassName,
            disabled: disabled,
            isError: state === 'error',
            isSuccess: state === 'success',
            isValue,
          })}
          aria-disabled={disabled}
          aria-invalid={state === 'error'}
          aria-label={ariaLabel}
        />

        {/* Password view and hide control component */}
        {type == 'password' && isValue && (
          <PasswordControl
            type={inputType}
            disabled={disabled}
            className={cn(label ? 'top-[55%]' : 'top-[35%]')}
            onIconClick={handlePasswordView}
          />
        )}

        {type !== 'password' && showIcon && (
          <InputIcon state={state} customIcon={customIcon} label={label} />
        )}
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
