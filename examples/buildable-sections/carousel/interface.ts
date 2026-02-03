import { IImage } from '@/lib/types';

/** This interface represents a carousel section. */
export interface ICarouselSection {
  /** The title of the carousel section. */
  title: string;
  /** The subTitle of the carousel section. */
  subtitle?: string;
  /** The carouselItems of the carousel section. */
  items: ICarouselItem[];
}

export interface ICarouselItem {
  image: IImage;
  title: string;
  description?: string;
}
