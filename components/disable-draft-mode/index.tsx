'use client';

import { useDraftModeEnvironment } from 'next-sanity/hooks';
import Link from 'next/link';

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // Only show the disable draft mode button when outside of Presentation Tool
  if (environment !== 'live' && environment !== 'unknown') {
    return null;
  }

  return (
    <Link
      href="/api/disable-draft"
      className="fixed bottom-4 right-4 rounded-md bg-sky-600 px-4 py-2 font-bold"
    >
      Disable Draft Mode
    </Link>
  );
}
