import type { Meta, StoryObj } from '@storybook/react';
import { FormBuilder } from '..';
import { delay, http } from 'msw';
import { formBuilderProps } from './props';
import { exampleFormServerLogic } from './server-logic';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof FormBuilder> = {
  title: 'Components/Form Builder',
  component: FormBuilder,
  tags: ['autodocs'],
  parameters: {
    msw: {
      handlers: [
        http.post(formBuilderProps.submitEndpoint, async ({ request }) => {
          await delay(3000);

          return await exampleFormServerLogic(request);
        }),
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="section-padding-primary w-full bg-gray-light">
        <div className="container">
          <div className="shadow-light mx-auto max-w-[450px] rounded-lg bg-white p-6 lg:p-10">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormBuilder>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: formBuilderProps,
};

export const RedirectOnSuccess: Story = {
  args: {
    ...formBuilderProps,
    onSubmitAction: {
      type: 'redirect',
      redirect: '/redirected',
    },
  },
};
