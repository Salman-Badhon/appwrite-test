'use client';

import { Typography } from '@/components/typography';
import { ICarouselSection } from './interface';
import { EmblaCarousel } from '@/components/embla-carousel';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { IconStore } from '@/components/icon-store';
import { CarouselItem } from '@/components/ui/carousel';
import { Card } from '@/examples/card';
import Autoplay from 'embla-carousel-autoplay';

export function CarouselSection({ title, subtitle, items }: ICarouselSection) {
  return (
    <section className="section-padding-primary">
      <div className="container">
        <div className="mx-auto mb-10 max-w-[40rem] text-center">
          <Typography size="h1" className="font-medium">
            {title}
          </Typography>
          {subtitle && (
            <Typography size="p1" className="mt-4">
              {subtitle}
            </Typography>
          )}
        </div>
        <EmblaCarousel
          options={{
            skipSnaps: true,
            loop: true,
            align: 'start',
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
            WheelGesturesPlugin(),
          ]}
          leftNavigationElement={
            <button className="max-md:bottom-0 max-md:left-0 md:-left-8 md:top-1/2 md:-translate-y-1/2">
              <IconStore iconName="chevron-left" className="text-[2rem]" />
            </button>
          }
          rightNavigationElement={
            <button className="max-md:bottom-0 max-md:left-10 md:-right-8 md:top-1/2 md:-translate-y-1/2">
              <IconStore iconName="chevron-right" className="text-[2rem]" />
            </button>
          }
          itemsPerSlide={{
            initial: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            '2xl': 4,
          }}
          itemGap={{
            initial: 4,
            sm: 8,
            md: 12,
            lg: 16,
            xl: 20,
            '2xl': 20,
          }}
          className="max-md:pb-10"
        >
          {items?.map((item, index) => (
            <CarouselItem key={index}>
              <Card
                image={item.image}
                title={item.title}
                content={item.description}
              />
            </CarouselItem>
          ))}
        </EmblaCarousel>
      </div>
    </section>
  );
}
