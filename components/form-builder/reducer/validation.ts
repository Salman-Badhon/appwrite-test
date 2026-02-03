import { FormField, IFormState } from '../interface';

export function validateFormBuilderFields({
  formState,
  fields,
}: {
  formState: IFormState;
  fields: FormField[];
}) {
  const validationErrors: Record<string, string> = {};

  // Validate dynamically based on the `required` property
  fields.forEach((field) => {
    const { name, validationRules, blockType } = field;
    if (
      blockType !== 'checkboxGroup' &&
      validationRules.required &&
      !formState[name]
    ) {
      validationErrors[name] = `Required`;
    } else if (
      blockType === 'checkboxGroup' &&
      (validationRules.min !== undefined || validationRules.max !== undefined)
    ) {
      // Check if the field is an array and if the length is less than the minimum value
      if (
        !formState[name] ||
        (Array.isArray(formState[name]) &&
          validationRules?.min &&
          formState[name]?.length < validationRules.min)
      ) {
        validationErrors[name] =
          `Must be at least ${validationRules.min} items`;
      }
      // Check if the field is an array and if the length is greater than the maximum value
      if (
        Array.isArray(formState[name]) &&
        validationRules?.max &&
        formState[name]?.length > validationRules.max
      ) {
        validationErrors[name] = `Must be at most ${validationRules.max} items`;
      }
    }
  });

  return validationErrors;
}
