import { defineQuery } from 'next-sanity';
import { SANITY_IMAGE_QUERY_FRAGMENT } from '../media/image';
import { SANITY_LINK_QUERY_FRAGMENT } from '../link';

/**
 * This fragment gets the seo data of a sanity doc. This should only be used with
 * docs that are using the `seo` root schema.
 * We are attaching the `_updatedAt` and `_createdAt` data to this object as it is
 * relevant meta data.
 */
export const SANITY_SEO_DATA_QUERY_FRAGMENT = defineQuery(`
	_updatedAt,
	_createdAt,
	seo{
		title,
		description,
		slug,
		"disableIndex": select(*[_type == "globalSettings"][0].globalSeo.disableIndex => true, disableIndex => true, false),
		"disableFollow": select(*[_type == "globalSettings"][0].globalSeo.disableFollow => true, disableFollow => true, false),
		"disableImageIndex": select(*[_type == "globalSettings"][0].globalSeo.disableImageIndex => true, disableImageIndex => true, false),
		"disableSnippet": select(*[_type == "globalSettings"][0].globalSeo.disableSnippet => true, disableSnippet => true, false),
		redirect,
		canonicalLink {
			${SANITY_LINK_QUERY_FRAGMENT}
		},
		openGraph{
			title,
			description,
			image{
				${SANITY_IMAGE_QUERY_FRAGMENT}
			}
		},
		others{
			keywords[],
		}
	}
`);

/**
 * This should be used in the following situations:
 * - To generate static paths
 * - To generate site map
 */
export const SANITY_LIMITED_SEO_DATA_QUERY_FRAGMENT = defineQuery(`
	_updatedAt,
	_createdAt,
	"slug": seo.slug.current
`);
