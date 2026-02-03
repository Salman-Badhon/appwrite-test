import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '.';
import { typographyProps } from './story-props';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="section-padding-primary container">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Typography>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    size: 'hero',
    children: typographyProps.children,
  },
};

function ShowCase() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Typography size="o1" className={'text-primary-light'}>
          Hero
        </Typography>
        <Typography size="hero">Heading</Typography>
      </div>
      <div className="space-y-2">
        <Typography size="o1" className={'text-primary-light'}>
          Heading 1
        </Typography>
        <Typography size="h1">Heading</Typography>
      </div>
      <div className="space-y-2">
        <Typography size="o1" className={'text-primary-light'}>
          Heading 2
        </Typography>
        <Typography size="h2">Heading</Typography>
      </div>
      <div className="space-y-2">
        <Typography size="o1" className={'text-primary-light'}>
          Heading 3
        </Typography>
        <Typography size="h3">Heading</Typography>
      </div>
      <div className="space-y-2">
        <Typography size="o1" className={'text-primary-light'}>
          Subheading 1
        </Typography>
        <Typography size="s1">Heading</Typography>
      </div>
      <div className="space-y-2">
        <Typography size="o1" className={'text-primary-light'}>
          Subheading 2
        </Typography>
        <Typography size="s2">Heading</Typography>
      </div>
      <div className="space-y-2">
        <Typography size="o1" className={'text-primary-light'}>
          Paragraph 1
        </Typography>
        <Typography size="p1">Paragraph</Typography>
      </div>
      <div className="space-y-2">
        <Typography size="o1" className={'text-primary-light'}>
          Paragraph 2
        </Typography>
        <Typography size="p2">Paragraph</Typography>
      </div>
      <div className="space-y-2">
        <Typography size="o1" className={'text-primary-light'}>
          Overline 1
        </Typography>
        <Typography size="o1">Overline</Typography>
      </div>
      <div className="space-y-2">
        <Typography size="o1" className={'text-primary-light'}>
          Caption 1
        </Typography>
        <Typography size="c1">Caption</Typography>
      </div>
      <div className="space-y-2">
        <Typography size="o1" className={'text-primary-light'}>
          Quote 1
        </Typography>
        <Typography size="q1">Quote</Typography>
      </div>
    </div>
  );
}

export const AllShowCase: Story = {
  args: {
    size: 'hero',
    children: typographyProps.children,
  },
  render: ShowCase,
};
