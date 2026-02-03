import type { Meta, StoryObj } from '@storybook/react';

import { SwitchControl } from '.';
import { switchControlProps } from './story-props';
import { useArgs } from '@storybook/preview-api';
import { ISwitchControl } from './interface';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SwitchControl> = {
  title: 'Components/Inputs/Switch Control',
  component: SwitchControl,
  tags: ['autodocs'],
  argTypes: {
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
            <div className="mt-3">
              <div className="text-xs">
                State: {args.args.checked ? 'true' : 'false'}
              </div>
            </div>
          </div>
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof SwitchControl>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: switchControlProps,
  decorators: [
    () => {
      const [args, updateArgs] = useArgs<ISwitchControl>();

      return (
        <SwitchControl
          {...args}
          onChange={() => updateArgs({ ...args, checked: !args.checked })}
        />
      );
    },
  ],
};
