import { ISanityLink } from '@/backend/sanity/fragments/root/link/interface';
import { ISanityImage } from '@/backend/sanity/fragments/root/media/image/interface';

export interface ISanityHero {
  _type: 'primaryHeroSection';
  title: string;
  description?: string;
  ctaLinks?: {
    theme: 'primary' | 'secondary';
    link: ISanityLink;
  }[];
  image?: ISanityImage;
}
