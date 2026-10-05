/**
 * Generates a short human-readable order ID.
 *
 * Example:
 * SMB-051026-A7K2
 *
 * Format:
 * SMB-DDMMYY-XXXX
 *
 * The random portion uses only characters that are
 * easy to distinguish in WhatsApp messages.
 */

const CHARACTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function randomCode(length: number): string {
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result +=
      CHARACTERS[
        Math.floor(
          Math.random() * CHARACTERS.length,
        )
      ];
  }

  return result;
}

export function createOrderId(
  date = new Date(),
): string {
  const day = String(
    date.getDate(),
  ).padStart(2, '0');

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, '0');

  const year = String(
    date.getFullYear(),
  ).slice(-2);

  return `SMB-${day}${month}${year}-${randomCode(4)}`;
}