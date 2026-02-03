import { ReactNode, Children } from 'react';
import { ISanityPortableTextHeading } from './interface';

/**
 * This function will return true if a block contains one child
 * with an empty string.
 *
 * This function is used to render <br/> tags.
 * @method isEmptyBlock
 * @param {ReactNode} children
 * @returns boolean
 */
export const isEmptyBlock = (children: ReactNode) => {
  return Children.count(children) == 1 && children?.toString() == '';
};

/**
 * Generates indentation styles for a list of headings to be used in a content table.
 *
 * This function iterates over an array of headings with different heading levels (h1, h2, h3)
 * and assigns an indentation level based on the heading's position in the hierarchy.
 * Each heading's indentation is calculated in pixels, increasing by 16px per level.
 *
 * @param {ISanityPortableTextHeading[]} headings - An array of heading objects, each containing a style (e.g., "h1", "h2", "h3").
 * @returns {Array<{ index: number, style: string }>} - A new array of objects where each object represents a heading
 * with an `index` and a `style` property. The `style` property contains the computed indentation in pixels.
 */

export function generateContentTableStyles(
  headings: ISanityPortableTextHeading[]
) {
  let currentH1 = false;
  let currentH2 = false;

  return headings.map((heading, index) => {
    let indentLevel = 0;

    switch (heading.style) {
      case 'h1':
        indentLevel = 0;
        currentH1 = true;
        currentH2 = false;

        break;
      case 'h2':
        if (currentH1) {
          indentLevel = 1;
        } else {
          indentLevel = 0;
        }
        currentH2 = true;

        break;
      case 'h3':
        if (currentH2 && currentH1) {
          indentLevel = 2;
        } else if (currentH1 || currentH2) {
          indentLevel = 1;
        } else {
          indentLevel = 0;
        }

        break;
      default:
        indentLevel = 0;
    }

    const style = `${indentLevel * 16}px`;

    return { index, style };
  });
}
