import { ISanityHero } from '@/examples/buildable-sections/hero/builder/interface';
import { ISanityRichTextSection } from '../examples/buildable-sections/rich-text/builder/interface';
import { ISanityCarousel } from '@/examples/buildable-sections/carousel/builder/interface';

/**
 * When you have more type of section you will update the interface like so:
 * type ISanitySections = (ISanityRichTextSection | ISanityFAQSection)[]
 */
export type ISanitySections =
  // Example sections
  (ISanityHero | ISanityCarousel | ISanityRichTextSection)[];
