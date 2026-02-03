import { SANITY_PAGE_SCHEMA_MARKUP_FRAGMENT } from '@/backend/sanity/fragments/root/schema-markup';
import { SANITY_SEO_DATA_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/seo';
import { SANITY_PAGE_SECTIONS_QUERY_FRAGMENT } from '@/buildable-sections/fragment';
import { defineQuery } from 'next-sanity';

export const SANITY_BLOGS_PAGE_QUERY = defineQuery(`
	*[_type == "allBlogsPage"][0]{
		${SANITY_PAGE_SCHEMA_MARKUP_FRAGMENT},
		beforeBlogListSections[]{
			${SANITY_PAGE_SECTIONS_QUERY_FRAGMENT}
		},
		afterBlogListSections[]{
			${SANITY_PAGE_SECTIONS_QUERY_FRAGMENT}
		},
		"blogs": 	*[_type == "blog"] | order(_createdAt desc) {
			"slug": seo.slug.current,
			"publishedOn": string::split(_createdAt, "T")[0],
			title,
			description,
			"authorName": blogAuthor->fullName
		}
	}
`);

export const SANITY_BLOGS_PAGE_SEO_QUERY = defineQuery(`
	*[_type == "blogsPage"][0]{
		${SANITY_SEO_DATA_QUERY_FRAGMENT}
	}
`);
