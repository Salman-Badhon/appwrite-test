'use client';

import { useReducer } from 'react';
import { cn } from '@/lib/shadcn/utils';
import { InputControl } from '@/components/inputs/input-control';
import { SelectControl } from '@/components/inputs/select-control';
import { InputHeading } from '@/components/inputs/common/input-heading';
import { RadioControl } from '@/components/inputs/radio-control';
import { StatusText } from '@/components/inputs/common/status-text';
import { CheckboxControl } from '@/components/inputs/checkbox-control';
import { SwitchControl } from '@/components/inputs/switch-control';
import { CustomButton } from '@/components/button';
import { Typography } from '@/components/typography';
import { formReducer, initialFormReducerState } from './reducer';
import { flushSync } from 'react-dom';
import {
  IFormBuilder,
  IFormStatusState,
  type FormField,
  type FormFieldUpdateEvent,
} from './interface';
import { TextareaControl } from '../inputs/textarea-control';
import { buildInitialFormState } from './utils';
import { Width } from './sub-components/width';
import { simpleFetch } from '@/lib/simple-fetch';
import { useRouter } from 'next/navigation';
import { validateFormBuilderFields } from './reducer/validation';

// Styles
const inlineWrapperClasses = cn('flex flex-wrap gap-x-4 gap-y-2');
const inputItemParentClasses = cn('flex flex-row items-center gap-2 text-base');
const inputGroupParentClasses = cn('grid gap-1');

