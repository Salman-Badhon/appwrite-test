import { ISanityPortableText } from '@/backend/sanity/fragments/root/portable-text/interface';
import { ISanitySchemaMarkup } from '@/backend/sanity/fragments/root/schema-markup/interface';
import { ISanitySections } from '@/buildable-sections/interface';

export interface ISanityBlogPageQueryResponse extends ISanitySchemaMarkup {
  blogContent: ISanityPortableText;
  beforeBlogContentSections?: ISanitySections;
  afterBlogContentSections?: ISanitySections;
}
