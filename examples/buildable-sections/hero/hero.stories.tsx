import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from '.';
import { heroProps } from './story-props';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Hero> = {
  title: 'examples/Buildable Sections/Hero',
  component: Hero,
  tags: ['autodocs'],
  args: heroProps,
};

export default meta;
type Story = StoryObj<typeof Hero>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
