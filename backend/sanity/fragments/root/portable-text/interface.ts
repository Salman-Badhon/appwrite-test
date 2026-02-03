import { PortableTextBlock } from '@portabletext/types';
import { ISanityImage } from '../media/image/interface';
import { ISanityVideo } from '../media/video/interface';
import { ISanityCode } from '../common';

export type ISanityPortableText = (
  | PortableTextBlock
  | ISanityPortableTextImage
  | ISanityPortableTextVideo
  | ISanityCode
  | ISanityPortableTextContentTableBlock
)[];

export interface ISanityPortableTextImage extends ISanityImage {
  _type: string;
  markDefs?: undefined | [] | null;
  _key: string;
}

export interface ISanityPortableTextVideo extends ISanityVideo {
  _type: string;
  markDefs?: undefined | [] | null;
  _key: string;
}

export interface ISanityPortableTextContentTableBlock {
  _type: string;
  markDefs?: undefined | [] | null;
  title: string | null;
  _key: string;
}
