import { defineQuery } from 'next-sanity';
import { SANITY_PORTABLE_TEXT_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/portable-text';
import { SANITY_PAGE_SCHEMA_MARKUP_FRAGMENT } from '@/backend/sanity/fragments/root/schema-markup';
import {
  SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT,
  SANITY_SEO_DATA_QUERY_FRAGMENT,
} from '@/backend/sanity/fragments/root/seo';
import { SANITY_PAGE_SECTIONS_QUERY_FRAGMENT } from '@/buildable-sections/fragment';

export const SANITY_BLOG_PAGE_QUERY = defineQuery(`
	*[_type == "blog" && seo.slug.current == $slug][0]{
		${SANITY_PAGE_SCHEMA_MARKUP_FRAGMENT},
		beforeBlogContentSections[]{
			${SANITY_PAGE_SECTIONS_QUERY_FRAGMENT}
		},
		afterBlogContentSections[]{
			${SANITY_PAGE_SECTIONS_QUERY_FRAGMENT}
		},
		blogContent[]{
			${SANITY_PORTABLE_TEXT_QUERY_FRAGMENT}
		},
	}
`);

export const SANITY_BLOG_PAGE_SEO_QUERY = defineQuery(`
	*[_type == "blog" && seo.slug.current == $slug][0]{
		${SANITY_SEO_DATA_QUERY_FRAGMENT}
	}
`);

export const SANITY_ALL_BLOG_PAGES_QUERY = defineQuery(`
	*[_type == "blog"]{
		${SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT}
	}
`);
