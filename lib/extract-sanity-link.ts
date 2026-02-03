import { ISanityLink } from '@/backend/sanity/fragments/root/link/interface';
import { ICustomLink } from '../components/custom-link/interface';
import { getRelativeURL } from './routes';

/**
 * This function will accept an ISanityLink object
 * and return either a ILink or undefined.
 */
export function extractSanityLink(link?: ISanityLink): ICustomLink | undefined {
  if (link) {
    if (link.addLink) {
      /**
       * We are defaulting an invalid link to an empty string.
       * If we use `#` then user gets redirected to the top of the page.
       */
      let href = '';

      if (link.type == 'internal' && link.reference && link.reference._type) {
        href = getRelativeURL(
          link.reference._type,
          link.reference.seo?.slug?.current
        );
      } else if (link.type == 'external' && link.href) {
        href = link.href;
      }

      return {
        disabled: link.disabled,
        label: link.label,
        href: link.disabled ? '' : href,
        target: link.openNewTab ? '_blank' : '_self',
      };
    }
  }

  return undefined;
}

/**
 * This function will accept an optional array of ISanityLink objects
 * and return an array of ILink objects. This will respect the `hasLink`
 * field of Sanity Links
 * @param ISanityLink
 * @returns ILink[] | []
 */
export function extractSanityLinks(links?: ISanityLink[]) {
  if (links) {
    return links.reduce((prev, current) => {
      const link = extractSanityLink(current);
      if (link) {
        return [...prev, link];
      }
      return prev;
    }, [] as ICustomLink[]);
  }
  return [];
}
