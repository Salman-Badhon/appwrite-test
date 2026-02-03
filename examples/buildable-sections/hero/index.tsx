import { IHero } from './interface';
import { cn } from '@/lib/shadcn/utils';
import { Typography } from '@/components/typography';
import { CustomButton } from '@/components/button';
import Image from 'next/image';

export function Hero({ title, description, ctaLinks, bgImage }: IHero) {
  return (
    <section className="section-padding-primary relative flex min-h-[calc(100vh-var(--header-height,0px))] items-center justify-center">
      {bgImage && (
        <Image
          src={bgImage.src}
          alt={bgImage.alt || 'Background image'}
          fill
          className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        />
      )}
      <div className="container relative z-10">
        <div className="mx-auto max-w-[40rem] text-center">
          <Typography size="hero" className="font-medium">
            {title}
          </Typography>
          <Typography size="p1" className="mt-4">
            {description}
          </Typography>
          {!!ctaLinks?.length && (
            <div className="mt-10 flex items-center justify-center gap-4">
              {ctaLinks.map(
                (
                  {
                    label,
                    href,
                    disabled,
                    target,
                    prefetch,
                    ariaLabel,
                    className,
                    theme,
                  },
                  index
                ) => (
                  <CustomButton
                    type="link"
                    disabled={disabled}
                    href={href}
                    colorScheme={theme}
                    target={target}
                    prefetch={prefetch}
                    ariaLabel={ariaLabel}
                    className={cn('rounded-full border', className)}
                    key={index}
                  >
                    {label}
                  </CustomButton>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
