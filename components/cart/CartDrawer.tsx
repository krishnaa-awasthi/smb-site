'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { products } from '@/data/products';
import { useCart } from '@/components/cart/CartProvider';

const formatINR = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const ANIMATION_DURATION = 280;

export function CartDrawer() {
  const {
    lines,
    subtotal,
    itemCount,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  /*
   * Controls whether the drawer exists in the DOM.
   *
   * We keep it mounted during the closing animation,
   * otherwise React would remove it immediately.
   */
  const [shouldRender, setShouldRender] = useState(false);

  /*
   * Controls the actual CSS animation state.
   */
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout: number | undefined;

    if (isCartOpen) {
      /*
       * STEP 1
       *
       * Mount the drawer while it is still translated
       * outside the viewport.
       */
      setShouldRender(true);
      setIsVisible(false);

      /*
       * STEP 2
       *
       * Two animation frames are intentional.
       *
       * First frame:
       * React mounts the drawer.
       *
       * Second frame:
       * Browser has had a chance to paint the initial
       * translate-x-full state.
       *
       * Then we switch to translate-x-0 and CSS
       * performs the actual slide animation.
       */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      /*
       * Start closing animation.
       */
      setIsVisible(false);

      /*
       * Remove the drawer only after the animation
       * has finished.
       */
      timeout = window.setTimeout(() => {
        setShouldRender(false);
      }, ANIMATION_DURATION);
    }

    return () => {
      if (timeout !== undefined) {
        window.clearTimeout(timeout);
      }
    };
  }, [isCartOpen]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100]">
      {/* =====================================================
          BACKDROP
          ===================================================== */}

      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className={[
          'absolute inset-0 h-full w-full',
          'bg-ink/40 backdrop-blur-[2px]',
          'transition-opacity duration-[280ms] ease-out',
          isVisible
            ? 'opacity-100'
            : 'opacity-0',
        ].join(' ')}
      />

      {/* =====================================================
          CART DRAWER
          ===================================================== */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={[
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl',

          /*
           * Forces the browser to use GPU compositing
           * for smoother drawer movement.
           */
          'transform-gpu',

          /*
           * Premium ease-out curve.
           */
          'transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]',

          /*
           * Opening:
           * translate-x-full -> translate-x-0
           *
           * Closing:
           * translate-x-0 -> translate-x-full
           */
          isVisible
            ? 'translate-x-0'
            : 'translate-x-full',
        ].join(' ')}
      >
        {/* ===================================================
            HEADER
            =================================================== */}

        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 sm:px-6">
          <div>
            <div className="flex items-center gap-2">
              <ShoppingBag
                size={19}
                strokeWidth={1.8}
                className="text-primary"
              />

              <h2 className="font-display text-xl text-ink">
                Your Cart
              </h2>
            </div>

            <p className="mt-1 text-xs text-ink-soft">
              {itemCount === 0
                ? 'Your cart is empty'
                : `${itemCount} ${
                    itemCount === 1
                      ? 'item'
                      : 'items'
                  }`}
            </p>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-primary/5"
          >
            <X
              size={20}
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* ===================================================
            CART CONTENT
            =================================================== */}

        {lines.length === 0 ? (
          <EmptyCart onClose={closeCart} />
        ) : (
          <>
            {/* =================================================
                ITEMS
                ================================================= */}

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <div className="space-y-5">
                {lines.map((line) => {
                  const product = products.find(
                    (item) =>
                      item.id === line.productId,
                  );

                  if (!product) {
                    return null;
                  }

                  const variant =
                    product.variants.find(
                      (item) =>
                        item.id ===
                        line.variantId,
                    );

                  if (!variant) {
                    return null;
                  }

                  const lineTotal =
                    variant.price * line.qty;

                  return (
                    <div
                      key={line.key}
                      className="flex gap-3 border-b border-ink/10 pb-5"
                    >
                      {/* Product image */}

                      <Link
                        href={`/${product.category}/${product.slug}`}
                        onClick={closeCart}
                        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-ctl bg-primary/5"
                      >
                        {product.images[0] ? (
                          <Image
                            src={
                              product.images[0]
                                .src
                            }
                            alt={
                              product.images[0]
                                .alt ||
                              product.name
                            }
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-ink-soft">
                            No image
                          </div>
                        )}
                      </Link>

                      {/* Product details */}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              href={`/${product.category}/${product.slug}`}
                              onClick={closeCart}
                              className="line-clamp-2 text-sm font-medium text-ink hover:text-primary"
                            >
                              {product.name}
                            </Link>

                            <p className="mt-1 text-xs text-ink-soft">
                              {variant.label ||
                                'Standard'}
                            </p>

                            <p className="mt-1 text-xs text-ink-soft">
                              {formatINR(
                                variant.price,
                              )}{' '}
                              / unit
                            </p>
                          </div>

                          {/* Remove */}

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(
                                line.key,
                              )
                            }
                            aria-label={`Remove ${product.name}`}
                            className="shrink-0 text-ink-soft transition-colors hover:text-red-600"
                          >
                            <Trash2
                              size={16}
                              strokeWidth={1.7}
                            />
                          </button>
                        </div>

                        {/* Quantity controls */}

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex h-9 items-center overflow-hidden rounded-ctl border border-ink/15">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  line.key,
                                  line.qty - 1,
                                )
                              }
                              disabled={
                                line.qty <= 1
                              }
                              aria-label="Decrease quantity"
                              className="flex h-full w-9 items-center justify-center text-ink transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <Minus
                                size={14}
                              />
                            </button>

                            <span className="flex h-full w-9 items-center justify-center border-x border-ink/10 text-xs font-semibold text-ink">
                              {line.qty}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  line.key,
                                  line.qty + 1,
                                )
                              }
                              disabled={
                                line.qty >= 20
                              }
                              aria-label="Increase quantity"
                              className="flex h-full w-9 items-center justify-center text-ink transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <Plus
                                size={14}
                              />
                            </button>
                          </div>

                          {/* Line total */}

                          <p className="text-sm font-semibold text-ink">
                            {formatINR(
                              lineTotal,
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clear cart */}

              <button
                type="button"
                onClick={clearCart}
                className="mt-5 text-xs text-ink-soft underline underline-offset-4 transition-colors hover:text-red-600"
              >
                Clear cart
              </button>
            </div>

            {/* =================================================
                FOOTER
                ================================================= */}

            <div className="border-t border-ink/10 bg-ivory px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-soft">
                  Subtotal
                </span>

                <span className="font-display text-xl text-ink">
                  {formatINR(subtotal)}
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-ink-soft">
                Taxes, delivery charges and final
                order confirmation will be handled
                at checkout.
              </p>

              <button
                type="button"
                className="mt-4 flex min-h-12 w-full items-center justify-center rounded-ctl bg-primary px-5 text-sm font-medium text-ivory transition-colors hover:bg-primary/90"
              >
                Proceed to checkout
              </button>

              <button
                type="button"
                onClick={closeCart}
                className="mt-2 min-h-10 w-full rounded-ctl px-5 text-sm text-ink transition-colors hover:bg-primary/5"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ============================================================
   EMPTY CART
   ============================================================ */

function EmptyCart({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/5">
        <ShoppingBag
          size={26}
          strokeWidth={1.5}
          className="text-primary"
        />
      </div>

      <h3 className="mt-5 font-display text-2xl text-ink">
        Your cart is empty
      </h3>

      <p className="mt-2 max-w-xs text-sm leading-6 text-ink-soft">
        Add your favourite sweets, namkeen,
        bakery items or restaurant dishes to
        get started.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="mt-6 rounded-ctl bg-primary px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-primary/90"
      >
        Continue shopping
      </button>
    </div>
  );
}