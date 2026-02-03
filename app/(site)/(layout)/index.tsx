import { sanityFetch } from '@/backend/sanity/fetch';
import { ISanityLayoutData } from './interface';
import { SANITY_LAYOUT_QUERY } from './query';
import { redirect } from 'next/navigation';
import { extractSanityLinks } from '@/lib/extract-sanity-link';
import { SchemaMarkupScript } from '@/components/schema-markup-script';
import { Header } from './sub-sections/header';
import { Footer } from './sub-sections/footer';
import type { SanityResponse } from '@/lib/types';

interface Props {
  children: React.ReactNode;
}

export async function Layout({ children }: Props) {
  const { data }: { data: SanityResponse<ISanityLayoutData> } =
    await sanityFetch({
      query: SANITY_LAYOUT_QUERY,
    });

  if (!data) {
    redirect('/500');
  }

  const headerMenuLinks = extractSanityLinks(data.header.menuLinks);
  const footerMenuLinks = extractSanityLinks(data.footer.menuLinks);

  return (
    <>
      {data.schemaMarkupDefinitions && (
        <SchemaMarkupScript schemaMarkups={data.schemaMarkupDefinitions} />
      )}
      <Header menuLinks={headerMenuLinks} />
      {children}
      <Footer menuLinks={footerMenuLinks} />
    </>
  );
}
