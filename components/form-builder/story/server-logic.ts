import type { IFormBuilder, IFormState, IFormStatusState } from '../interface';
import { validateFormBuilderFields } from '../reducer/validation';

/**
 * Mock API route.
 *
 * This function simulates server-side logic for processing form submissions.
 * You should create a similar API route in the `api` folder to handle form submissions.
 *
 * Make sure to return a Response object with
 * - IFormStatusState object in the body
 * - Appropriate status code (200, 400, 500, etc.)
 */
export async function exampleFormServerLogic(req: Request) {
  try {
    const formData: {
      fields: IFormBuilder['fields'];
      formState: IFormState;
    } = await req.json();

    const validationErrors = validateFormBuilderFields({
      fields: formData.fields,
      formState: formData.formState,
    });

    // If there are validation errors, respond with 400
    if (Object.keys(validationErrors).length > 0) {
      const errorResponse: IFormStatusState = {
        success: false,
        errorMessage: 'Form validation failed',
        fieldErrors: validationErrors,
      };

      return new Response(JSON.stringify(errorResponse), { status: 400 });
    }

    // Process the data (e.g., save it to a database)
    // Example: console.log(formData);
    // You can integrate with your backend or database here
    const successResponse: IFormStatusState = {
      success: true,
    };

    return new Response(JSON.stringify(successResponse), { status: 200 });
  } catch (error) {
    console.error('Error processing form submission:', error);

    const errorResponse: IFormStatusState = {
      success: false,
      errorMessage: 'An error occurred while processing the form.',
    };

    return new Response(JSON.stringify(errorResponse), { status: 500 });
  }
}
