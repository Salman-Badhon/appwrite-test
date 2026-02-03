import '../globals.css';
import type { Metadata } from 'next';
import { primary } from '@/fonts';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export const metadata: Metadata = {
  title: 'Lemon Hive NextJS Starter',
  description: 'A NextJS starter template.',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={clsx(primary.variable, 'font-primary')}>{children}</body>
    </html>
  );
}
