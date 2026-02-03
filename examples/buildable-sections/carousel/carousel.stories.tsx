import type { Meta, StoryObj } from '@storybook/react';
import { CarouselSection } from '.';
import { carouselSectionProps } from './story-props';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CarouselSection> = {
  title: 'examples/Buildable Sections/Carousel Section',
  component: CarouselSection,
  tags: ['autodocs'],
  args: carouselSectionProps,
};

export default meta;
type Story = StoryObj<typeof CarouselSection>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
