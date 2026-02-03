import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';

/**
 * Only use this interface when working with static images.
 * When working with Sanity images use the ISanityImageBuilderResult
 */
export interface IImage {
  /** Specifies the path to the image */
  src: string;
  /** Specifies an alternate text for an image */
  alt?: string;
  /**
   * A Data URL to be used as a placeholder image before the src image successfully loads
   * Must be a base64-encoded image. Must be used as the `blurDataURL` prop in Next Image
   */
  lqip: string;
  /** Specifies the width of an image */
  width?: number;
  /** Specifies the height of an image */
  height?: number;
}

export const STORYBOOK_IMAGE_BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAMCBAUH/8QAIxAAAQQBAwQDAAAAAAAAAAAAAQACAwQxBREhEhMVcUFRYf/EABYBAQEBAAAAAAAAAAAAAAAAAAIAAf/EABgRAQEAAwAAAAAAAAAAAAAAAAABESFR/9oADAMBAAIRAxEAPwDi9aGxoMxdahkdVcMfAJwl6hZ8tcrRVIyRl7SOD+elLWblh1SSJ0rzGdt2k/SytKmkika6Nxa7bIQ3hsvTLVTosSDtAc4bgIVp00jnEl3PoISir//Z';

export interface PageParams {
  params: { id: string };
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export const SCREENS = resolveConfig(tailwindConfig).theme.screens;

export type Breakpoints = Partial<
  Record<keyof typeof SCREENS | 'initial', number>
>;

/**
 * We should use this when typing data from Sanity.
 * This is because Sanity returns null when there is no data.
 *
 * **NOTE**: This should mostly be used with sanity data being queries at page/layout/sitemap level.
 * This should not be used for buildable section/component interfaces.
 */
export type SanityResponse<T> = T | null;
