import { generateImageUrl } from '@/backend/sanity/image-builder';
import { Hero } from '../index';
import { ISanityHero } from './interface';
import { extractSanityLink } from '@/lib/extract-sanity-link';

export default function HeroBuilder({
  title,
  description,
  ctaLinks,
  image,
}: ISanityHero) {
  const generatedCtaLinks = ctaLinks
    ?.map((heroLink) => {
      const link = extractSanityLink(heroLink.link);
      if (link) {
        return { ...link, theme: heroLink.theme };
      }
      return undefined;
    })
    .filter((link) => link !== undefined);

  const generatedBgImage = generateImageUrl({
    source: image,
    useCdn: true,
  });

  return (
    <Hero
      title={title}
      description={description}
      ctaLinks={generatedCtaLinks}
      bgImage={generatedBgImage}
    />
  );
}
