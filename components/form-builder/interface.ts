import type { ChangeEvent } from 'react';

interface CheckboxField {
  blockType: 'checkbox';
  defaultChecked?: boolean;
  label?: string;
  name: string;
  width?: number;
  validationRules: {
    required: boolean;
  };
}

interface InputField {
  blockType: 'input';
  type: 'text' | 'email' | 'number' | 'tel' | 'url';
  defaultValue?: string | number;
  label?: string;
  placeholder?: string;
  name: string;
  width?: number;
  validationRules: {
    required: boolean;
  };
}

interface RadioGroup {
  blockType: 'radioGroup';
  defaultValue?: string;
  label?: string;
  name: string;
  width?: number;
  options: { label: string; value: string }[];
  validationRules: {
    required: boolean;
  };
}

interface CheckboxGroup {
  blockType: 'checkboxGroup';
  defaultValue?: string[];
  label?: string;
  name: string;
  width?: number;
  options: { label: string; value: string }[];
  validationRules: {
    min?: number;
    max?: number;
  };
}

interface SelectField {
  blockType: 'select';
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  name: string;
  options: { label: string; value: string }[];
  width?: number;
  validationRules: {
    required: boolean;
  };
}

interface SwitchField {
  blockType: 'switch';
  defaultChecked?: boolean;
  label?: string;
  name: string;
  width?: number;
  validationRules: {
    required: boolean;
  };
}

interface TextAreaField {
  blockType: 'textarea';
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  name: string;
  width?: number;
  validationRules: {
    required: boolean;
  };
}

export type FormField =
  | InputField
  | CheckboxField
  | RadioGroup
  | CheckboxGroup
  | SelectField
  | SwitchField
  | TextAreaField;

export interface IFormBuilder {
  formId: string;
  submitButtonLabel: string;
  submitEndpoint: string;
  fields: FormField[];
  onSubmitAction: {
    type: 'message' | 'redirect';
    message?: string;
    redirect?: string;
  };
}

export type IFormState = Record<string, string | number | boolean | string[]>;

export interface IFormStatusState {
  success: boolean;
  errorMessage?: string;
  fieldErrors?: Partial<Record<keyof IFormState, string>>;
}

export type FormFieldUpdateEvent =
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | { name: string; value: string | boolean };
