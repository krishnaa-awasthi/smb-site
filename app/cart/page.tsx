'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';

import { products } from '@/data/products';
import { useCart } from '@/components/cart/CartProvider';
import { buildOrderMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { createOrderId } from '@/lib/order-id';
import { formatINR } from '@/lib/money';

type OrderType = 'delivery' | 'pickup';

type FormErrors = {
  name?: string;
  orderType?: string;
  address?: string;
  when?: string;
  notes?: string;
};

export default function CartPage() {
  const {
    lines,
    subtotal,
    isHydrated,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [name, setName] = useState('');
  const [orderType, setOrderType] =
    useState<OrderType>('delivery');
  const [address, setAddress] = useState('');
  const [when, setWhen] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [isSending, setIsSending] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState('');

  /*
   * Resolve cart lines against the current product catalogue.
   */
  const resolvedLines = useMemo(() => {
    return lines
      .map((line) => {
        const product = products.find(
          (item) => item.id === line.productId,
        );

        if (!product) {
          return null;
        }

        const variant = product.variants.find(
          (item) => item.id === line.variantId,
        );

        if (!variant) {
          return null;
        }

        return {
          ...line,
          product,
          variant,
          lineTotal:
            variant.price * line.qty,
        };
      })
      .filter(
        (
          line,
        ): line is NonNullable<typeof line> =>
          line !== null,
      );
  }, [lines]);

  /*
   * Wait until localStorage hydration has completed.
   */
  if (!isHydrated) {
    return (
      <main className="min-h-screen bg-ivory">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-6">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded bg-ink/10" />

            <div className="mt-8 h-40 rounded-ctl bg-ink/5" />
          </div>
        </div>
      </main>
    );
  }

  /*
   * Empty cart.
   */
  if (resolvedLines.length === 0) {
    return (
      <main className="min-h-screen bg-ivory">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/5">
            <ShoppingBag
              size={32}
              strokeWidth={1.5}
              className="text-primary"
            />
          </div>

          <h1 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-ink-soft">
            Add some sweets, namkeen, bakery
            items or restaurant dishes before
            checking out.
          </p>

          <Link
            href="/sweets"
            className="mt-8 rounded-ctl bg-primary px-7 py-3 text-sm font-medium text-ivory transition-colors hover:bg-primary/90"
          >
            Browse sweets
          </Link>
        </div>
      </main>
    );
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {};

    const trimmedName = name.trim();
    const trimmedAddress = address.trim();
    const trimmedWhen = when.trim();
    const trimmedNotes = notes.trim();

    if (
      trimmedName.length < 2 ||
      trimmedName.length > 60
    ) {
      nextErrors.name =
        'Please enter your name (2–60 characters).';
    }

    if (
      orderType !== 'delivery' &&
      orderType !== 'pickup'
    ) {
      nextErrors.orderType =
        'Please select an order type.';
    }

    if (orderType === 'delivery') {
      if (
        trimmedAddress.length < 10 ||
        trimmedAddress.length > 300
      ) {
        nextErrors.address =
          'Please enter a valid delivery address (10–300 characters).';
      }
    }

    if (trimmedWhen.length > 60) {
      nextErrors.when =
        'Preferred time must be 60 characters or less.';
    }

    if (trimmedNotes.length > 300) {
      nextErrors.notes =
        'Notes must be 300 characters or less.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleWhatsAppCheckout() {
    setErrorMessage('');

    if (!validate()) {
      return;
    }

    if (resolvedLines.length === 0) {
      setErrorMessage(
        'Your cart is empty. Please add an item first.',
      );
      return;
    }

    setIsSending(true);

    try {
      const orderId = createOrderId();

      const message = buildOrderMessage({
        orderId,

        lines: resolvedLines.map((line) => ({
          name: line.product.name,
          variantLabel:
            line.variant.label || 'Standard',
          qty: line.qty,
          lineTotal: line.lineTotal,
          ...(line.note
            ? { note: line.note }
            : {}),
        })),

        subtotal,

        customer: {
          name: name.trim(),
          orderType,
          ...(orderType === 'delivery' &&
          address.trim()
            ? {
                address: address.trim(),
              }
            : {}),
          ...(when.trim()
            ? {
                when: when.trim(),
              }
            : {}),
        },

        ...(notes.trim()
          ? {
              orderNote: notes.trim(),
            }
          : {}),
      });

      const result = buildWhatsAppUrl(message);

      /*
       * If the generated URL is too long,
       * copy the raw message and open the
       * normal WhatsApp chat.
       */
      if (result.tooLong) {
        try {
          await navigator.clipboard.writeText(
            message,
          );
        } catch {
          // Clipboard may be unavailable.
        }

        const phone =
          process.env
            .NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(
              /\D/g,
              '',
            );

        if (!phone) {
          throw new Error(
            'WhatsApp number is not configured.',
          );
        }

        const chatUrl =
          `https://wa.me/${phone}`;

        const popup = window.open(
          chatUrl,
          '_blank',
          'noopener,noreferrer',
        );

        if (!popup) {
          window.location.href = chatUrl;
        }

        setSuccess(true);
        setErrorMessage(
          'Your order is long. We copied it to your clipboard. Paste it into the WhatsApp chat and send it.',
        );

        return;
      }

      /*
       * Open WhatsApp with the order already
       * written in the message box.
       */
      const popup = window.open(
        result.url,
        '_blank',
        'noopener,noreferrer',
      );

      if (!popup) {
        window.location.href = result.url;
      }

      setSuccess(true);
    } catch (error) {
      console.error(
        'WhatsApp checkout failed:',
        error,
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to open WhatsApp. Please try again.',
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-ivory">
      {/* Header */}

      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10">
          <Link
            href="/sweets"
            className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            Continue shopping
          </Link>

          <h1 className="mt-6 font-display text-3xl text-ink sm:text-4xl">
            Your Cart
          </h1>

          <p className="mt-2 text-sm text-ink-soft">
            Review your items and send your
            order directly to Shiv Mishthan
            Bhandar on WhatsApp.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* =================================================
              LEFT — CART ITEMS
              ================================================= */}

          <section>
            <div className="rounded-ctl border border-ink/10 bg-white">
              <div className="border-b border-ink/10 px-5 py-4 sm:px-6">
                <h2 className="font-display text-xl text-ink">
                  Order items
                </h2>

                <p className="mt-1 text-xs text-ink-soft">
                  {lines.reduce(
                    (total, line) =>
                      total + line.qty,
                    0,
                  )}{' '}
                  items
                </p>
              </div>

              <div className="divide-y divide-ink/10">
                {resolvedLines.map((line) => (
                  <div
                    key={line.key}
                    className="p-5 sm:p-6"
                  >
                    <div className="flex gap-4">
                      {/* Image */}

                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-ctl bg-primary/5 sm:h-28 sm:w-28">
                        {line.product.images[0] ? (
                          <Image
                            src={
                              line.product
                                .images[0].src
                            }
                            alt={
                              line.product
                                .images[0].alt ||
                              line.product.name
                            }
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-ink-soft">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Details */}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              href={`/${line.product.category}/${line.product.slug}`}
                              className="text-sm font-medium text-ink hover:text-primary"
                            >
                              {line.product.name}
                            </Link>

                            <p className="mt-1 text-xs text-ink-soft">
                              {line.variant.label ||
                                'Standard'}
                            </p>

                            <p className="mt-1 text-xs text-ink-soft">
                              {formatINR(
                                line.variant
                                  .price,
                              )}{' '}
                              / unit
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(
                                line.key,
                              )
                            }
                            aria-label={`Remove ${line.product.name}`}
                            className="text-ink-soft transition-colors hover:text-red-600"
                          >
                            <Trash2
                              size={17}
                            />
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          {/* Quantity */}

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
                              className="flex h-full w-9 items-center justify-center hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="flex h-full w-9 items-center justify-center border-x border-ink/10 text-xs font-semibold">
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
                              className="flex h-full w-9 items-center justify-center hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-30"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Line total */}

                          <p className="text-sm font-semibold text-ink">
                            {formatINR(
                              line.lineTotal,
                            )}
                          </p>
                        </div>

                        {line.note && (
                          <p className="mt-3 rounded-md bg-primary/5 px-3 py-2 text-xs text-ink-soft">
                            Message: {line.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-ink/10 px-5 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-ink-soft underline underline-offset-4 hover:text-red-600"
                >
                  Clear cart
                </button>
              </div>
            </div>
          </section>

          {/* =================================================
              RIGHT — CHECKOUT
              ================================================= */}

          <section>
            <div className="sticky top-24 rounded-ctl border border-ink/10 bg-white p-5 sm:p-6">
              <h2 className="font-display text-2xl text-ink">
                Checkout
              </h2>

              <p className="mt-1 text-xs leading-5 text-ink-soft">
                No online payment is required.
                Your order will be confirmed
                by the shop on WhatsApp.
              </p>

              {/* Name */}

              <div className="mt-6">
                <label
                  htmlFor="customer-name"
                  className="text-sm font-medium text-ink"
                >
                  Name <span className="text-primary">*</span>
                </label>

                <input
                  id="customer-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Your name"
                  maxLength={60}
                  className="mt-2 min-h-11 w-full rounded-ctl border border-ink/15 bg-ivory px-4 text-sm text-ink outline-none transition focus:border-primary"
                />

                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Order type */}

              <div className="mt-5">
                <p className="text-sm font-medium text-ink">
                  Order type{' '}
                  <span className="text-primary">
                    *
                  </span>
                </p>

                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      setOrderType('delivery')
                    }
                    className={[
                      'rounded-ctl border px-4 py-3 text-left text-sm transition',
                      orderType === 'delivery'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-ink/15 text-ink hover:border-primary/40',
                    ].join(' ')}
                  >
                    <span className="font-medium">
                      Home delivery
                    </span>

                    <span className="mt-1 block text-xs text-ink-soft">
                      Get it delivered
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setOrderType('pickup')
                    }
                    className={[
                      'rounded-ctl border px-4 py-3 text-left text-sm transition',
                      orderType === 'pickup'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-ink/15 text-ink hover:border-primary/40',
                    ].join(' ')}
                  >
                    <span className="font-medium">
                      Store pickup
                    </span>

                    <span className="mt-1 block text-xs text-ink-soft">
                      Pick up from the shop
                    </span>
                  </button>
                </div>

                {errors.orderType && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.orderType}
                  </p>
                )}
              </div>

              {/* Address */}

              {orderType === 'delivery' && (
                <div className="mt-5">
                  <label
                    htmlFor="customer-address"
                    className="text-sm font-medium text-ink"
                  >
                    Delivery address{' '}
                    <span className="text-primary">
                      *
                    </span>
                  </label>

                  <textarea
                    id="customer-address"
                    value={address}
                    onChange={(event) =>
                      setAddress(event.target.value)
                    }
                    placeholder="House no., street, locality..."
                    maxLength={300}
                    rows={4}
                    className="mt-2 w-full resize-none rounded-ctl border border-ink/15 bg-ivory px-4 py-3 text-sm text-ink outline-none transition focus:border-primary"
                  />

                  {errors.address && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>
              )}

              {/* Preferred time */}

              <div className="mt-5">
                <label
                  htmlFor="customer-when"
                  className="text-sm font-medium text-ink"
                >
                  Preferred date and time
                </label>

                <input
                  id="customer-when"
                  type="text"
                  value={when}
                  onChange={(event) =>
                    setWhen(event.target.value)
                  }
                  placeholder="Today, 6 PM"
                  maxLength={60}
                  className="mt-2 min-h-11 w-full rounded-ctl border border-ink/15 bg-ivory px-4 text-sm text-ink outline-none transition focus:border-primary"
                />

                {errors.when && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.when}
                  </p>
                )}
              </div>

              {/* Notes */}

              <div className="mt-5">
                <label
                  htmlFor="customer-notes"
                  className="text-sm font-medium text-ink"
                >
                  Notes for the shop
                </label>

                <textarea
                  id="customer-notes"
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
                  placeholder="Anything the shop should know?"
                  maxLength={300}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-ctl border border-ink/15 bg-ivory px-4 py-3 text-sm text-ink outline-none transition focus:border-primary"
                />

                {errors.notes && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.notes}
                  </p>
                )}
              </div>

              {/* Summary */}

              <div className="mt-6 border-t border-ink/10 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-soft">
                    Subtotal
                  </span>

                  <span className="font-display text-xl text-ink">
                    {formatINR(subtotal)}
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-ink-soft">
                  Delivery charges, if any, are
                  confirmed by the shop on
                  WhatsApp.
                </p>
              </div>

              {/* Error */}

              {errorMessage && (
                <div className="mt-4 rounded-ctl bg-red-50 px-4 py-3 text-xs leading-5 text-red-700">
                  {errorMessage}
                </div>
              )}

              {/* Success */}

              {success && (
                <div className="mt-4 rounded-ctl bg-primary/5 px-4 py-4">
                  <div className="flex gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-primary"
                    />

                    <div>
                      <p className="text-sm font-medium text-ink">
                        WhatsApp is open with
                        your order.
                      </p>

                      <p className="mt-1 text-xs leading-5 text-ink-soft">
                        Send the message in
                        WhatsApp to finish your
                        order.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* WhatsApp button */}

              {!success && (
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  disabled={isSending}
                  className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-ctl bg-primary px-5 text-sm font-medium text-ivory transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <MessageCircle
                    size={18}
                  />

                  {isSending
                    ? 'Opening WhatsApp...'
                    : 'Send order on WhatsApp'}
                </button>
              )}

              <p className="mt-3 text-center text-xs leading-5 text-ink-soft">
                This opens WhatsApp with your
                order already written. Nothing is
                charged online.
              </p>

              {/* Back */}

              <Link
                href="/sweets"
                className="mt-4 flex min-h-10 items-center justify-center rounded-ctl px-5 text-sm text-ink transition-colors hover:bg-primary/5"
              >
                Back to shop
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}