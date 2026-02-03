import { defineQuery } from 'next-sanity';
import { SANITY_RICH_TEXT_SECTION_FRAGMENT } from '../examples/buildable-sections/rich-text/builder/fragment';
import { SANITY_HERO_SECTION_FRAGMENT } from '@/examples/buildable-sections/hero/builder/fragment';
import { SANITY_CAROUSEL_SECTION_FRAGMENT } from '@/examples/buildable-sections/carousel/builder/fragment';

export const SANITY_PAGE_SECTIONS_QUERY_FRAGMENT = defineQuery(`
	// Example sections
	${SANITY_HERO_SECTION_FRAGMENT},
	${SANITY_CAROUSEL_SECTION_FRAGMENT},
	${SANITY_RICH_TEXT_SECTION_FRAGMENT}
`);
