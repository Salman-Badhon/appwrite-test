import { defineQuery } from 'next-sanity';

export const SANITY_VIDEO_QUERY_FRAGMENT = defineQuery(`
	type,
	type == "file" => {
		"url": file.asset->url,
	},
	type == "embed" => {
		"url": embed
	}
`);
