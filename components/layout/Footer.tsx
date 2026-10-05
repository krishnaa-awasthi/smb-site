import Link from 'next/link';
import { categories } from '@/data/categories';
import { siteConfig, telUrl, whatsappChatUrl } from '@/config/site';

const headingClass =
  'text-button font-semibold uppercase tracking-[0.16em] text-gold-light';

const textClass =
  'text-small leading-6 text-parchment/75';

const linkClass =
  'text-small text-parchment/75 transition-colors hover:text-ivory';

export function Footer() {
  return (
    <footer className="w-full bg-maroon text-ivory">
      <div className="mx-auto w-full max-w-[1320px] px-5 pb-8 pt-14 sm:px-8 md:pt-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-parchment/15 pb-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_0.8fr] lg:gap-14">

          {/* Brand */}
          <div className="flex flex-col">
            <Link
              href="/"
              className="w-fit transition-opacity hover:opacity-90"
            >
              <span className="font-display text-2xl font-semibold text-gold-light sm:text-3xl">
                {siteConfig.name}
              </span>
            </Link>

            <span className="mt-2 font-script text-[1.7rem] leading-tight text-gold-light">
              {siteConfig.tagline}
            </span>

            <p className={`${textClass} mt-5 max-w-[38ch]`}>
              Traditional sweets, delicious food, fresh bakery treats and
              savoury namkeen — made with care in {siteConfig.city}.
            </p>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={telUrl()}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-gold-light/40 px-5 text-sm font-medium text-gold-light transition-colors hover:border-gold-light hover:bg-gold-light/10"
              >
                Call us
              </a>

              <a
                href={whatsappChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gold-light px-5 text-sm font-medium text-maroon transition-colors hover:bg-ivory"
              >
                WhatsApp us
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <span className={headingClass}>Explore</span>

            <div className="mt-1 flex flex-col gap-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className={linkClass}
                >
                  {category.name}
                </Link>
              ))}

              <Link href="/about" className={linkClass}>
                About us
              </Link>

              <a
  href="/contact"
  className={`${linkClass} relative z-10 cursor-pointer`}
>
  Contact
</a>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className={headingClass}>Visit us</span>

            <address className={`${textClass} mt-1 max-w-[34ch] not-italic`}>
              {siteConfig.fullAddress}
            </address>

            <a
              href={telUrl()}
              className={`${linkClass} mt-1`}
            >
              <span className="text-parchment/50">Phone:</span>{' '}
              {siteConfig.callNumber}
            </a>

            <span className={textClass}>
              <span className="text-parchment/50">Hours:</span>{' '}
              {siteConfig.hours}
            </span>

            {siteConfig.mapsUrl && siteConfig.mapsUrl !== '{{MAPS_URL}}' && (
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 w-fit text-small font-medium text-gold-light underline underline-offset-4 transition-colors hover:text-ivory"
              >
                Get directions
              </a>
            )}
          </div>

          {/* Trust */}
          <div className="flex flex-col gap-3">
            <span className={headingClass}>Our details</span>

            <div className="mt-1 rounded-2xl border border-parchment/15 bg-black/10 p-5">
              <p className="text-xs uppercase tracking-[0.12em] text-parchment/50">
                FSSAI licence
              </p>

              <p className="mt-2 text-sm font-medium text-gold-light">
                {siteConfig.fssai}
              </p>
            </div>

            <p className="text-xs leading-5 text-parchment/50">
              For orders, enquiries and product availability, please contact
              us directly.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-parchment/50">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/contact"
              className="text-xs text-parchment/50 transition-colors hover:text-ivory"
            >
              Contact
            </Link>

            <span className="h-1 w-1 rounded-full bg-parchment/30" />

            <Link
              href="/"
              className="text-xs text-parchment/50 transition-colors hover:text-ivory"
            >
              Back to top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}