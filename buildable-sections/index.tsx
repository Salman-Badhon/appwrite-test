import dynamic from 'next/dynamic';
import { ISanitySections } from './interface';

// Lazy load the section builders for optimal performance
const HeroBuilder = dynamic(
  () => import('@/examples/buildable-sections/hero/builder')
);
const CarouselBuilder = dynamic(
  () => import('@/examples/buildable-sections/carousel/builder')
);
const RichTextSectionBuilder = dynamic(
  () => import('../examples/buildable-sections/rich-text/builder')
);

interface Props {
  sections?: ISanitySections;
}

export function SectionBuilder({ sections }: Props) {
  if (sections && sections.length > 0) {
    return (
      <>
        {sections.map((section, index) => {
          switch (section._type) {
            // Example sections
            case 'primaryHeroSection': {
              return <HeroBuilder {...section} key={index} />;
            }
            case 'carouselSection': {
              return <CarouselBuilder {...section} key={index} />;
            }
            case 'richTextSection': {
              return <RichTextSectionBuilder {...section} key={index} />;
            }
            default:
              /**
               * This is a fallback in case the section is not yet integrated.
               */
              return (
                <section key={'default' + index}>
                  <div className="flex min-h-screen items-center justify-center">
                    <div className="rounded-10  bg-col-6 text-col-1 mx-auto max-w-[1200px] px-6 py-10">
                      <h2 className="text-center text-2xl font-bold xl:text-4xl ">
                        Section builder not implemented
                      </h2>
                    </div>
                  </div>
                </section>
              );
          }
        })}
      </>
    );
  }

  return <></>;
}
