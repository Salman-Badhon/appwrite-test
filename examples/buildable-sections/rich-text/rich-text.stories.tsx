import type { Meta, StoryObj } from '@storybook/react';
import { RichTextSection } from '.';
import { samplePortableText } from '@/components/portable-text/sample';

const meta: Meta<typeof RichTextSection> = {
  title: 'examples/Buildable Sections/Rich Text',
  component: RichTextSection,
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

type Story = StoryObj<typeof RichTextSection>;

export const Primary: Story = {};
