import type { Meta, StoryObj } from '@storybook/react';
import { PortableTextComponent } from '.';
import { samplePortableText } from './sample';

const meta: Meta<typeof PortableTextComponent> = {
  title: 'Components/Portable Text',
  component: PortableTextComponent,
  tags: ['autodocs'],
  args: { content: samplePortableText },
  argTypes: {
    content: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="section-padding-primary container">
        <div className="mx-auto max-w-[800px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PortableTextComponent>;

export const Primary: Story = {};
