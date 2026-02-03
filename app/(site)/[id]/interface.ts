import { ISanitySchemaMarkup } from '@/backend/sanity/fragments/root/schema-markup/interface';
import { ISanitySections } from '@/buildable-sections/interface';

export interface ISanityGeneralPageQueryResponse extends ISanitySchemaMarkup {
  pageSections?: ISanitySections;
}
