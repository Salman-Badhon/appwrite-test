import { Dispatch, ReactNode, type JSX } from 'react';
import { Breakpoints } from '@/lib/types';
import {
  CarouselApi,
  CarouselOptions,
  CarouselPlugin,
} from '@/components/ui/carousel';

export interface IEmblaCarousel {
  /** The content inside the carousel (typically CarouselItem components). */
  children: JSX.Element[];
  /** Class name for the carousel's root element. */
  className?: string;
  /** Class name for the carousel's content (slides container). */
  contentClassName?: string;
  /** Class name for the carousel's viewport (visible area). */
  viewportClassName?: string;
  /** Custom element for the left navigation button. */
  leftNavigationElement?: ReactNode;
  /** Custom element for the right navigation button. */
  rightNavigationElement?: ReactNode;
  /** Function to set the Embla Carousel API for external control. */
  setApi?: Dispatch<CarouselApi>;
  /** Array of Embla Carousel plugins to enhance functionality. */
  plugins?: CarouselPlugin;
  /** Configuration options for the Embla Carousel. */
  options?: Partial<CarouselOptions>;
  /** Controls the space between each slide by device width. */
  itemGap?: Breakpoints;
  /** Controls the number of items shown per slide by device width. */
  itemsPerSlide?: Breakpoints;
}
