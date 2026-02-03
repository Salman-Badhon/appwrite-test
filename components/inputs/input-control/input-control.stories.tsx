import type { Meta, StoryObj } from '@storybook/react';

import { InputControl } from '.';
import { inputControlProps } from './story-props';
import { useArgs } from '@storybook/preview-api';
import { IInputControl } from './interface';
import { IconStore } from '@/components/icon-store';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InputControl> = {
  title: 'Components/Inputs/Input Control',
  component: InputControl,
  tags: ['autodocs'],
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story, args) => {
      return (
        <div className="section-padding-primary container">
          <div className="mx-auto max-w-xs">
            <Story args={{ ...args.args }} />
          </div>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof InputControl>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: inputControlProps,
  decorators: [
    () => {
      const [args, updateArgs] = useArgs<IInputControl>();

      return (
        <InputControl
          {...args}
          onChange={(e) => updateArgs({ ...args, value: e.target.value })}
        />
      );
    },
  ],
};
export const CustomIcon: Story = {
  args: inputControlProps,
  decorators: [
    () => {
      const [args, updateArgs] = useArgs<IInputControl>();
      return (
        <InputControl
          {...args}
          onChange={(e) => updateArgs({ ...args, value: e.target.value })}
          customIcon={
            <IconStore
              iconName="spinner-circle"
              className="absolute right-3 top-1/2 cursor-default text-lg leading-none"
            />
          }
        />
      );
    },
  ],
};

export const Password: Story = {
  args: {
    ...inputControlProps,
    label: 'Password',
    name: 'password',
    type: 'password',
  },
  decorators: [
    () => {
      const [args, updateArgs] = useArgs<IInputControl>();

      return (
        <InputControl
          {...args}
          onChange={(e) => updateArgs({ ...args, value: e.target.value })}
        />
      );
    },
  ],
};
