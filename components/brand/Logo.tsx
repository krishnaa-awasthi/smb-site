
import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { Cartouche } from './Cartouche';

interface LogoProps {
  /** lockup: logo plus wordmark; badge: cartouche-clipped logo only. */
  variant?: 'lockup' | 'badge';

  /** Rendered height in px. The supplied file is low resolution: never above 140. */
  size?: number;

  href?: string;
  className?: string;

  /** Hide the text wordmark while preserving the original logo image. */
  showWordmark?: boolean;
}

export function Logo({
  variant = 'lockup',
  size = 60,
  href = '/',
  className,
  showWordmark = true,
}: LogoProps) {
  const px = Math.min(size, 140);

  const img = (
    <Image
      src="/brand/logo.png"
      alt=""
      width={px}
      height={Math.round(px * (280 / 291))}
      priority
      className="h-auto w-auto object-contain"
      style={{ height: px, width: 'auto' }}
    />
  );

  return (
    <Link
      href={href}
      aria-label={siteConfig.name}
      className={className}
    >
      {variant === 'badge' ? (
        <Cartouche outline={false} className="inline-block">
          {img}
        </Cartouche>
      ) : showWordmark ? (
        <span className="flex items-center gap-2">
          {img}
        </span>
      ) : (
        img
      )}
    </Link>
  );
}
