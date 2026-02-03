import { getRelativeURL, SANITY_PAGE_ROUTES } from '@/lib/routes';
import { ISanitySeoData } from '../backend/sanity/fragments/root/seo/interface';
import { generateImageUrl } from '../backend/sanity/image-builder';
import { extractSanityLink } from './extract-sanity-link';
import { Metadata } from 'next';
import { notFound, redirect, RedirectType } from 'next/navigation';

interface IExtractMetaDataArgs {
  data?: ISanitySeoData;
  docType: keyof typeof SANITY_PAGE_ROUTES;
}

/**
 * This function will take sanity metadata object and return next meta data object
 * @param seo: This is the seo data object from sanity
 * @param slug: This is the slug of the page used for open graph url.
 * @returns
 */
export function extractMetadata({
  data,
  docType,
}: IExtractMetaDataArgs): Metadata {
  if (!data?.seo) {
    notFound();
  }

  const { seo } = data;

  if (seo.redirect) {
    return redirect(seo.redirect, RedirectType.replace);
  }

  const canonicalLink = extractSanityLink(seo.canonicalLink)?.href;

  const disableIndexing = seo.disableIndex;
  const disableFollow = seo.disableFollow;
  const disableImageIndexing = seo.disableImageIndex;
  const disableSnippet = seo.disableSnippet;

  const openGraphImages: { url: string; alt: string }[] = [];

  if (seo.openGraph?.image?.file) {
    const openGraphImage = generateImageUrl({
      source: seo.openGraph.image,
      width: 1200,
      height: 630,
      useCdn: true,
    });

    if (openGraphImage) {
      openGraphImages.push({
        url: openGraphImage.src,
        alt: openGraphImage.alt || seo.title,
      });
    }
  }

  // Add default open graph image.
  openGraphImages.push({
    url: `/api/default-og-image?title=${seo.title}`,
    alt: seo.openGraph?.title || seo.title,
  });

  return {
    metadataBase: new URL(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`),
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.openGraph?.title || seo.title,
      description: seo.openGraph?.description || seo.description,
      images: openGraphImages,
      url: getRelativeURL(docType, seo.slug?.current),
    },
    alternates: {
      canonical: canonicalLink,
    },
    keywords: seo.others?.keywords,
    robots: {
      index: !disableIndexing,
      follow: !disableFollow,
      noimageindex: disableImageIndexing,
      nosnippet: disableSnippet,
    },
  };
}
