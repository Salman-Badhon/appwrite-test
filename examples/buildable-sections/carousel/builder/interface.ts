import { ISanityImage } from '@/backend/sanity/fragments/root/media/image/interface';

export interface ISanityCarousel {
  _type: 'carouselSection';
  title: string;
  subtitle?: string;
  items: ICarouselItem[];
}

interface ICarouselItem {
  image: ISanityImage;
  title: string;
  description?: string;
}
