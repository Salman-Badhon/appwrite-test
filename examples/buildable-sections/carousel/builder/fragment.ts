import { SANITY_IMAGE_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/media/image';
import { defineQuery } from 'next-sanity';

export const SANITY_CAROUSEL_SECTION_FRAGMENT = defineQuery(`
	_type == "carouselSection" => {
		_type,
		title,
		subtitle,
		items[] {
			title,
			description,
			image {
				${SANITY_IMAGE_QUERY_FRAGMENT}
			}
		},
	}
`);
