'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/cn';
import { navLinks, siteConfig, telUrl, whatsappChatUrl } from '@/config/site';
import { ButtonLink } from '@/components/ui/Button';
import { Sheet } from '@/components/ui/Sheet';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

/** Left sheet with the main links, large and left-aligned, plus quick ways to order. */
export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  return (
    <Sheet open={open} onClose={onClose} label="Menu" side="left">
      <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-16" data-lenis-prevent>
        <nav aria-label="Main">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'font-display text-[1.75rem] leading-tight transition-colors hover:text-primary',
                      active ? 'text-primary' : 'text-ink',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-4 pt-10">
          <ButtonLink
            href={whatsappChatUrl()}
            variant="whatsapp"
            fullWidth
            target="_blank"
            rel="noopener noreferrer"
            leadingIcon={<WhatsAppIcon className="h-5 w-5" />}
          >
            Chat on WhatsApp
          </ButtonLink>
          <a
            href={telUrl()}
            className="flex min-h-11 items-center gap-2 text-primary underline-offset-4 hover:underline"
          >
            <Phone aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
            {siteConfig.callNumber}
          </a>
          <p className="text-small text-ink-variant">{siteConfig.fullAddress}</p>
          <p className="text-small text-ink-variant">{siteConfig.hours}</p>
        </div>
      </div>
    </Sheet>
  );
}