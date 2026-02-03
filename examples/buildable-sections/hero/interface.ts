import { ICustomLink } from '@/components/custom-link/interface';
import { IImage } from '@/lib/types';

/** This interface represents a hero section. */
export interface IHero {
  /** The title of the hero section. */
  title: string;
  /** The description or content of the hero section. */
  description?: string;
  /** The cta links of the hero section. */
  ctaLinks?: IHeroCTALink[];
  /** The background image of the hero section. */
  bgImage?: IImage;
}

export interface IHeroCTALink extends ICustomLink {
  theme: 'primary' | 'secondary';
}
