import { defineQuery } from 'next-sanity';
import { SANITY_HEADER_QUERY_FRAGMENT } from './header';
import { SANITY_FOOTER_QUERY_FRAGMENT } from './footer';

export const SANITY_LAYOUT_QUERY = defineQuery(`
  {
    "schemaMarkupDefinitions": *[_type == "globalSettings"][0].schemaMarkupDefinitions,
    "header": *[_type == "header"][0]{
      ${SANITY_HEADER_QUERY_FRAGMENT}
    },
    "footer": *[_type == "footer"][0]{
      ${SANITY_FOOTER_QUERY_FRAGMENT}
    }
  }
`);
