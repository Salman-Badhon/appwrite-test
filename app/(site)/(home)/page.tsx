import { sanityFetch } from '@/backend/sanity/fetch';
import { SANITY_HOME_PAGE_QUERY, SANITY_HOME_PAGE_SEO_QUERY } from './query';
import { Metadata } from 'next';
import { ISanitySeoData } from '@/backend/sanity/fragments/root/seo/interface';
import { extractMetadata } from '@/lib/extract-metadata';
import { ISanityHomePageQueryResponse } from './interface';
import { notFound } from 'next/navigation';
import { SchemaMarkupScript } from '@/components/schema-markup-script';
import { SectionBuilder } from '@/buildable-sections';
import type { SanityResponse } from '@/lib/types';

export default async function Page() {
  const { data }: { data: SanityResponse<ISanityHomePageQueryResponse> } =
    await sanityFetch({
      query: SANITY_HOME_PAGE_QUERY,
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

export async function generateMetadata(): Promise<Metadata> {
  const { data }: { data: SanityResponse<ISanitySeoData> } = await sanityFetch({
    query: SANITY_HOME_PAGE_SEO_QUERY,
    stega: false,
  });

  if (!data) {
    notFound();
  }

  return extractMetadata({ data, docType: 'homePage' });
}
