import { generateImageUrl } from '@/backend/sanity/image-builder';
import { ISanityCarousel } from './interface';
import { CarouselSection } from '../index';
import { EXAMPLE_CARD_IMAGE_DIMENSION_1_1 } from '@/examples/card/interface';

export default function CarouselBuilder({
  title,
  items,
  subtitle,
}: ISanityCarousel) {
  const modifiedCarouselItems = items
    ?.map((item) => {
      const generatedImage = generateImageUrl({
        source: item.image,
        useCdn: true,
        height: EXAMPLE_CARD_IMAGE_DIMENSION_1_1.height,
        width: EXAMPLE_CARD_IMAGE_DIMENSION_1_1.width,
      });

      if (!generatedImage) {
        return undefined;
      }

      return {
        image: generatedImage,
        title: item.title,
        description: item.description,
      };
    })
    .filter((item) => item !== undefined);

  return (
    <CarouselSection
      title={title}
      subtitle={subtitle}
      items={modifiedCarouselItems}
    />
  );
}
