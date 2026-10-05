'use client';

import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { useMemo, useState } from 'react';

import type { Product } from '@/types';
import { useCart } from '@/components/cart/CartProvider';
import { useToast } from '@/components/ui/Toast';

interface ProductPurchaseProps {
  product: Product;
}

const MAX_QTY = 20;

const formatINR = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

export function ProductPurchase({
  product,
}: ProductPurchaseProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedVariantId, setSelectedVariantId] =
    useState(product.variants[0]?.id ?? '');

  const [quantity, setQuantity] = useState(1);

  const selectedVariant = useMemo(
    () =>
      product.variants.find(
        (variant) =>
          variant.id === selectedVariantId,
      ) ?? product.variants[0],
    [product.variants, selectedVariantId],
  );

  const unitPrice = selectedVariant?.price ?? 0;
  const totalPrice = unitPrice * quantity;

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(1, current - 1),
    );
  }

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(MAX_QTY, current + 1),
    );
  }

  function handleQuantityChange(value: string) {
    if (value === '') {
      setQuantity(1);
      return;
    }

    const parsed = Number(value);

    if (!Number.isFinite(parsed)) {
      return;
    }

    setQuantity(
      Math.min(
        MAX_QTY,
        Math.max(1, Math.floor(parsed)),
      ),
    );
  }

  function handleVariantChange(variantId: string) {
    setSelectedVariantId(variantId);
    setQuantity(1);
  }

  function handleAddToCart() {
    if (!selectedVariant) {
      toast('Please select a product variant.');
      return;
    }

    if (!product.available) {
      toast('This product is currently unavailable.');
      return;
    }

    addToCart(
      product.id,
      selectedVariant.id,
      quantity,
    );

    toast(
      `${product.name} × ${quantity} added to cart`,
    );
  }

  /*
   * Products with no fixed price should not enter
   * the normal cart flow.
   */
  if (product.priceOnRequest) {
    return (
      <div className="mt-8 border-y border-ink/10 py-6">
        <p className="text-sm text-ink-soft">
          Pricing
        </p>

        <p className="mt-1 font-display text-2xl text-primary">
          Price on request
        </p>

        <p className="mt-2 max-w-md text-sm leading-6 text-ink-soft">
          Contact us for the current price,
          availability and available quantities.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 border-y border-ink/10 py-6">
      {/* VARIANT / SIZE */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-ink">
            {product.variants.length > 1
              ? 'Select size'
              : 'Price'}
          </p>

          {selectedVariant && (
            <p className="text-sm font-semibold text-primary">
              {formatINR(selectedVariant.price)}

              {selectedVariant.label && (
                <span className="font-normal text-ink-soft">
                  {' '}
                  / {selectedVariant.label}
                </span>
              )}
            </p>
          )}
        </div>

        {product.variants.length > 1 && (
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {product.variants.map((variant) => {
              const selected =
                variant.id === selectedVariantId;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() =>
                    handleVariantChange(
                      variant.id,
                    )
                  }
                  aria-pressed={selected}
                  className={[
                    'min-h-[68px] rounded-ctl border p-3 text-left transition-all',
                    selected
                      ? 'border-primary bg-primary text-ivory shadow-sm'
                      : 'border-ink/15 bg-ivory text-ink hover:border-primary',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'block text-xs',
                      selected
                        ? 'text-ivory/75'
                        : 'text-ink-soft',
                    ].join(' ')}
                  >
                    {variant.label ||
                      'Standard'}
                  </span>

                  <span className="mt-1 block text-sm font-semibold">
                    {formatINR(variant.price)}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {product.variants.length === 1 &&
          selectedVariant && (
            <div className="mt-3 rounded-ctl border border-primary/20 bg-primary/5 px-4 py-3">
              <span className="text-sm text-ink">
                {selectedVariant.label ||
                  'Standard'}
              </span>
            </div>
          )}
      </div>

      {/* QUANTITY */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-medium text-ink">
          Quantity
        </p>

        <div className="flex h-12 w-fit items-center overflow-hidden rounded-ctl border border-ink/15 bg-ivory">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-full w-12 items-center justify-center text-ink transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Minus
              size={16}
              strokeWidth={1.8}
            />
          </button>

          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_QTY}
            value={quantity}
            onChange={(event) =>
              handleQuantityChange(
                event.target.value,
              )
            }
            aria-label="Product quantity"
            className="h-full w-14 border-x border-ink/10 bg-transparent text-center text-sm font-semibold text-ink outline-none"
          />

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={quantity >= MAX_QTY}
            aria-label="Increase quantity"
            className="flex h-full w-12 items-center justify-center text-ink transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus
              size={16}
              strokeWidth={1.8}
            />
          </button>
        </div>

        <p className="mt-2 text-xs text-ink-soft">
          Maximum {MAX_QTY} units per product
          line.
        </p>
      </div>

      {/* TOTAL */}
      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-ink-soft">
            Total
          </p>

          <p className="mt-1 font-display text-2xl text-ink">
            {formatINR(totalPrice)}
          </p>
        </div>

        <p className="text-right text-xs text-ink-soft">
          {quantity} ×{' '}
          {selectedVariant?.label ||
            'unit'}
        </p>
      </div>

      {/* ADD TO CART */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={
          !product.available ||
          !selectedVariant
        }
        className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-ctl bg-primary px-6 text-sm font-medium text-ivory transition-all hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ShoppingBag
          size={18}
          strokeWidth={1.8}
        />

        {product.available
          ? 'Add to cart'
          : 'Currently unavailable'}
      </button>
    </div>
  );
}