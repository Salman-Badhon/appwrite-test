import type { IFormBuilder } from '../interface';

export const formBuilderProps: IFormBuilder = {
  formId: 'form-builder-form',
  submitEndpoint: '/api/form',
  submitButtonLabel: 'Submit',
  onSubmitAction: {
    type: 'message',
    message: 'Form submitted successfully',
  },
  fields: [
    {
      blockType: 'input',
      name: 'fname',
      type: 'text',
      label: 'First Name',
      width: 50,
      validationRules: {
        required: true,
      },
    },
    {
      blockType: 'input',
      name: 'lname',
      type: 'text',
      label: 'Last Name',
      width: 50,
      validationRules: {
        required: false,
      },
    },
    {
      blockType: 'input',
      name: 'email',
      type: 'email',
      label: 'Email',
      width: 100,
      validationRules: {
        required: true,
      },
    },
    {
      blockType: 'input',
      name: 'phone',
      type: 'tel',
      label: 'Phone',
      width: 100,
      validationRules: {
        required: true,
      },
    },
    {
      blockType: 'select',
      name: 'jobLocation',
      label: 'Job Location',
      width: 100,
      options: [
        {
          label: 'Select Location',
          value: '',
        },
        {
          label: 'New York',
          value: 'NY',
        },
        {
          label: 'San Francisco',
          value: 'SF',
        },
        {
          label: 'London',
          value: 'LDN',
        },
        {
          label: 'Tokyo',
          value: 'TOK',
        },
        {
          label: 'Paris',
          value: 'PRS',
        },
        {
          label: 'Sydney',
          value: 'SYD',
        },
        {
          label: 'Melbourne',
          value: 'MEL',
        },
        {
          label: 'Brisbane',
          value: 'BNE',
        },
      ],
      validationRules: {
        required: true,
      },
    },
    {
      blockType: 'checkboxGroup',
      name: 'languages',
      label: 'Languages',
      defaultValue: ['javascript'],
      options: [
        {
          label: 'JavaScript',
          value: 'javascript',
        },
        {
          label: 'TypeScript',
          value: 'typescript',
        },
        {
          label: 'Java',
          value: 'java',
        },
        {
          label: 'C++',
          value: 'c++',
        },
        {
          label: 'Python',
          value: 'python',
        },
      ],
      width: 100,
      validationRules: {
        min: 1,
        max: 3,
      },
    },
    {
      blockType: 'radioGroup',
      name: 'gender',
      label: 'Gender',
      options: [
        {
          label: 'Male',
          value: 'male',
        },
        {
          label: 'Female',
          value: 'female',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      width: 100,
      validationRules: {
        required: true,
      },
    },
    {
      blockType: 'switch',
      name: 'interest',
      label: 'Are you interested?',
      width: 100,
      validationRules: {
        required: false,
      },
    },
    {
      blockType: 'checkbox',
      name: 'agree',
      label: 'Agree to terms and conditions',
      width: 100,
      validationRules: {
        required: false,
      },
    },
  ],
};
