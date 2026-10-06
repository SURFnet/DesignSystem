'use client';

import { cn } from '@/lib/utils';

import styles from './skip-link.module.css';

/**
 * Moves focus to the element whose id matches the `#fragment` in `href`. A target that
 * isn't focusable on its own (e.g. `<main>`) gets a temporary `tabindex="-1"`, removed
 * again on blur so it doesn't linger as a click-to-focus region. Returns whether it did.
 */
function focusSkipTarget(href: string | undefined): boolean {
  if (!href?.startsWith('#') || href.length < 2) return false;
  const target = document.getElementById(decodeURIComponent(href.slice(1)));
  if (!target) return false;

  if (target.tabIndex < 0 && !target.hasAttribute('tabindex')) {
    target.setAttribute('tabindex', '-1');
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  }
  target.focus();
  return document.activeElement === target;
}

function SkipLink({
  className,
  href = '#main-content',
  onClick,
  ...props
}: React.ComponentProps<'a'>) {
  return (
    <a
      data-slot="skip-link"
      href={href}
      className={cn(styles.skipLink, className)}
      onClick={(event) => {
        onClick?.(event);
        // Handle the jump ourselves: a plain fragment link doesn't move focus to a
        // non-focusable target in every browser, and client-side routers can swallow it.
        if (!event.defaultPrevented && focusSkipTarget(href)) event.preventDefault();
      }}
      {...props}
    />
  );
}

export { SkipLink };
