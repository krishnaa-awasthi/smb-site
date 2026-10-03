import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Cartouche } from './Cartouche';

interface LogoProps {
  /** lockup: small logo plus wordmark (as in the approved header). badge: cartouche-clipped logo only. */
  variant?: 'lockup' | 'badge';
  /** Rendered height in px. The supplied file is low resolution: never above 140. */
  size?: number;
  href?: string;
  className?: string;
}

export function Logo({ variant = 'lockup', size = 36, href = '/', className }: LogoProps) {
  const px = Math.min(size, 140);
  const img = (
    <Image
      src="/brand/logo.png"
      alt={variant === 'badge' ? `${siteConfig.name} logo` : ''}
      width={px}
      height={Math.round(px * (280 / 291))}
      priority
      className="h-auto w-auto object-contain"
      style={{ height: px, width: 'auto' }}
    />
  );

  return (
    <Link href={href} aria-label={siteConfig.name} className={className}>
      {variant === 'badge' ? (
        <Cartouche outline={false} className="inline-block">
          {img}
        </Cartouche>
      ) : (
        <span className="flex items-center gap-2">
          {img}
          <span className="whitespace-nowrap font-display text-[15px] leading-tight tracking-wide text-primary sm:text-h3">{siteConfig.name}</span>
        </span>
      )}
    </Link>
  );
}