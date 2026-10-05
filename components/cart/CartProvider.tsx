'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { products } from '@/data/products';
import type { CartLine } from '@/types';

const CART_STORAGE_KEY = 'smb-cart-v1';
const MAX_QTY = 20;

interface CartContextValue {
  lines: CartLine[];

  itemCount: number;
  subtotal: number;

  isHydrated: boolean;
  isCartOpen: boolean;

  addToCart: (
    productId: string,
    variantId: string,
    quantity?: number,
    note?: string,
  ) => void;

  updateQuantity: (key: string, quantity: number) => void;

  removeFromCart: (key: string) => void;

  clearCart: () => void;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function clampQuantity(quantity: number) {
  return Math.min(MAX_QTY, Math.max(1, Math.floor(quantity)));
}

function getProductAndVariant(productId: string, variantId: string) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return null;
  }

  const variant = product.variants.find((item) => item.id === variantId);

  if (!variant) {
    return null;
  }

  return {
    product,
    variant,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /*
   * Load the cart only on the client.
   *
   * This avoids hydration mismatches because localStorage
   * does not exist during server rendering.
   */
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);

      if (!stored) {
        setIsHydrated(true);
        return;
      }

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        setIsHydrated(true);
        return;
      }

      const validLines: CartLine[] = parsed
        .filter(
          (line): line is CartLine =>
            line &&
            typeof line === 'object' &&
            typeof line.key === 'string' &&
            typeof line.productId === 'string' &&
            typeof line.variantId === 'string' &&
            typeof line.qty === 'number',
        )
        .map((line) => ({
          key: `${line.productId}:${line.variantId}`,
          productId: line.productId,
          variantId: line.variantId,
          qty: clampQuantity(line.qty),
          ...(line.note ? { note: line.note } : {}),
        }))
        .filter((line) =>
          Boolean(getProductAndVariant(line.productId, line.variantId)),
        );

      setLines(validLines);
    } catch {
      /*
       * If localStorage contains corrupted data,
       * start with an empty cart instead of breaking the site.
       */
      setLines([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  /*
   * Persist cart whenever it changes.
   */
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(lines),
      );
    } catch {
      // Ignore storage errors.
    }
  }, [lines, isHydrated]);

  /*
   * Keep the cart synchronized between browser tabs.
   */
  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== CART_STORAGE_KEY) {
        return;
      }

      try {
        const parsed = event.newValue
          ? JSON.parse(event.newValue)
          : [];

        if (!Array.isArray(parsed)) {
          return;
        }

        const validLines: CartLine[] = parsed
          .filter(
            (line): line is CartLine =>
              line &&
              typeof line === 'object' &&
              typeof line.key === 'string' &&
              typeof line.productId === 'string' &&
              typeof line.variantId === 'string' &&
              typeof line.qty === 'number',
          )
          .map((line) => ({
            key: `${line.productId}:${line.variantId}`,
            productId: line.productId,
            variantId: line.variantId,
            qty: clampQuantity(line.qty),
            ...(line.note ? { note: line.note } : {}),
          }))
          .filter((line) =>
            Boolean(
              getProductAndVariant(
                line.productId,
                line.variantId,
              ),
            ),
          );

        setLines(validLines);
      } catch {
        // Ignore malformed storage events.
      }
    }

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const addToCart = useCallback(
    (
      productId: string,
      variantId: string,
      quantity = 1,
      note?: string,
    ) => {
      const result = getProductAndVariant(productId, variantId);

      if (!result) {
        console.error(
          `Unable to add product ${productId}:${variantId} to cart.`,
        );
        return;
      }

      if (!result.product.available) {
        return;
      }

      setLines((currentLines) => {
        const key = `${productId}:${variantId}`;

        const existingLine = currentLines.find(
          (line) => line.key === key,
        );

        if (existingLine) {
          return currentLines.map((line) =>
            line.key === key
              ? {
                  ...line,
                  qty: clampQuantity(
                    line.qty + quantity,
                  ),
                  ...(note !== undefined
                    ? { note }
                    : {}),
                }
              : line,
          );
        }

        return [
          ...currentLines,
          {
            key,
            productId,
            variantId,
            qty: clampQuantity(quantity),
            ...(note !== undefined ? { note } : {}),
          },
        ];
      });

      setIsCartOpen(true);
    },
    [],
  );

  const updateQuantity = useCallback(
    (key: string, quantity: number) => {
      if (!Number.isFinite(quantity)) {
        return;
      }

      const nextQuantity = Math.floor(quantity);

      if (nextQuantity <= 0) {
        setLines((currentLines) =>
          currentLines.filter(
            (line) => line.key !== key,
          ),
        );

        return;
      }

      setLines((currentLines) =>
        currentLines.map((line) =>
          line.key === key
            ? {
                ...line,
                qty: clampQuantity(nextQuantity),
              }
            : line,
        ),
      );
    },
    [],
  );

  const removeFromCart = useCallback((key: string) => {
    setLines((currentLines) =>
      currentLines.filter((line) => line.key !== key),
    );
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen((current) => !current);
  }, []);

  const itemCount = useMemo(
    () =>
      lines.reduce(
        (total, line) => total + line.qty,
        0,
      ),
    [lines],
  );

  /*
   * Prices always come from the current product catalogue,
   * rather than being trusted from localStorage.
   */
  const subtotal = useMemo(() => {
    return lines.reduce((total, line) => {
      const result = getProductAndVariant(
        line.productId,
        line.variantId,
      );

      if (!result) {
        return total;
      }

      return total + result.variant.price * line.qty;
    }, 0);
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount,
      subtotal,
      isHydrated,
      isCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      lines,
      itemCount,
      subtotal,
      isHydrated,
      isCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider.',
    );
  }

  return context;
}