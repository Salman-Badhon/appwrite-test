import { ISanityImage } from '../fragments/root/media/image/interface';

export interface ISanityImageBuilderResult {
  src: string;
  lqip: string;
  height: number;
  width: number;
  aspectRatio: number;
  alt?: string;
}

export interface IGenerateImageUrlArgs {
  source?: ISanityImage;
  height?: number;
  width?: number;
  useCdn: boolean;
}
