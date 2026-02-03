import { PortableText } from '@portabletext/react';
import { portableTextComponents } from './components';
import {
  headingStyles,
  IPortableTextComponent,
  type ISanityPortableTextHeading,
} from './interface';

/**
 * This element renders portable text according to custom
 * blocks and schemas used in sanity's portable text.
 * @param {object}  ICustomPortableText
 * @returns JSX.Element
 */
export function PortableTextComponent({ content }: IPortableTextComponent) {
  const headings: ISanityPortableTextHeading[] = [];

  if (!content) {
    return <></>;
  }

  /**
   * If the editor wants to render a table of contents, we need to
   * extract the headings from the content and pass them to the
   * portable text component.
   */
  const contentTableBlockIndex = content.findIndex(
    (block) => block._type === 'contentTableBlock'
  );

  if (contentTableBlockIndex !== -1) {
    content
      .slice(contentTableBlockIndex)
      .reduce((acc: ISanityPortableTextHeading[], block) => {
        // NOTE: The `children` and `block` check ensures we are in a text block
        if (
          'children' in block &&
          block._type === 'block' &&
          block.style &&
          headingStyles.includes(block.style) &&
          block._key
        ) {
          acc.push({
            style: block.style,
            text: block.children[0]?.text.trim(),
            _key: block._key,
          });
        }

        return acc;
      }, headings);
  }

  return (
    <article className="block space-y-3 after:clear-both after:block">
      <PortableText
        value={content}
        components={portableTextComponents(headings)}
      />
    </article>
  );
}
