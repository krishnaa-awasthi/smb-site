import Link from 'next/link';
import { categories } from '@/data/categories';
import { siteConfig, telUrl } from '@/config/site';

const headingClass = 'text-button font-semibold uppercase tracking-wider text-gold-light';
const textClass = 'text-small text-parchment/80';
const linkClass = 'text-small text-parchment/80 transition-colors hover:text-ivory';

/** Maroon footer, four columns as in the approved design. Server component; all details come from siteConfig. */
export function Footer() {
  return (
    <footer className="w-full bg-maroon pb-6 pt-14 text-ivory md:pt-16">
      <div className="mx-auto w-full max-w-[1320px] px-5 lg:px-12">
        <div className="grid grid-cols-1 gap-10 border-b border-parchment/20 pb-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col gap-4">
            <span className="font-display text-h3 text-gold-light">{siteConfig.name}</span>
            {/* Script font use: footer tagline (1 of 3) */}
            <span className="font-script text-[1.6rem] leading-tight text-gold-light">
              {siteConfig.tagline}
            </span>
            <p className={`${textClass} max-w-[34ch]`}>
              Sweets, a restaurant, a bakery and namkeen in {siteConfig.city}.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className={headingClass}>Quick links</span>
            {categories.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} className={linkClass}>
                {c.name}
              </Link>
            ))}
            <Link href="/about" className={linkClass}>
              About us
            </Link>
            <Link href="/contact" className={linkClass}>
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className={headingClass}>Contact us</span>
            <address className={`${textClass} not-italic`}>{siteConfig.fullAddress}</address>
            <a href={telUrl()} className={linkClass}>
              Phone: {siteConfig.callNumber}
            </a>
            <span className={textClass}>Hours: {siteConfig.hours}</span>
          </div>

          <div className="flex flex-col gap-3">
            <span className={headingClass}>FSSAI licence</span>
            <span className={textClass}>Lic. No. {siteConfig.fssai}</span>
          </div>
        </div>

        <p className="pt-6 text-small text-parchment/60">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}