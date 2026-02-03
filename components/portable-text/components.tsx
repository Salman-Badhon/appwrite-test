import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { PortableTextComponents } from '@portabletext/react';
import {
  ISanityPortableTextImage,
  ISanityPortableTextVideo,
  type ISanityPortableTextContentTableBlock,
} from '@/backend/sanity/fragments/root/portable-text/interface';
import { ISanityCode } from '@/backend/sanity/fragments/root/common';
import { extractSanityLink } from '@/lib/extract-sanity-link';
import { generateImageUrl } from '@/backend/sanity/image-builder';
import { Typography } from '../typography';
import Image from 'next/image';
import { VideoPlayer } from '../video-player';
import Link from 'next/link';
import { cn } from '@/lib/shadcn/utils';
import { generateContentTableStyles, isEmptyBlock } from './utils';
import type { ISanityPortableTextHeading } from './interface';
import type { CSSProperties } from 'react';
const CodeElement = dynamic(() => import('./sub-components/code'));

/*
  In order to render portable text we call PortableText component and pass our api data as value
  and our component rendering instructions as components prop.

  <PortableText
    value={PortableTextSample}
    components={myPortableTextComponents}
  />

    Relevant links:
    https://portabletext.github.io/types/ (types)
    https://www.npmjs.com/package/@portabletext/react (components)
    https://www.npmjs.com/package/@portabletext/react

*/
export function portableTextComponents(
  headings: ISanityPortableTextHeading[]
): PortableTextComponents {
  return {
    /**
     * Blocks are top level objects in a portable text array. We look at the
     * style attribute.
     */
    block: {
      h1: ({ children, value }) => {
        if (isEmptyBlock(children)) {
          return <br />;
        }
        return (
          <Typography size="h1" id={value._key}>
            {children}
          </Typography>
        );
      },
      h2: ({ children, value }) => {
        if (isEmptyBlock(children)) {
          return <br />;
        }
        return (
          <Typography size="h2" id={value._key}>
            {children}
          </Typography>
        );
      },
      h3: ({ children, value }) => {
        if (isEmptyBlock(children)) {
          return <br />;
        }
        return (
          <Typography size="h3" id={value._key}>
            {children}
          </Typography>
        );
      },
      normal: ({ children }) => {
        if (isEmptyBlock(children)) {
          return <br />;
        }
        return <Typography size="p1">{children}</Typography>;
      },
      blockquote: ({ children }) => {
        if (isEmptyBlock(children)) {
          return <br />;
        }

        return (
          <Typography
            className={
              'overflow-hidden rounded-md bg-slate-300 p-6 md:p-8 lg:p-10 xl:p-12'
            }
            size="p1"
          >
            {children}
          </Typography>
        );
      },
    },
    /**
     * Marks are inline stylings (bold, emphasis, italic) for text and links.
     */
    marks: {
      link: ({ value, children }) => {
        const link = extractSanityLink(value);

        if (link && children) {
          return (
            <Link
              href={link.href}
              target={link.target}
              className={cn(
                'text-blue-600 underline',
                (link.disabled || link.href === '') && 'pointer-events-none'
              )}
              prefetch={link.prefetch}
              aria-label={link.ariaLabel}
              aria-disabled={link.disabled}
            >
              {children}
            </Link>
          );
        } else {
          return <></>;
        }
      },
    },
    list: {
      bullet: ({ children, value: { level } }) => {
        const listStyleClasses = [
          'list-[square]',
          'list-disc',
          'list-[circle]',
        ];

        const bulletListClasses = clsx('ml-6 md:ml-7 xl:ml-8 list-outside', [
          listStyleClasses[level % listStyleClasses.length],
        ]);

        return <ul className={bulletListClasses}>{children}</ul>;
      },
      number: ({ children, value: { level } }) => {
        const listStyleClasses = [
          'list-[lower-roman]',
          'list-decimal',
          'list-[lower-alpha]',
        ];

        const numberListClasses = clsx('ml-6 md:ml-7 xl:ml-8 list-outside', [
          listStyleClasses[level % listStyleClasses.length],
        ]);

        return <ol className={numberListClasses}>{children}</ol>;
      },
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    /**
     * Custom blocks in rich text.
     */
    types: {
      portableTextImage: ({ value }) => {
        const portablTextImage = value as ISanityPortableTextImage;

        const image = generateImageUrl({
          source: portablTextImage,
          useCdn: true,
        });

        if (image) {
          return (
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              placeholder="blur"
              blurDataURL={image.lqip}
              alt={image.alt || 'Image'}
            />
          );
        } else {
          return <></>;
        }
      },
      portableTextVideo: ({ value }) => {
        const portablTextVideo = value as ISanityPortableTextVideo;

        if (portablTextVideo.url) {
          return (
            <VideoPlayer
              url={portablTextVideo.url}
              width={'100%'}
              height={'auto'}
            />
          );
        }
      },
      code: ({ value }) => {
        const code: ISanityCode = value;

        return <CodeElement code={code} />;
      },
      iframe: ({ value }) => {
        const iframeValue = value as { embedLink: string };

        return (
          <iframe
            loading={'eager'}
            src={iframeValue.embedLink}
            className="aspect-video"
            width={'100%'}
          />
        );
      },
      contentTableBlock: ({ value }) => {
        const { title } = value as ISanityPortableTextContentTableBlock;

        const styles = generateContentTableStyles(headings);

        return (
          <div className="flex w-full flex-col gap-10 pb-20 pt-10 text-left">
            <Typography size="h1" className="uppercase text-black">
              {title}
            </Typography>

            <div className="grid gap-2">
              {headings.map((title, index) => (
                <Link
                  key={index}
                  href={`#${title._key}`}
                  className="ml-[--tab-space] w-fit underline"
                  style={
                    {
                      '--tab-space': styles[index]?.style,
                    } as CSSProperties
                  }
                >
                  <Typography size="p1">{title.text}</Typography>
                </Link>
              ))}
            </div>
          </div>
        );
      },
    },
  };
}
