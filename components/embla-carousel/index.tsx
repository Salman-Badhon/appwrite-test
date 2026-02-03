'use client';

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { IEmblaCarousel } from './interface';
import { getItemGapStyle, getSlidesPerViewStyle } from './utils';

/**
 * EmblaCarousel Component
 *
 * A flexible and customizable carousel component built on top of Embla Carousel.
 * This component provides a responsive and feature-rich carousel with support for
 * custom navigation, variable slides per view, and dynamic item gaps.
 *
 * @component
 * @example
 * <EmblaCarousel
 *   options={{ loop: true, align: 'center' }}
 *   itemsPerSlide={{ initial: 1, md: 2, lg: 3 }}
 *   itemGap={{ initial: 16, md: 24 }}
 *   leftNavigationElement={<LeftArrow />}
 *   rightNavigationElement={<RightArrow />}
 *   className="my-carousel"
 *   contentClassName="carousel-content"
 *   viewportClassName="carousel-viewport"
 * >
 *   {slides.map((slide) => (
 *     <CarouselItem key={slide.id}>{slide.content}</CarouselItem>
 *   ))}
 * </EmblaCarousel>
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The carousel items/slides
 * @param {Function} [props.setApi] - Function to set the Embla Carousel API for external control
 * @param {Object} [props.options] - Embla Carousel options (e.g., loop, align, dragFree)
 * @param {Array} [props.plugins] - Embla Carousel plugins (e.g., Autoplay, Wheel Gestures)
 * @param {React.ReactNode} [props.leftNavigationElement] - Custom left navigation element
 * @param {React.ReactNode} [props.rightNavigationElement] - Custom right navigation element
 * @param {string} [props.className] - Class name for the carousel's root element
 * @param {string} [props.contentClassName] - Class name for the carousel's content (slides container)
 * @param {string} [props.viewportClassName] - Class name for the carousel's viewport (visible area)
 * @param {Object} [props.itemsPerSlide] - Number of items per slide for different breakpoints
 * @param {Object} [props.itemGap] - Gap between items for different breakpoints
 *
 * @returns {JSX.Element} The EmblaCarousel component
 *
 * @note
 * This component uses CSS custom properties for responsive design, allowing for
 * easy customization of slides per view and item gaps across different breakpoints.
 *
 * @note
 * We added autoplay handling logic in the UI carousel component's onSelect method that stops autoplay
 * in specific scenarios: When loop mode is enabled but the carousel can't scroll next (which happens
 * when there are slides beyond the viewport and Embla disables looping due to fractional widths).
 * This prevents the autoplay from continuing when proper looping isn't possible.
 *
 * @note
 * We also added automatic timer reset functionality for autoplay in the UI carousel component's
 * onSelect method. When any slide selection occurs (whether through user interaction or
 * programmatic control), the autoplay timer is reset to maintain consistent timing between
 * transitions. This ensures smooth and predictable autoplay behavior even after user
 * interactions with the carousel.
 */
export function EmblaCarousel({
  children,
  setApi,
  options,
  plugins,
  leftNavigationElement,
  rightNavigationElement,
  itemsPerSlide,
  itemGap,

  className,
  contentClassName,
  viewportClassName,
}: IEmblaCarousel) {
  // Calculate dynamic styles for slides per view and item gaps
  const carouselStyles = {
    ...getSlidesPerViewStyle(itemsPerSlide, itemGap),
    ...getItemGapStyle(itemGap),
  };

  return (
    <Carousel
      setApi={setApi}
      opts={options}
      plugins={plugins}
      className={className}
      style={carouselStyles}
    >
      {/* Render the carousel content (slides) */}
      <CarouselContent
        className={contentClassName}
        viewportClassName={viewportClassName}
      >
        {children}
      </CarouselContent>

      {/* Render the left navigation button, if provided */}
      {leftNavigationElement && (
        <CarouselPrevious>{leftNavigationElement}</CarouselPrevious>
      )}

      {/* Render the right navigation button, if provided */}
      {rightNavigationElement && (
        <CarouselNext>{rightNavigationElement}</CarouselNext>
      )}
    </Carousel>
  );
}
