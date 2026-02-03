import { FormField, IFormState } from './interface';

export const buildInitialFormState = (fields: FormField[]): IFormState => {
  return fields.reduce<IFormState>((initialSchema, field) => {
    if (field.blockType === 'checkbox' || field.blockType === 'switch') {
      initialSchema[field.name] = field.defaultChecked ?? false;
    } else if (
      field.blockType === 'input' ||
      field.blockType === 'textarea' ||
      field.blockType === 'select' ||
      field.blockType === 'radioGroup'
    ) {
      initialSchema[field.name] = field.defaultValue ?? '';
    } else if (field.blockType === 'checkboxGroup') {
      initialSchema[field.name] = field.defaultValue ?? [];
    }

    return initialSchema;
  }, {} as IFormState);
};
