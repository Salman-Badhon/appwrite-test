import { SANITY_PORTABLE_TEXT_QUERY_FRAGMENT } from '@/backend/sanity/fragments/root/portable-text';
import { defineQuery } from 'next-sanity';

export const SANITY_RICH_TEXT_SECTION_FRAGMENT = defineQuery(`
    _type == 'richTextSection' => {
        _type,
        content[]{
            ${SANITY_PORTABLE_TEXT_QUERY_FRAGMENT}
        }
    }
`);