export function FormBuilder({
  fields,
  submitButtonLabel,
  submitEndpoint,
  onSubmitAction,
}: IFormBuilder) {
  const router = useRouter();

  const [state, dispatch] = useReducer(formReducer, {
    ...initialFormReducerState,
    formState: buildInitialFormState(fields),
  });

  function handleFormFieldUpate(
    e: FormFieldUpdateEvent,
    blockType: FormField['blockType']
  ) {
    dispatch({
      type: 'UPDATE_FORM_STATE',
      payload: {
        event: e,
        blockType,
      },
    });
  }

  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validateFormBuilderFields({
      formState: state.formState,
      fields,
    });

    dispatch({ type: 'SET_ERROR', payload: { error: errors } });

    // Prevent form submission if there are validation errors
    if (errors && Object.keys(errors).length > 0) {
      return;
    }

    // Set isLoading to true immediately
    flushSync(() => {
      dispatch({ type: 'SET_IS_LOADING', payload: { isLoading: true } });
    });

    // Handle form submission
    const response = await simpleFetch<
      null,
      Pick<IFormStatusState, 'fieldErrors' | 'errorMessage'>
    >(
      submitEndpoint,
      {
        body: JSON.stringify({
          fields,
          formState: state.formState,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
      5000
    );

    // Consider rendering form message based on confirmation config and response
    let message: string | undefined = undefined;

    if (!response.success) {
      if (response.error.name === 'AbortError') {
        message = 'Request timed out';
      } else {
        message = response.error.body?.errorMessage;
      }
    } else {
      if (onSubmitAction.type == 'message') {
        message = onSubmitAction.message || 'Form submitted successfully!';
      }
    }

    // Handle form submission response
    dispatch({
      type: 'SET_SUBMIT_RESPONSE',
      payload: {
        message,
        success: response.success,
        error: response.error?.body?.fieldErrors,
        isLoading: false,
      },
    });

    if (
      response.success &&
      onSubmitAction.type == 'redirect' &&
      onSubmitAction.redirect
    ) {
      handleResetForm();
      router.push(onSubmitAction.redirect);
    }
  }

  function handleResetForm() {
    dispatch({ type: 'RESET_STATE' });
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={handleSubmitForm}
      onReset={handleResetForm}
    >
      <div
        className="-mx-2 grid gap-y-4"
        style={{
          gridTemplateColumns: `repeat(100, 1fr)`,
        }}
      >
        {fields.map((field, key) => {
          if (!field.name || typeof field.name !== 'string') {
            throw new Error(
              'Form field must have a name. Please provide a name for the field.'
            );
          }

          switch (field.blockType) {
            case 'input': {
              const value = state.formState[field.name];
              const processedValue =
                typeof value === 'number' ? value : value?.toString() || '';

              return (
                <Width width={field.width} key={key}>
                  <InputControl
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.validationRules.required}
                    message={state?.error?.[field.name]}
                    value={processedValue}
                    state={state?.error?.[field.name] ? 'error' : 'base'}
                    disabled={state.isLoading}
                    showIcon={false}
                    autoComplete="on"
                    onChange={(e) => {
                      handleFormFieldUpate(e, field.blockType);
                    }}
                  />
                </Width>
              );
            }
            case 'textarea': {
              const value = state.formState[field.name];
              const processedValue = value?.toString() || '';

              return (
                <Width width={field.width} key={key}>
                  <TextareaControl
                    key={key}
                    label={field.label}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.validationRules.required}
                    message={state?.error?.[field.name]}
                    value={processedValue}
                    state={state?.error?.[field.name] ? 'error' : 'base'}
                    disabled={state.isLoading}
                    autoComplete="on"
                    onChange={(e) => {
                      handleFormFieldUpate(e, field.blockType);
                    }}
                  />
                </Width>
              );
            }
            case 'select': {
              const value = state.formState[field.name];
              const processedValue = value?.toString() || '';

              return (
                <Width width={field.width} key={key}>
                  <SelectControl
                    label={field.label}
                    name={field.name}
                    items={field.options}
                    required={field.validationRules.required}
                    message={state?.error?.[field.name]}
                    value={processedValue}
                    state={state?.error?.[field.name] ? 'error' : 'base'}
                    disabled={state.isLoading}
                    onChange={({ name, value }) => {
                      handleFormFieldUpate({ name, value }, field.blockType);
                    }}
                  />
                </Width>
              );
            }
            case 'checkbox': {
              const checked =
                state.formState[field.name]?.toString() === 'true' || false;

              return (
                <Width
                  className={inputGroupParentClasses}
                  width={field.width}
                  key={key}
                >
                  <label className={inputItemParentClasses} key={key}>
                    <CheckboxControl
                      key={key}
                      name={field.name}
                      required={field.validationRules.required}
                      message={state?.error?.[field.name]}
                      checked={checked}
                      state={state?.error?.[field.name] ? 'error' : 'base'}
                      disabled={state.isLoading}
                      onChange={(e) => {
                        handleFormFieldUpate(e, field.blockType);
                      }}
                    />
                    {field.label && <span>{field.label}</span>}
                  </label>

                  {!!state?.error?.[field.name] && (
                    <StatusText
                      state="error"
                      message={state.error[field.name] || ''}
                      disabled={state.isLoading}
                    />
                  )}
                </Width>
              );
            }
            case 'switch': {
              const checked =
                state.formState[field.name]?.toString() === 'true' || false;

              return (
                <Width
                  className={inputGroupParentClasses}
                  width={field.width}
                  key={key}
                >
                  <label className={inputItemParentClasses} key={key}>
                    <SwitchControl
                      name={field.name}
                      required={field.validationRules.required}
                      message={state?.error?.[field.name]}
                      checked={checked}
                      state={state?.error?.[field.name] ? 'error' : 'base'}
                      disabled={state.isLoading}
                      onChange={(e) => {
                        handleFormFieldUpate(e, field.blockType);
                      }}
                    />
                    {field.label && <span>{field.label}</span>}
                  </label>

                  {!!state?.error?.[field.name] && (
                    <StatusText
                      state="error"
                      message={state.error[field.name] || ''}
                      disabled={state.isLoading}
                    />
                  )}
                </Width>
              );
            }
            case 'checkboxGroup': {
              return (
                <Width
                  className={inputGroupParentClasses}
                  width={field.width}
                  key={key}
                >
                  <InputHeading
                    label={field.label || ''}
                    tagName="legend"
                    disabled={state.isLoading}
                    required={!!field.validationRules.min}
                  />
                  <div className={inlineWrapperClasses}>
                    {field.options.map((option, key) => {
                      const value = state.formState[field.name];
                      const checked =
                        (Array.isArray(value) &&
                          value.includes(option.value)) ||
                        false;

                      return (
                        <label className={inputItemParentClasses} key={key}>
                          <CheckboxControl
                            key={key}
                            name={field.name}
                            required={!!field.validationRules.min}
                            message={state?.error?.[field.name]}
                            checked={checked}
                            value={option.value}
                            state={
                              state?.error?.[field.name] ? 'error' : 'base'
                            }
                            disabled={state.isLoading}
                            onChange={(e) => {
                              handleFormFieldUpate(e, field.blockType);
                            }}
                          />
                          {option.label && <span>{option.label}</span>}
                        </label>
                      );
                    })}
                  </div>
                  {!!state?.error?.[field.name] && (
                    <StatusText
                      state="error"
                      message={state.error[field.name] || ''}
                      disabled={state.isLoading}
                    />
                  )}
                </Width>
              );
            }
            case 'radioGroup': {
              return (
                <Width
                  className={inputGroupParentClasses}
                  width={field.width}
                  key={key}
                >
                  <InputHeading
                    label={field.label || ''}
                    tagName="legend"
                    disabled={state.isLoading}
                    required={field.validationRules.required}
                  />
                  <div className={inlineWrapperClasses}>
                    {field.options.map((option, key) => {
                      const value = state.formState[field.name];
                      const checked = value === option.value || false;

                      return (
                        <label className={inputItemParentClasses} key={key}>
                          <RadioControl
                            key={key}
                            name={field.name}
                            required={field.validationRules.required}
                            message={state?.error?.[field.name]}
                            checked={checked}
                            value={option.value}
                            state={
                              state?.error?.[field.name] ? 'error' : 'base'
                            }
                            disabled={state.isLoading}
                            onChange={(e) => {
                              handleFormFieldUpate(e, field.blockType);
                            }}
                          />
                          {option.label && <span>{option.label}</span>}
                        </label>
                      );
                    })}
                  </div>

                  {!!state?.error?.[field.name] && (
                    <StatusText
                      state="error"
                      message={state.error[field.name] || ''}
                      disabled={state.isLoading}
                    />
                  )}
                </Width>
              );
            }
            default:
              return null;
          }
        })}
      </div>

      {/* Buttons  */}
      <div className="flex flex-wrap items-center gap-2">
        <CustomButton
          colorScheme="primary"
          loading={state.isLoading}
          disabled={false}
          type="submit"
        >
          {submitButtonLabel}
        </CustomButton>
      </div>

      {/* Render success message or server side error message */}
      {!state.isLoading &&
        state.message &&
        (state?.success || (!state?.success && !state?.error)) && (
          <Typography
            size="c1"
            className={cn(state?.success ? 'text-success' : 'text-danger')}
          >
            {state?.message}
          </Typography>
        )}
    </form>
  );
}
