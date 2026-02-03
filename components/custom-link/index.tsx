import { cn } from '@/lib/shadcn/utils';
import { ICustomLink } from './interface';
import Link from 'next/link';

/**
 * `CustomLink` is a component that wraps Next.js `Link` component
 * to provide additional functionality.
 * It allows for the creation of a link with customizable properties
 * such as the target window, the ability to open in a new tab, disabling
 * the link, prefetching the page, and more.
 *
 * Note: If a global style is applied to all site links using this component,
 * the portableText component's links will need to be updated separately.
 * This is because the portableText component does not use CustomLink.
 */
export function CustomLink({
  label,
  href,
  disabled,
  prefetch = true,
  className,
  ariaLabel,
  target,
}: ICustomLink) {
  const isExternalProtocol = /^(?:mailto:|tel:|https?:\/\/|ftp:\/\/)/i.test(
    href
  );

  // Use anchor tag for external protocols, Link for internal routes
  const Element = isExternalProtocol ? 'a' : Link;

  return (
    <Element
      href={href}
      target={target}
      className={cn(
        className,
        (disabled || href === '') && 'pointer-events-none'
      )}
      prefetch={isExternalProtocol ? undefined : prefetch}
      aria-label={ariaLabel || label}
      aria-disabled={disabled}
    >
      {label}
    </Element>
  );
}
