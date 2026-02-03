'use client';

import { CustomLink } from '@/components/custom-link';
import { IHeader } from './interface';
import Link from 'next/link';
import { IconStore } from '@/components/icon-store';
import { CustomSheet } from '@/components/custom-sheet';
import { useState } from 'react';
import { CustomButton } from '@/components/button';

/** This is the header section. This should render at the top of every page. */
export function Header({ menuLinks }: IHeader) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex min-h-[4.5rem] items-center justify-center bg-black py-6 text-white shadow-sm backdrop-blur-sm md:min-h-20">
      <div className="container">
        <div className="grid gap-1">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <h1>
              <Link href={'/'} className="block">
                <IconStore iconName="brand-large" />
              </Link>
              <span className="sr-only">Lemon Hive Next.js Starter</span>
            </h1>
            <CustomSheet
              sheetOpen={sheetOpen}
              onCustomSheetChange={setSheetOpen}
              scrollBarClassName="pb-[6.8125rem] mr-1"
              trigger={
                <button
                  className="flex aspect-square items-center justify-center p-1 text-base md:hidden"
                  onClick={() => setSheetOpen(true)}
                  aria-label="Open Menu"
                >
                  <IconStore iconName="menu" className="text-white" />
                </button>
              }
              content={
                <>
                  <ul className="flex flex-col items-center p-4 pb-[6.0625rem]">
                    {menuLinks.map((menuLink, index) => (
                      <li
                        key={index}
                        className="w-full cursor-pointer py-3 text-center transition-all duration-300 hover:bg-gray-light"
                      >
                        <CustomLink {...menuLink} />
                      </li>
                    ))}
                  </ul>

                  <div className="absolute bottom-0 w-full border-t border-gray-light bg-white p-4">
                    <CustomButton
                      type="action"
                      colorScheme="primary"
                      onButtonClick={() => setSheetOpen(false)}
                      className="w-full text-lg"
                      disabled={false}
                      ariaLabel="Close Menu"
                    >
                      <IconStore
                        iconName="chevron-down"
                        className="-rotate-90"
                      />
                    </CustomButton>
                  </div>
                </>
              }
            />

            {menuLinks && menuLinks.length > 0 && (
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 max-md:hidden">
                {menuLinks.map((menuLink, index) => (
                  <li key={index}>
                    <CustomLink {...menuLink} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
