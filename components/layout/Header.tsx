'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Menu,
  Phone,
  Search,
  ShoppingBag,
} from 'lucide-react';

import { cn } from '@/lib/cn';
import { navLinks, siteConfig, telUrl } from '@/config/site';
import { Logo } from '@/components/brand/Logo';
import { MobileMenu } from './MobileMenu';
import { useCart } from '@/components/cart/CartProvider';

const HEADER_COLOR = '#ffffcc';
const SCALLOP_HEIGHT = 55;

const iconButton =
  'relative flex h-11 w-11 items-center justify-center rounded-ctl text-ink-variant transition-colors hover:text-primary';

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      // Always reveal the header near the top of the page.
      if (y < 120) {
        setHidden(false);
        lastY = y;
        return;
      }

      const delta = y - lastY;

      // Ignore small movements to prevent flickering.
      if (Math.abs(delta) < 6) return;

      setHidden(delta > 0);
      lastY = y;
    };

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const cartHasItems = itemCount > 0;

  return (
    <>
      <header
        onFocusCapture={() => setHidden(false)}
        className={cn(
          // Include the scallop height in the header box so that
          // hide-on-scroll moves the entire decoration offscreen.
          'fixed inset-x-0 top-0 z-40',
          'h-[119px] md:h-[135px]',
          'transition-transform duration-[280ms] ease-brand',
          hidden && '-translate-y-full',
        )}
      >
        {/* ==================================================
            MAIN HEADER BAR
            ================================================== */}

        <div
          className="relative z-10 bg-[#ffffcc]"
          style={{ backgroundColor: HEADER_COLOR }}
        >
          <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 md:h-20 lg:px-12">
            {/* Logo */}
            <Logo size={60} />

            {/* Desktop navigation */}
            <nav
              aria-label="Main"
              className="hidden items-center gap-6 lg:flex"
            >
              {navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={
                      active ? 'page' : undefined
                    }
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

            {/* Header actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Phone */}
              <a
                href={telUrl()}
                aria-label={`Call ${siteConfig.callNumber}`}
                className="hidden items-center gap-1.5 px-2 text-small text-ink-variant transition-colors hover:text-primary md:flex"
              >
                <Phone
                  aria-hidden="true"
                  className="h-5 w-5"
                  strokeWidth={1.5}
                />

                <span>{siteConfig.callNumber}</span>
              </a>

              {/* Search */}
              

              {/* Cart */}
              <div className="group relative">
                <button
                  type="button"
                  onClick={openCart}
                  aria-label={
                    cartHasItems
                      ? `Open cart, ${itemCount} ${
                          itemCount === 1 ? 'item' : 'items'
                        }`
                      : 'Open cart, cart is empty'
                  }
                  aria-haspopup="dialog"
                  className={cn(
                    iconButton,
                    cartHasItems && 'text-primary',
                  )}
                >
                  <ShoppingBag
                    aria-hidden="true"
                    className="h-[22px] w-[22px]"
                    strokeWidth={1.5}
                  />

                  {cartHasItems && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-0.5 -top-0.5 flex min-h-[19px] min-w-[19px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-ivory shadow-sm"
                    >
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </button>

                {/* Cart tooltip */}
                <div className="pointer-events-none absolute right-0 top-[calc(100%+10px)] z-50 w-max max-w-[220px] translate-y-1 rounded-ctl border border-ink/10 bg-ivory px-3 py-2 text-xs leading-5 text-ink opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {cartHasItems ? (
                    <>
                      {itemCount}{' '}
                      {itemCount === 1 ? 'item' : 'items'} in
                      your cart
                    </>
                  ) : (
                    <>Shop now to add something to your cart.</>
                  )}
                </div>
              </div>

              {/* Mobile menu */}
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className={cn(iconButton, 'lg:hidden')}
              >
                <Menu
                  aria-hidden="true"
                  className="h-[22px] w-[22px]"
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================
            SCALLOPED BOTTOM EDGE
            ================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-16
            h-[55px]
            md:top-20
          "
          style={{
            backgroundImage:
              'radial-gradient(circle at 54px 0, #ffffcc 54.5px, transparent 55px)',
            backgroundSize: `108px ${SCALLOP_HEIGHT}px`,
            backgroundRepeat: 'repeat-x',
          }}
        />
      </header>

      {/* Mobile navigation drawer */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}