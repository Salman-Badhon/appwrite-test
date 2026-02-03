import { STORYBOOK_IMAGE_BLUR_DATA_URL } from '@/lib/types';
import { ICarouselSection } from './interface';
import { EXAMPLE_CARD_IMAGE_DIMENSION_1_1 } from '@/examples/card/interface';

export const carouselSectionProps: ICarouselSection = {
  title: 'Meet the Minds Behind the Magic',
  subtitle:
    'Discover the stories of talented professionals who are shaping the future of innovation. Each brings a unique perspective, driving creativity and success in their respective fields.',
  items: [
    {
      image: {
        src: 'https://res.cloudinary.com/dygaqlpyh/image/upload/v1717315034/pikaso_texttoimage_adorable-cartoon-style-Message-waitwe-are-working-_ad4pwd.jpg',
        lqip: STORYBOOK_IMAGE_BLUR_DATA_URL,
        alt: 'Sarah Johnson',
        ...EXAMPLE_CARD_IMAGE_DIMENSION_1_1,
      },
      title: 'Sarah Johnson',
      description:
        'Sarah is a digital marketing expert with over 10 years of experience helping brands achieve global recognition. She specializes in data-driven strategies.',
    },
    {
      image: {
        src: 'https://res.cloudinary.com/dygaqlpyh/image/upload/v1717315034/pikaso_texttoimage_adorable-cartoon-style-Message-waitwe-are-working-_2_wur1am.jpg',
        lqip: STORYBOOK_IMAGE_BLUR_DATA_URL,
        alt: 'Michael Roberts',
        ...EXAMPLE_CARD_IMAGE_DIMENSION_1_1,
      },
      title: 'Michael Roberts',
      description:
        'Michael Roberts is a digital marketing expert with over 10 years of experience helping brands achieve global recognition. She specializes in data-driven strategies.',
    },
    {
      image: {
        src: 'https://res.cloudinary.com/dygaqlpyh/image/upload/v1717315034/pikaso_texttoimage_adorable-cartoon-style-Message-waitwe-are-working-_1_wkwpwk.jpg',
        lqip: STORYBOOK_IMAGE_BLUR_DATA_URL,
        alt: 'Emily Davis',
        ...EXAMPLE_CARD_IMAGE_DIMENSION_1_1,
      },
      title: 'Emily Davis',
      description:
        'Emily Davis is a digital marketing expert with over 10 years of experience helping brands achieve global recognition. She specializes in data-driven strategies.',
    },
  ],
};
