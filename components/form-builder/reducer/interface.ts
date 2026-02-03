import {
  IFormState,
  type FormField,
  type FormFieldUpdateEvent,
} from '../interface';

export interface IFormReducerState {
  formState: IFormState;
  isLoading: boolean;
  success: boolean;
  message?: string;
  error?: Partial<Record<keyof IFormState, string>>;
}

export type FormReducerAction =
  | {
      type: 'UPDATE_FORM_STATE';
      payload: {
        event: FormFieldUpdateEvent;
        blockType: FormField['blockType'];
      };
    }
  | {
      type: 'RESET_STATE';
    }
  | {
      type: 'SET_IS_LOADING';
      payload: { isLoading: boolean };
    }
  | {
      type: 'SET_SUBMIT_RESPONSE';
      payload: {
        success: boolean;
        message?: string;
        error?: Partial<Record<keyof IFormState, string>>;
        isLoading: boolean;
      };
    }
  | {
      type: 'SET_ERROR';
      payload: { error: IFormReducerState['error'] };
    };
