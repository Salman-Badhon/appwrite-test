import type { Meta, StoryObj } from '@storybook/react';
import { EmblaCarousel } from '.';
import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/shadcn/utils';
import React from 'react';
import { CarouselApi, CarouselItem } from '@/components/ui/carousel';
import { IconStore } from '@/components/icon-store';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Autoplay from 'embla-carousel-autoplay';

const meta: Meta<typeof EmblaCarousel> = {
  title: 'Components/EmblaCarousel',
  component: EmblaCarousel,
  tags: ['autodocs'],
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    layout: true,
  },
};

export default meta;

// Interface for Card component props
interface ICard {
  title: string;
  className?: string;
}

/**
 * Card component for rendering individual carousel items.
 * It displays a title and can accept additional class names for styling.
 */
function Card({ title, className }: ICard) {
  return (
    <div
      className={cn(
        'grid h-80 w-full place-items-center border-2 border-solid border-black bg-white shadow-gray-light',
        className
      )}
    >
      <h3 className="text-[1.25rem] font-bold">{title}</h3>
    </div>
  );
}

type Story = StoryObj<typeof EmblaCarousel>;

const slideChangeDelay = 3000;

export const Default: Story = {
  render: () => (
    <div className="overflow-hidden py-20">
      <div className="container">
        <div className="relative px-8">
          <EmblaCarousel
            options={{
              skipSnaps: true,
              loop: false,
              align: 'start',
            }}
            leftNavigationElement={
              <button className="-left-8 top-1/2 -translate-y-1/2">
                <IconStore iconName="chevron-left" className="text-[2rem]" />
              </button>
            }
            rightNavigationElement={
              <button className="-right-8 top-1/2 -translate-y-1/2">
                <IconStore iconName="chevron-right" className="text-[2rem]" />
              </button>
            }
            itemsPerSlide={{
              initial: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              '2xl': 6,
            }}
            itemGap={{
              initial: 0,
              sm: 8,
              md: 12,
              lg: 16,
              xl: 20,
              '2xl': 20,
            }}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((_, index) => (
              <CarouselItem key={index}>
                <Card title={`Slide ${index + 1}`} />
              </CarouselItem>
            ))}
          </EmblaCarousel>
        </div>
      </div>
    </div>
  ),
};

