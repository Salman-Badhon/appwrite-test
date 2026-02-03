import { SANITY_PAGE_SCHEMA_MARKUP_FRAGMENT } from '@/backend/sanity/fragments/root/schema-markup';
import {
  SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT,
  SANITY_SEO_DATA_QUERY_FRAGMENT,
} from '@/backend/sanity/fragments/root/seo';
import { SANITY_PAGE_SECTIONS_QUERY_FRAGMENT } from '@/buildable-sections/fragment';
import { defineQuery } from 'next-sanity';

export const SANITY_GENERAL_PAGE_QUERY = defineQuery(`
	*[_type == "generalPage" && seo.slug.current == $slug][0]{
		${SANITY_PAGE_SCHEMA_MARKUP_FRAGMENT},
		pageSections[]{
			${SANITY_PAGE_SECTIONS_QUERY_FRAGMENT}
		}
	}
`);

export const SANITY_GENERAL_PAGE_SEO_QUERY = defineQuery(`
	*[_type == "generalPage" && seo.slug.current == $slug][0]{
		${SANITY_SEO_DATA_QUERY_FRAGMENT}
	}
`);

export const SANITY_ALL_GENERAL_PAGES_QUERY = defineQuery(`
	*[_type == "generalPage"]{
		${SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT}
	}
`);
