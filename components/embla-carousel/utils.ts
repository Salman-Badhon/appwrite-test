import { CSSProperties } from 'react';
import { IEmblaCarousel } from './interface';
import { Breakpoints } from '@/lib/types';
import { cn } from '@/lib/shadcn/utils';

// Default values used when specific values are not provided
const DEFAULT_ITEMS_PER_SLIDE = 1;
const DEFAULT_ITEMS_GAP = 0;

// Define the order of breakpoints from smallest to largest
// This array is used to determine which breakpoint value to use
// when a specific breakpoint is not defined
// To add or remove breakpoints, modify this array
const breakpointOrder: (keyof Breakpoints)[] = [
  'initial',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
];

/**
 * Calculates the width of each slide based on the number of items per slide and the gap between items
 *
 * @param itemsPerSlide - Number of items to display in each slide
 * @param itemGap - Gap between each item in pixels
 * @returns A CSS calc() string representing the width of each slide
 */
function getSlideWidth(itemsPerSlide: number, itemGap: number): string {
  const totalGap = itemGap * (itemsPerSlide - 1);
  return `calc((100% - ${totalGap}px) / ${itemsPerSlide})`;
}

/**
 * Finds the appropriate value for a given breakpoint, falling back to smaller breakpoints if necessary
 *
 * @param breakpoints - Object containing values for different breakpoints
 * @param currentBreakpoint - The breakpoint we're currently interested in
 * @param defaultValue - The default value to use if no breakpoint value is found
 * @returns The value for the current breakpoint or the closest smaller breakpoint
 */
function getBreakpointValue(
  breakpoints: Breakpoints | undefined,
  currentBreakpoint: keyof Breakpoints,
  defaultValue: number
): number {
  if (!breakpoints) return defaultValue;

  const index = breakpointOrder.indexOf(currentBreakpoint);
  if (index === -1) return defaultValue;

  // Check current breakpoint and all smaller breakpoints
  for (let i = index; i >= 0; i--) {
    const breakpoint = breakpointOrder[i];
    if (breakpoint && breakpoints[breakpoint] !== undefined) {
      return breakpoints[breakpoint]!;
    }
  }

  return defaultValue;
}

/**
 * Generates styles for responsive slide widths
 *
 * This function creates CSS custom properties for each breakpoint,
 * allowing for responsive slide widths across different screen sizes.
 *
 * @param itemsPerSlide - Object defining the number of items per slide for each breakpoint
 * @param itemGap - Object defining the gap between items for each breakpoint
 * @returns An object of CSS custom properties for responsive slide widths
 */
export function getSlidesPerViewStyle(
  itemsPerSlide: IEmblaCarousel['itemsPerSlide'],
  itemGap: IEmblaCarousel['itemGap']
): CSSProperties {
  const styles: Record<string, string> = {};

  breakpointOrder.forEach((breakpoint) => {
    const slidesCount = getBreakpointValue(
      itemsPerSlide,
      breakpoint,
      DEFAULT_ITEMS_PER_SLIDE
    );
    const gapSize = getBreakpointValue(itemGap, breakpoint, DEFAULT_ITEMS_GAP);

    styles[`--${breakpoint}-view`] = getSlideWidth(slidesCount, gapSize);
  });

  return styles as CSSProperties;
}

/**
 * Generates styles for responsive item gaps
 *
 * This function creates CSS custom properties for the gap between items
 * at each breakpoint, allowing for responsive spacing across different screen sizes.
 *
 * @param itemGap - Object defining the gap between items for each breakpoint
 * @returns An object of CSS custom properties for responsive item gaps
 */
export function getItemGapStyle(
  itemGap: IEmblaCarousel['itemGap']
): CSSProperties {
  const styles: Record<string, string> = {};

  breakpointOrder.forEach((breakpoint) => {
    const gapSize = getBreakpointValue(itemGap, breakpoint, DEFAULT_ITEMS_GAP);

    styles[`--${breakpoint}-gap`] = `${gapSize}px`;
  });

  return styles as CSSProperties;
}

/**
 * This function generates the CSS style for the loop margin based on the loop and orientation properties.
 * When the carousel is in loop mode, we need to apply a margin style to the last item in the carousel to create a gap between the last item and the first item.
 * This is necessary because the flex gap property only works between items and does not apply between the last item and the first item in loop mode.
 * The margin style will be applied based on the orientation of the carousel, using margin-right for horizontal orientation and margin-bottom for vertical orientation.
 *
 * @param loop - A boolean value indicating whether the carousel is in loop mode.
 * @param orientation - The orientation of the carousel, either 'horizontal' or 'vertical'.
 * @returns A string of CSS styles that apply the loop margin to the last item in the carousel.
 */
export function getLoopMarginStyle(loop: boolean, axis?: 'x' | 'y'): string {
  // If the carousel is not in loop mode, return an empty string (no margin style needed)
  if (!loop) {
    return '';
  }

  // Define margin styles for horizontal orientation with direct breakpoint values
  const marginForGapStyleHorizontally = cn(
    '[&>div:last-child]:mr-[--initial-gap]',
    '[&>div:last-child]:sm:mr-[--sm-gap]',
    '[&>div:last-child]:md:mr-[--md-gap]',
    '[&>div:last-child]:lg:mr-[--lg-gap]',
    '[&>div:last-child]:xl:mr-[--xl-gap]',
    '[&>div:last-child]:2xl:mr-[--2xl-gap]'
  );

  // Define margin styles for vertical orientation with direct breakpoint values
  const marginForGapStyleVertically = cn(
    '[&>div:last-child]:mb-[--initial-gap]',
    '[&>div:last-child]:sm:mb-[--sm-gap]',
    '[&>div:last-child]:md:mb-[--md-gap]',
    '[&>div:last-child]:lg:mb-[--lg-gap]',
    '[&>div:last-child]:xl:mb-[--xl-gap]',
    '[&>div:last-child]:2xl:mb-[--2xl-gap]'
  );

  // Return the appropriate margin styles based on the carousel orientation
  return axis === 'y'
    ? marginForGapStyleVertically
    : marginForGapStyleHorizontally;
}
