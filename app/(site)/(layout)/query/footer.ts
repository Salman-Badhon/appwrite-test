import { SANITY_LINK_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/link';
import { defineQuery } from 'next-sanity';

export const SANITY_FOOTER_QUERY_FRAGMENT = defineQuery(`
	menuLinks[]{
		${SANITY_LINK_QUERY_FRAGMENT}
	}
`);
