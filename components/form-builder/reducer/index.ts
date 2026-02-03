import { IFormState } from '../interface';
import { IFormReducerState, FormReducerAction } from './interface';

export const initialFormReducerState: IFormReducerState = {
  formState: {},
  isLoading: false,
  success: false,
  error: undefined,
};

/**
 * Manages form state including loading, success, errors, and form data.
 */
export function formReducer(
  state: IFormReducerState,
  action: FormReducerAction
): IFormReducerState {
  switch (action.type) {
    case 'UPDATE_FORM_STATE': {
      // The update action is for a regular input field
      if ('target' in action.payload.event) {
        const element = action.payload.event.target;

        if (
          element.type !== 'checkbox' ||
          (element.type === 'checkbox' &&
            action.payload.blockType !== 'checkboxGroup')
        ) {
          /**
           * The updated field value. If the field is a checkbox,
           * use the checked value.
           */
          const updatedField: IFormState = {
            [element.name]:
              element.type === 'checkbox' && element instanceof HTMLInputElement
                ? element.checked
                : element.value,
          };

          return updateSingleValueField(updatedField, state);
        } else if (
          element.type === 'checkbox' &&
          element instanceof HTMLInputElement &&
          action.payload.blockType === 'checkboxGroup'
        ) {
          const { name, value } = element;

          const existingValues = state.formState[name] || [];

          if (!Array.isArray(existingValues)) {
            throw new Error(`Field ${name} is not an array`);
          }

          // Toggle the value in the array field
          const updatedValues = existingValues.includes(value)
            ? existingValues.filter((item) => item !== value)
            : [...existingValues, value];

          return {
            ...state,
            formState: { ...state.formState, [name]: updatedValues },
            // Remove errors related to the field
            error: updateErrors([name], state.error),
          };
        } else {
          console.error(
            `Unhandled input: The input with name "${element.name}" is not handled. Please add appropriate handling for this input.`
          );
        }
      }

      // The update action is for a select field
      if ('name' in action.payload.event) {
        const updatedField: IFormState = {
          [action.payload.event.name]: action.payload.event.value,
        };

        return updateSingleValueField(updatedField, state);
      }
    }
    case 'RESET_STATE': {
      return initialFormReducerState;
    }
    case 'SET_SUBMIT_RESPONSE': {
      return { ...state, ...action.payload };
    }
    case 'SET_IS_LOADING': {
      return { ...state, isLoading: action.payload.isLoading };
    }
    case 'SET_ERROR': {
      return { ...state, error: action.payload.error };
    }
    default: {
      return state;
    }
  }
}

function updateErrors(keys: string[], errors: IFormReducerState['error']) {
  const updatedError: IFormReducerState['error'] = { ...errors };

  keys.forEach((key) => {
    if (key in updatedError) {
      delete updatedError[key as keyof IFormState];
    }
  });

  return updatedError;
}

function updateSingleValueField(
  updatedFieldState: IFormState,
  state: IFormReducerState
): IFormReducerState {
  const updatedFormState = {
    ...state.formState,
    ...updatedFieldState,
  };

  return {
    ...state,
    formState: updatedFormState,
    error: updateErrors(Object.keys(updatedFieldState), state.error),
  };
}
