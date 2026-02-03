import { ISanityLink } from '@/backend/sanity/fragments/root/link/interface';
import { ISanitySchemaMarkup } from '@/backend/sanity/fragments/root/schema-markup/interface';

export interface ISanityLayoutData extends ISanitySchemaMarkup {
  header: ISanityHeaderData;
  footer: ISanityFooterData;
}

interface ISanityHeaderData {
  menuLinks: ISanityLink[];
}

interface ISanityFooterData {
  menuLinks: ISanityLink[];
}
