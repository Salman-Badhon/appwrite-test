import { defineQuery } from 'next-sanity';
import { SANITY_LINK_QUERY_FRAGMENT } from '../link';
import { SANITY_IMAGE_QUERY_FRAGMENT } from '../media/image';
import { SANITY_VIDEO_QUERY_FRAGMENT } from '../media/video';

const MARK_DEF_QUERY_FRAGMENT = `
    markDefs[]{
        ...,
        ${SANITY_LINK_QUERY_FRAGMENT}
    }
`;

export const SANITY_PORTABLE_TEXT_QUERY_FRAGMENT = defineQuery(`
	...,
	${MARK_DEF_QUERY_FRAGMENT},
	_type == "portableTextImage" => @{
		${SANITY_IMAGE_QUERY_FRAGMENT},
	},
	_type == "portableTextVideo" => @{
		${SANITY_VIDEO_QUERY_FRAGMENT}
	},
	_type == "contentTableBlock" => @{
		title,
	}
`);
