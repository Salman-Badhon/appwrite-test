import { ISanityPortableText } from '@/backend/sanity//fragments/root/portable-text/interface';

export interface IPortableTextComponent {
  content?: ISanityPortableText;
}

export interface ISanityPortableTextHeading {
  style: string;
  text: string;
  _key: string;
}

export const headingStyles = ['h1', 'h2', 'h3'];
