import { SANITY_LINK_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/link';
import { SANITY_IMAGE_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/media/image';
import { defineQuery } from 'next-sanity';

export const SANITY_HERO_SECTION_FRAGMENT = defineQuery(`
	_type == "primaryHeroSection" => {
		_type,
		title,
		description,
		ctaLinks[] {
			theme,
			link {
				${SANITY_LINK_QUERY_FRAGMENT}
			}
		},
		image {
			${SANITY_IMAGE_QUERY_FRAGMENT}
		}
	}
`);
