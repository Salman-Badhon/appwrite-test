import '../globals.css';
import { primary } from '@/fonts';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Toaster } from '@/components/ui/sonner';
import { draftMode } from 'next/headers';
import { Layout } from './(layout)';
import { DisableDraftMode } from '@/components/disable-draft-mode';
import { VisualEditing } from 'next-sanity';
import { SanityLive } from '@/backend/sanity/fetch';

export default async function RootLayout({ children }: PropsWithChildren) {
  const isInDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="en">
      <body
        className={clsx(
          '[--header-height:4.5rem] md:[--header-height:5rem]',
          primary.variable,
          'font-primary'
        )}
      >
        <Layout>{children}</Layout>

        <SanityLive />

        {isInDraftMode && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}

        <Toaster />
      </body>
    </html>
  );
}
