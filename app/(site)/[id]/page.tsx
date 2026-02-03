import { sanityFetch } from '@/backend/sanity/fetch';
import { Metadata } from 'next';
import {
  ISanityLimitedSeoData,
  ISanitySeoData,
} from '@/backend/sanity/fragments/root/seo/interface';
import { extractMetadata } from '@/lib/extract-metadata';
import {
  SANITY_ALL_GENERAL_PAGES_QUERY,
  SANITY_GENERAL_PAGE_QUERY,
  SANITY_GENERAL_PAGE_SEO_QUERY,
} from './query';
import { notFound } from 'next/navigation';
import { PageParams, type SanityResponse } from '@/lib/types';
import { ISanityGeneralPageQueryResponse } from './interface';
import { SchemaMarkupScript } from '@/components/schema-markup-script';
import { SectionBuilder } from '@/buildable-sections';

export default async function Page({ params }: PageParams) {
  const { data }: { data: SanityResponse<ISanityGeneralPageQueryResponse> } =
    await sanityFetch({
      query: SANITY_GENERAL_PAGE_QUERY,
      params: {
        slug: params.id,
      },
    });

  if (!data) {
    notFound();
  }

  const { schemaMarkupDefinitions, pageSections } = data;

  return (
    <>
      {schemaMarkupDefinitions && (
        <SchemaMarkupScript schemaMarkups={schemaMarkupDefinitions} />
      )}
      <SectionBuilder sections={pageSections} />
    </>
  );
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { data }: { data: SanityResponse<ISanitySeoData> } = await sanityFetch({
    query: SANITY_GENERAL_PAGE_SEO_QUERY,
    params: {
      slug: params.id,
    },
    stega: false,
  });

  if (!data) {
    notFound();
  }

  return extractMetadata({ data, docType: 'generalPage' });
}

// Get all page routes
export async function generateStaticParams() {
  const { data }: { data: SanityResponse<ISanityLimitedSeoData[]> } =
    await sanityFetch({
      query: SANITY_ALL_GENERAL_PAGES_QUERY,
      perspective: 'published',
      stega: false,
    });

  if (data) {
    return data.map((doc) => ({
      slug: doc.slug,
    }));
  } else {
    notFound();
  }
}
