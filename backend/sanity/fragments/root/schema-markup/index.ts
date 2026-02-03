import { defineQuery } from 'next-sanity';

/**
 * This fragment should be used to extract schema markup from a document.
 * This data will only exist for documents that have the `seo` field.
 *
 * This is not included in the `seo` folder because this data needs to be
 * fetched along with the rest of the page data. This data does not sit
 * with the rest of the seo fields in a page.
 */
export const SANITY_PAGE_SCHEMA_MARKUP_FRAGMENT = defineQuery(`
	"schemaMarkupDefinitions": seo.others.schemaMarkupDefinitions
`);
