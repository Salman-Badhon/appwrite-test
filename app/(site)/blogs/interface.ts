import { ISanitySchemaMarkup } from '@/backend/sanity/fragments/root/schema-markup/interface';
import { ISanitySections } from '@/buildable-sections/interface';

type SanityBlogCard = {
  publishedOn: string;
  slug: string;
  title: string;
  description: string;
  authorName: string;
};

export interface ISanityBlogsPageQueryResponse extends ISanitySchemaMarkup {
  beforeBlogListSections?: ISanitySections;
  afterBlogListSections?: ISanitySections;
  blogs: SanityBlogCard[];
}
