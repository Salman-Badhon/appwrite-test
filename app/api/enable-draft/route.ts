import { client } from '@/backend/sanity/client';
import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { token } from '@/backend/sanity/token';

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
});
