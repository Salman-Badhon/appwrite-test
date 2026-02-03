'use client';

import * as React from 'react';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import { cn } from '@/lib/shadcn/utils';
import { Slot } from '@radix-ui/react-slot';
import { AutoplayType } from 'embla-carousel-autoplay';
import { getLoopMarginStyle } from '@/components/embla-carousel/utils';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: opts?.axis === 'y' ? 'y' : 'x',
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback(
    (api: CarouselApi) => {
      if (!api) {
        return;
      }
      // we are shadowing `canScrollNext` to avoid calling the api twice
      const canScrollNext = api.canScrollNext();

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(canScrollNext);

      const autoplayConfig = api?.plugins()?.autoplay as AutoplayType;
      /**
       * Handle autoplay timer reset
       *
       * Every time a slide changes (whether by user interaction or automatically),
       * we reset the autoplay timer. This keeps the timing between slides consistent
       * and predictable, even after users interact with the carousel. This ensures
       * consistent timing between transitions and maintains synchronization with any
       * external progress indicators or tracking UI elements that may be used alongside
       * the carousel.
       */
      if (autoplayConfig) {
        autoplayConfig.reset();
      }

      /**
       * Handle edge case with looping
       *
       * Sometimes with loop mode enabled, the carousel can't actually loop properly
       * (usually due to viewport/slide width calculations). In these cases, we
       * temporarily stop the autoplay to prevent the undesirable animation that occurs when
       * the carousel tries to advance but can't complete the loop transition.
       */
      if (autoplayConfig && opts?.loop && !canScrollNext) {
        autoplayConfig.stop();
      }
    },
    [opts?.loop]
  );

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) {
      return;
    }

    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = 'Carousel';

interface ICarouselContentProps {
  viewportClassName?: string;
}

/**
 * CarouselContent component
 *
 * Here we are using the gap style instead of the margin and padding solution recommended by shadcnUi.
 * The problem with the margin and padding solution is that we need to work more to support the carousel axis with item-to-item gaps.
 * That's why we use the gap property and an additional function getLoopMarginStyle to correctly handle the gap in loop mode.
 */
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HtmlHTMLAttributes<HTMLDivElement> & ICarouselContentProps
>(({ className, viewportClassName, ...props }, ref) => {
  const { carouselRef, opts, api } = useCarousel();

  const applyMargin =
    (opts?.loop && api?.internalEngine().slideLooper.canLoop()) || false;

  return (
    <div ref={carouselRef} className={cn('overflow-hidden', viewportClassName)}>
      <div
        ref={ref}
        // `canLoop` updates after initial render, so we need to re-render all items with new margins
        // to ensure proper layout calculations
        key={applyMargin ? 'loop' : 'no-loop'}
        className={cn(
          'flex',
          // Determine the flex direction based on the carousel axis
          opts?.axis === 'y' ? 'flex-col' : 'flex-row',
          // Items gap with screens breakpoint
          'gap-[--initial-gap] sm:gap-[--sm-gap] md:gap-[--md-gap] lg:gap-[--lg-gap] xl:gap-[--xl-gap] 2xl:gap-[--2xl-gap]',
          // Loop margin style
          getLoopMarginStyle(applyMargin, opts?.axis),
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        // layour styles
        'min-w-0 shrink-0 grow-0',
        // item width with screens breakpoint
        'basis-[--initial-view] sm:basis-[--sm-view] md:basis-[--md-view] lg:basis-[--lg-view] xl:basis-[--xl-view] 2xl:basis-[--2xl-view]',
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

/**
 * Here we update this CarouselPrevious component to use a custom element from the parent.
 * @note Updating this component will affect all carousel navigation behavior.
 */
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Slot
      ref={ref}
      className={cn(
        'absolute flex h-fit w-fit items-center justify-center',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
      {...props}
    >
      {props.children}
    </Slot>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

/**
 * Here we update this CarouselNext component to use a custom element from the parent.
 * @note Updating this component will affect all carousel navigation behavior.
 */
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Slot
      ref={ref}
      className={cn(
        'absolute flex h-fit w-fit items-center justify-center',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
      {...props}
    >
      {props.children}
    </Slot>
  );
});
CarouselNext.displayName = 'CarouselNext';

export {
  type CarouselApi,
  type CarouselPlugin,
  type CarouselOptions,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
