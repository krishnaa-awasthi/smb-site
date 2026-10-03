'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, Search, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/cn';
import { navLinks, siteConfig, telUrl } from '@/config/site';
import { Logo } from '@/components/brand/Logo';
import { MobileMenu } from './MobileMenu';

const iconButton =
  'relative flex h-11 w-11 items-center justify-center rounded-ctl text-ink-variant transition-colors hover:text-primary';

/**
 * Fixed, translucent cream bar (as in the approved design). Hides when scrolling down past 120 px and
 * returns on scroll up. Search overlay and cart drawer are wired in later steps.
 */
export function Header() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 120) {
        setHidden(false);
        lastY = y;
        return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) < 6) return;
      setHidden(delta > 0);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        onFocusCapture={() => setHidden(false)}
        className={cn(
          'fixed inset-x-0 top-0 z-40 bg-cream/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl',
          'transition-transform duration-[280ms] ease-brand',
          hidden && '-translate-y-full',
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 md:h-20 lg:px-12">
          <Logo size={36} />

          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'text-button transition-colors hover:text-primary',
                    active
                      ? 'font-semibold text-primary underline decoration-2 underline-offset-[6px]'
                      : 'text-ink-variant',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <a
              href={telUrl()}
              className="hidden items-center gap-1.5 px-2 text-small text-ink-variant transition-colors hover:text-primary md:flex"
            >
              <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
              <span>{siteConfig.callNumber}</span>
            </a>
            {/* TODO(step 6): open the search overlay */}
            <button type="button" aria-label="Search" className={cn(iconButton, 'hidden sm:flex')}>
              <Search aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </button>
            {/* TODO(step 5): open the cart drawer and show the item count badge */}
            <button type="button" aria-label="Open cart" className={iconButton}>
              <ShoppingBag aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className={cn(iconButton, 'lg:hidden')}
            >
              <Menu aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}