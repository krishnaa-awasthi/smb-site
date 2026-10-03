'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { formatINR } from '@/lib/money';
import type { Product } from '@/types';
import { ImageArch } from '@/components/brand/ImageArch';
import { ImagePlaceholder } from '@/components/brand/ImagePlaceholder';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { VegMark } from '@/components/ui/VegMark';

interface BestsellerCardProps {
  product: Product;
  /** Every second card sits a little lower, as in the approved design. */
  offset?: boolean;
}

/** Boxed card with an arch photo, price for the default size and a quick Add button. */
export function BestsellerCard({ product, offset }: BestsellerCardProps) {
  const { toast } = useToast();
  const variant = product.variants[0];
  const image = product.images[0];
  const href = `/${product.category}/${product.slug}`;

  function handleAdd() {
    // TODO(step 5): add to the cart store and show "{name} ({size}) added".
    toast('The cart is connected in a later step.');
  }

  return (
    <article
      className={cn(
        'flex w-[300px] shrink-0 snap-start flex-col gap-2 rounded-ctl bg-surface-low p-2 shadow-sm transition-shadow duration-[160ms] hover:shadow-md',
        offset && 'translate-y-4',
      )}
    >
      <Link href={href} className="relative block" aria-label={product.name}>
        <ImageArch aspect="aspect-[4/5]" className="rounded-b-[0.25rem] bg-surface-mid">
          {image ? (
            <Image src={image.src} alt={image.alt} fill sizes="300px" className="object-cover" />
          ) : (
            <ImagePlaceholder name={product.name} />
          )}
        </ImageArch>
        {/* Marks sit at the bottom corners: the arch clips the top corners. */}
        <VegMark diet={product.diet} className="absolute bottom-2 left-2" />
        {product.bestseller && <Badge className="absolute bottom-2 right-2">Bestseller</Badge>}
      </Link>

      <div className="flex flex-col gap-2 px-1 pb-1 pt-1">
        <Link href={href} className="font-display text-product text-ink hover:text-primary">
          {product.name}
        </Link>
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold tabular-nums text-primary">
            {formatINR(variant.price)}{' '}
            <span className="font-normal text-ink-soft">/ {variant.label}</span>
          </span>
          <Button
            onClick={handleAdd}
            disabled={!product.available}
            aria-label={`Add ${product.name} to cart`}
          >
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}