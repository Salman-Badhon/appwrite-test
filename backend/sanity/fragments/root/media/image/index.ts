import { defineQuery } from 'next-sanity';

export const SANITY_IMAGE_QUERY_FRAGMENT = defineQuery(`
	file{
		asset->{
			url,
			metadata{
				dimensions{
					aspectRatio,
					height,
					width,
				},
				lqip
			}
		},
		hotspot,
		crop
	},
	alt
`);