export const ExampleOne: Story = {
  render: () => {
    const [api, setApi] = useState<CarouselApi>(undefined);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Callback to update scroll progress
    const onScroll = useCallback((api: CarouselApi) => {
      const progress = Math.max(0, Math.min(1, api?.scrollProgress() || 0));
      setScrollProgress(progress * 100);
    }, []);

    useEffect(() => {
      onScroll(api);
      // Event listeners for scroll events
      api
        ?.on('reInit', onScroll)
        .on('scroll', onScroll)
        .on('slideFocus', onScroll);
    }, [api, onScroll]);

    return (
      <div className="overflow-hidden py-20">
        <div className="container">
          <div className="relative">
            <EmblaCarousel
              options={{
                skipSnaps: true,
                loop: false,
                align: 'start',
              }}
              setApi={setApi}
              leftNavigationElement={
                <button className="left-1 top-1/2 -translate-y-1/2 rounded-full border border-solid border-gray-300 bg-white p-1">
                  <IconStore
                    iconName="chevron-left"
                    className="text-[1.5rem]"
                  />
                </button>
              }
              rightNavigationElement={
                <button className="right-1 top-1/2 -translate-y-1/2 rounded-full border border-solid border-gray-300 bg-white p-1">
                  <IconStore
                    iconName="chevron-right"
                    className="text-[1.5rem]"
                  />
                </button>
              }
              itemsPerSlide={{
                initial: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 5,
                '2xl': 6,
              }}
              itemGap={{
                initial: 0,
                sm: 8,
                md: 12,
                lg: 16,
                xl: 20,
                '2xl': 20,
              }}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((_, index) => (
                <CarouselItem key={index}>
                  <Card title={`Slide ${index + 1}`} />
                </CarouselItem>
              ))}
            </EmblaCarousel>

            {/* Carousel Progress */}
            <div className="relative mt-8 h-1 w-full justify-end self-center overflow-hidden rounded-2xl bg-gray-300">
              <div
                className="absolute -left-full bottom-0 top-0 w-full bg-primary-light"
                style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const ExampleTwo: Story = {
  render: () => {
    const [api, setApi] = useState<CarouselApi>(undefined);
    const [currentActiveItem, setCurrentActiveItem] = useState(0);

    useEffect(() => {
      // Event listeners for slide selection
      api?.on('select', () => {
        setCurrentActiveItem(api.selectedScrollSnap());
      });
    }, [api]);

    return (
      <div className="overflow-hidden bg-gray-100 py-20">
        <div className="container">
          <div className="relative mx-auto max-w-[18rem]">
            <EmblaCarousel
              options={{
                skipSnaps: true,
                loop: false,
                align: 'start',
              }}
              setApi={setApi}
              itemsPerSlide={{
                initial: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                '2xl': 1,
              }}
              itemGap={{
                initial: 0,
                sm: 0,
                md: 0,
                lg: 0,
                xl: 0,
                '2xl': 0,
              }}
            >
              {Array.from({ length: 7 }, (_, i) => i + 1).map((_, index) => (
                <CarouselItem key={index}>
                  <Card title={`Slide ${index + 1}`} />
                </CarouselItem>
              ))}
            </EmblaCarousel>
            {/* Pagination */}
            <div className="absolute bottom-3 left-0 right-0 flex w-full flex-wrap items-center justify-center gap-1">
              {api?.scrollSnapList().map((_, index) => (
                <span
                  aria-label="carousel dot slider"
                  key={index}
                  onClick={() => {
                    api.scrollTo(index);
                  }}
                  className={cn(
                    // Layout
                    'relative size-[0.625rem] cursor-pointer items-center justify-center rounded-full bg-gray-300 transition-all',
                    currentActiveItem === index &&
                      // Active bar animate style
                      'bg-primary'
                  )}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const ExampleThree: Story = {
  render: () => (
    <div className="overflow-hidden py-20">
      <div className="container">
        <div className="relative px-8">
          <EmblaCarousel
            options={{
              skipSnaps: true,
              loop: false,
              align: 'start',
            }}
            plugins={[WheelGesturesPlugin()]}
            leftNavigationElement={
              <button className="-top-3 right-10 -translate-y-full rounded-full border border-gray-400 p-1">
                <IconStore iconName="chevron-left" className="text-[1.5rem]" />
              </button>
            }
            rightNavigationElement={
              <button className="-top-3 right-0 -translate-y-full rounded-full border border-gray-400 p-1">
                <IconStore iconName="chevron-right" className="text-[1.5rem]" />
              </button>
            }
            itemsPerSlide={{
              initial: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              '2xl': 6,
            }}
            itemGap={{
              initial: 0,
              sm: 8,
              md: 12,
              lg: 16,
              xl: 20,
              '2xl': 20,
            }}
            viewportClassName="overflow-visible"
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((_, index) => (
              <CarouselItem key={index}>
                <Card title={`Slide ${index + 1}`} />
              </CarouselItem>
            ))}
          </EmblaCarousel>
        </div>
      </div>
    </div>
  ),
};

export const ExampleFour: Story = {
  render: () => {
    const [api, setApi] = useState<CarouselApi>(undefined);
    const [currentActiveItem, setCurrentActiveItem] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);

    useEffect(() => {
      if (api) {
        // Set up event listeners for autoplay and slide selection
        api.on('autoplay:stop', () => {
          setIsAutoplay(false);
        });

        api.on('autoplay:play', () => {
          setIsAutoplay(true);
        });

        api.on('select', () => {
          setCurrentActiveItem(api.selectedScrollSnap());
        });
      }
    }, [api]);

    return (
      <section
        className="overflow-hidden bg-gray-100 py-20"
        style={
          { '--slide-change-delay': `${slideChangeDelay}ms` } as CSSProperties
        }
      >
        <div className="container">
          <div className="relative mx-auto max-w-[20rem]">
            <EmblaCarousel
              options={{
                skipSnaps: true,
                loop: true,
                align: 'start',
              }}
              plugins={[
                Autoplay({
                  delay: slideChangeDelay,
                  stopOnInteraction: false,
                }),
                WheelGesturesPlugin(),
              ]}
              setApi={setApi}
              leftNavigationElement={
                <button className="left-2 top-1/2 -translate-y-1/2">
                  <IconStore iconName="chevron-left" className="text-[2rem]" />
                </button>
              }
              rightNavigationElement={
                <button className="right-2 top-1/2 -translate-y-1/2">
                  <IconStore iconName="chevron-right" className="text-[2rem]" />
                </button>
              }
              itemsPerSlide={{
                initial: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                '2xl': 1,
              }}
              itemGap={{
                initial: 0,
                sm: 0,
                md: 0,
                lg: 0,
                xl: 0,
                '2xl': 0,
              }}
            >
              {Array.from({ length: 4 }, (_, i) => i + 1).map((_, index) => (
                <CarouselItem key={index}>
                  <Card
                    title={`Slide ${index + 1}`}
                    className="h-96 border-0"
                  />
                </CarouselItem>
              ))}
            </EmblaCarousel>
            {/* Custom Pagination */}
            <div className="absolute -bottom-6 left-0 right-0 flex flex-wrap items-center justify-center gap-1">
              {api?.scrollSnapList()?.map((_, index) => (
                <span
                  aria-label="carousel dot slider"
                  key={index}
                  onClick={() => {
                    api.scrollTo(index);
                  }}
                  className={cn(
                    // Layout
                    'relative inline-flex h-[0.125rem] w-[3.75rem] cursor-pointer items-center justify-center !bg-black/30 transition-all',
                    // Active bar style with after
                    'after:absolute after:left-0 after:top-0 after:h-full after:w-full after:origin-left after:scale-x-0 after:bg-primary-light',
                    currentActiveItem === index &&
                      isAutoplay &&
                      // Active bar animate style
                      'after:scale-x-100 after:animate-scale-x-in after:ease-linear after:[--duration:var(--slide-change-delay)]'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  },
};

export const AutoPlayExample: Story = {
  render: () => {
    const [api, setApi] = useState<CarouselApi>(undefined);
    const [currentActiveItem, setCurrentActiveItem] = useState(0);

    useEffect(() => {
      // Event listeners for slide selection
      api?.on('select', () => {
        setCurrentActiveItem(api.selectedScrollSnap());
      });
    }, [api]);

    return (
      <div className="overflow-hidden bg-gray-100 py-20">
        <div className="container">
          <div className="relative mx-auto max-w-[18rem]">
            <EmblaCarousel
              options={{
                skipSnaps: true,
                loop: true,
                align: 'start',
              }}
              plugins={[
                Autoplay({
                  delay: slideChangeDelay,
                  stopOnInteraction: false,
                }),
              ]}
              setApi={setApi}
              itemsPerSlide={{
                initial: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                '2xl': 1,
              }}
              itemGap={{
                initial: 0,
                sm: 0,
                md: 0,
                lg: 0,
                xl: 0,
                '2xl': 0,
              }}
            >
              {Array.from({ length: 7 }, (_, i) => i + 1).map((_, index) => (
                <CarouselItem key={index}>
                  <Card title={`Slide ${index + 1}`} />
                </CarouselItem>
              ))}
            </EmblaCarousel>
            {/* Pagination */}
            <div className="absolute bottom-3 left-0 right-0 flex w-full flex-wrap items-center justify-center gap-1">
              {api?.scrollSnapList().map((_, index) => (
                <span
                  aria-label="carousel dot slider"
                  key={index}
                  onClick={() => {
                    api.scrollTo(index);
                  }}
                  className={cn(
                    // Layout
                    'relative size-[0.625rem] cursor-pointer items-center justify-center rounded-full bg-gray-300 transition-all',
                    currentActiveItem === index &&
                      // Active dot style
                      'bg-primary'
                  )}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const WheelGesturesExample: Story = {
  render: () => (
    <div className="overflow-hidden py-20">
      <div className="container">
        <div className="relative px-8">
          <EmblaCarousel
            options={{
              skipSnaps: true,
              loop: false,
              align: 'start',
            }}
            plugins={[WheelGesturesPlugin()]}
            leftNavigationElement={
              <button className="-left-8 top-1/2 -translate-y-1/2">
                <IconStore iconName="chevron-left" className="text-[2rem]" />
              </button>
            }
            rightNavigationElement={
              <button className="-right-8 top-1/2 -translate-y-1/2">
                <IconStore iconName="chevron-right" className="text-[2rem]" />
              </button>
            }
            itemsPerSlide={{
              initial: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              '2xl': 6,
            }}
            itemGap={{
              initial: 0,
              sm: 8,
              md: 12,
              lg: 16,
              xl: 20,
              '2xl': 20,
            }}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((_, index) => (
              <CarouselItem key={index}>
                <Card title={`Slide ${index + 1}`} />
              </CarouselItem>
            ))}
          </EmblaCarousel>
        </div>
      </div>
    </div>
  ),
};

export const WheelGesturesAndAutoPlayExample: Story = {
  render: () => (
    <div className="overflow-hidden py-20">
      <div className="container">
        <div className="relative px-8">
          <EmblaCarousel
            options={{
              skipSnaps: true,
              loop: true,
              align: 'start',
            }}
            plugins={[
              Autoplay({
                delay: slideChangeDelay,
                stopOnInteraction: false,
              }),
              WheelGesturesPlugin(),
            ]}
            leftNavigationElement={
              <button className="-left-8 top-1/2 -translate-y-1/2">
                <IconStore iconName="chevron-left" className="text-[2rem]" />
              </button>
            }
            rightNavigationElement={
              <button className="-right-8 top-1/2 -translate-y-1/2">
                <IconStore iconName="chevron-right" className="text-[2rem]" />
              </button>
            }
            itemsPerSlide={{
              initial: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
              '2xl': 6,
            }}
            itemGap={{
              initial: 0,
              sm: 8,
              md: 12,
              lg: 16,
              xl: 20,
              '2xl': 20,
            }}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((_, index) => (
              <CarouselItem key={index}>
                <Card title={`Slide ${index + 1}`} />
              </CarouselItem>
            ))}
          </EmblaCarousel>
        </div>
      </div>
    </div>
  ),
};
