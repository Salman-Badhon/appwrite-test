import { notFound } from 'next/navigation';

/**
 * This object contains all the Sanity page routes, these routes can come from
 * dedicated Sanity page documents or Sanity entity documents.
 *
 * **Warning**: This object should NOT be used directly in the codebase. Use `getRelativeUrl` instead.
 **/
export const SANITY_PAGE_ROUTES = {
  homePage: '/',
  generalPage: (slug: string) => `/${slug}`,
  allBlogsPage: '/blogs',
  blog: (slug: string) => `/blogs/${slug}`,
};

export type SANITY_PAGE_ROUTES_TYPE = keyof typeof SANITY_PAGE_ROUTES;

/**
 * This object contains all the non-Sanity page routes.
 *
 * **Warning**: This object should NOT be used directly in the codebase. Use `getRelativeUrl` instead.
 **/
export const NON_SANITY_PAGE_ROUTES = {};

export type NON_SANITY_PAGE_ROUTES_TYPE = keyof typeof NON_SANITY_PAGE_ROUTES;

/**
 * This function will return the route for a provided PAGE_ROUTE and
 * optional slug.
 * @param route_type keyof typeof PAGE_ROUTES
 * @returns
 */
export function getRelativeURL(
  route_type: keyof typeof SANITY_PAGE_ROUTES,
  slug: string = ''
) {
  switch (route_type) {
    case 'homePage':
    case 'allBlogsPage':
      return SANITY_PAGE_ROUTES[route_type];
    case 'blog':
    case 'generalPage':
      return SANITY_PAGE_ROUTES[route_type](slug);
    default:
      console.error(`Route doesn't exist. Route Type => ${route_type}.`);

      notFound();
  }
}
