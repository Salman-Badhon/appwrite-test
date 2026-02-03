import { ISanityLink } from '../link/interface';
import { ISanityImage } from '../media/image/interface';
import { ISanitySlug } from '../common';

export interface ISanitySeoData {
  _updatedAt: string;
  _createdAt: string;
  seo: {
    title: string;
    description: string;
    slug: ISanitySlug;
    disableIndex: boolean;
    disableFollow: boolean;
    disableImageIndex: boolean;
    disableSnippet: boolean;
    redirect?: string;
    canonicalLink?: ISanityLink;
    openGraph?: {
      title?: string;
      description?: string;
      image?: ISanityImage;
    };
    others?: {
      keywords?: string[];
    };
  };
}

export interface ISanityLimitedSeoData {
  slug: string;
  _updatedAt: string;
  _createdAt: string;
}
