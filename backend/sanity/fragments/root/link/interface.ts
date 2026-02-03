import { SANITY_PAGE_ROUTES } from '@/lib/routes';
import { ISanitySlug } from '../common';

/**
 * In sanity our link schema is very malleable. We have ability to have
 * to do the following:
 * - Have optional links
 * - Disable a link
 * These will change the data we get for links from our backend. This is
 * why in the base interface we are setting everything as optional.
 */
export interface ISanityLink {
  addLink: boolean;
  disabled: boolean;
  openNewTab: boolean;
  label?: string;
  type?: 'internal' | 'external';
  reference?: {
    _type: keyof typeof SANITY_PAGE_ROUTES;
    seo: {
      slug?: ISanitySlug;
    };
  };
  href?: string;
}
