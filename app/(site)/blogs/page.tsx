import { sanityFetch } from '@/backend/sanity/fetch';
import { SANITY_BLOGS_PAGE_QUERY, SANITY_BLOGS_PAGE_SEO_QUERY } from './query';
import { Metadata } from 'next';
import { ISanitySeoData } from '@/backend/sanity/fragments/root/seo/interface';
import { extractMetadata } from '@/lib/extract-metadata';
import { ISanityBlogsPageQueryResponse } from './interface';
import { notFound } from 'next/navigation';
import { SchemaMarkupScript } from '@/components/schema-markup-script';
import { SectionBuilder } from '@/buildable-sections';
import type { SanityResponse } from '@/lib/types';
import BlogListSectionBuilder from './builder/blog-list';

export default async function Page() {
  const { data }: { data: SanityResponse<ISanityBlogsPageQueryResponse> } =
    await sanityFetch({
      query: SANITY_BLOGS_PAGE_QUERY,
    });

  if (!data) {
    notFound();
  }

  const {
    schemaMarkupDefinitions,
    blogs,
    afterBlogListSections,
    beforeBlogListSections,
  } = data;

  return (
    <>
      {schemaMarkupDefinitions && (
        <SchemaMarkupScript schemaMarkups={schemaMarkupDefinitions} />
      )}
      <SectionBuilder sections={beforeBlogListSections} />

      {blogs && blogs.length > 0 && <BlogListSectionBuilder blogs={blogs} />}

      <SectionBuilder sections={afterBlogListSections} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const { data }: { data: SanityResponse<ISanitySeoData> } = await sanityFetch({
    query: SANITY_BLOGS_PAGE_SEO_QUERY,
    stega: false,
  });

  if (!data) {
    notFound();
  }

  return extractMetadata({ data, docType: 'allBlogsPage' });
}
