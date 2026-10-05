import { formatINR } from '@/lib/money';

export type WhatsAppOrderLine = {
  name: string;
  variantLabel?: string;
  qty: number;
  lineTotal: number;
  note?: string;
};

export type WhatsAppCustomer = {
  name: string;
  orderType: 'delivery' | 'pickup';
  address?: string;
  when?: string;
};

export type WhatsAppOrderInput = {
  orderId: string;
  lines: WhatsAppOrderLine[];
  subtotal: number;
  customer?: WhatsAppCustomer;
  orderNote?: string;
};

/**
 * Builds the complete WhatsApp order message.
 *
 * Example:
 *
 * *New order: Shiv Mishthan Bhandar*
 * Order ID: SMB-051026-A7K2
 *
 * *Items*
 * 1. Kaju Katli (500 g) x 2 = ₹1,300
 * 2. Masala Dosa x 1 = ₹140
 *
 * *Subtotal: ₹1,440*
 * Delivery charges, if any, to be confirmed.
 *
 * *Customer*
 * Name: Aman
 * Order type: Home delivery
 * Address: Kanpur
 * Preferred time: Today, 6 PM
 */
export function buildOrderMessage({
  orderId,
  lines,
  subtotal,
  customer,
  orderNote,
}: WhatsAppOrderInput): string {
  const itemLines = lines
    .map((line, index) => {
      const variant = line.variantLabel?.trim()
        ? ` (${line.variantLabel.trim()})`
        : '';

      const note = line.note?.trim()
        ? `\n   Message: ${cleanText(line.note)}`
        : '';

      return `${index + 1}. ${cleanText(
        line.name,
      )}${variant} x ${line.qty} = ${formatINR(
        line.lineTotal,
      )}${note}`;
    })
    .join('\n');

  const sections: string[] = [
    '*New order: Shiv Mishthan Bhandar*',
    `Order ID: ${orderId}`,
    '',
    '*Items*',
    itemLines,
    '',
    `*Subtotal: ${formatINR(subtotal)}*`,
    'Delivery charges, if any, to be confirmed.',
  ];

  if (customer) {
    sections.push('');

    sections.push('*Customer*');

    if (customer.name.trim()) {
      sections.push(
        `Name: ${cleanText(customer.name)}`,
      );
    }

    sections.push(
      `Order type: ${
        customer.orderType === 'delivery'
          ? 'Home delivery'
          : 'Store pickup'
      }`,
    );

    if (
      customer.orderType === 'delivery' &&
      customer.address?.trim()
    ) {
      sections.push(
        `Address: ${cleanText(customer.address)}`,
      );
    }

    if (customer.when?.trim()) {
      sections.push(
        `Preferred time: ${cleanText(customer.when)}`,
      );
    }

    if (orderNote?.trim()) {
      sections.push(
        `Notes: ${cleanText(orderNote)}`,
      );
    }
  }

  return sections.join('\n');
}

/**
 * Creates the WhatsApp URL.
 *
 * WhatsApp expects the complete message to be encoded
 * exactly once.
 *
 * If the URL becomes too long, the caller can copy the
 * message and open the owner's normal WhatsApp chat.
 */
export function buildWhatsAppUrl(
  message: string,
  phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
): {
  url: string;
  tooLong: boolean;
} {
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedPhone) {
    throw new Error(
      'NEXT_PUBLIC_WHATSAPP_NUMBER is not configured.',
    );
  }

  const encodedMessage = encodeURIComponent(message);

  const url = `https://wa.me/${normalizedPhone}?text=${encodedMessage}`;

  return {
    url,
    tooLong: url.length > 1800,
  };
}

/**
 * Opens WhatsApp in a new tab.
 *
 * If the browser blocks the popup, fall back to the
 * current page so the customer can still continue.
 */
export function openWhatsApp(
  message: string,
  phone?: string,
): {
  url: string;
  tooLong: boolean;
} {
  const result = buildWhatsAppUrl(message, phone);

  if (result.tooLong) {
    return result;
  }

  const popup = window.open(
    result.url,
    '_blank',
    'noopener,noreferrer',
  );

  if (!popup) {
    window.location.href = result.url;
  }

  return result;
}

/**
 * Opens the owner's WhatsApp without an order.
 *
 * Used by floating WhatsApp/contact buttons.
 */
export function openWhatsAppChat(
  phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
): void {
  const message =
    'Hello, I would like to place an order.';

  const result = buildWhatsAppUrl(
    message,
    phone,
  );

  const popup = window.open(
    result.url,
    '_blank',
    'noopener,noreferrer',
  );

  if (!popup) {
    window.location.href = result.url;
  }
}

/**
 * Removes control characters from customer-entered
 * text before putting it into the WhatsApp message.
 */
function cleanText(value: string): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * WhatsApp requires an international phone number
 * without +, spaces, brackets or hyphens.
 *
 * Example:
 * +91 98765 43210
 * becomes:
 * 919876543210
 */
function normalizePhone(
  phone?: string,
): string {
  if (!phone) {
    return '';
  }

  return phone.replace(/\D/g, '');
}