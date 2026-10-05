'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

const PHONE_NUMBER =
  process.env.NEXT_PUBLIC_PHONE_NUMBER || WHATSAPP_NUMBER;

const ADDRESS =
  process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ||
  'Shiv Mishthan Bhandar, Kanpur, Uttar Pradesh, India';

const MAP_URL =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
  'https://www.google.com/maps';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      '*Contact enquiry - Shiv Mishthan Bhandar*',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      '',
      `Message: ${form.message}`,
    ].join('\n');

    if (!WHATSAPP_NUMBER) {
      setSubmitted(true);
      return;
    }

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER.replace(
      /\D/g,
      '',
    )}?text=${encodedMessage}`;

    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-ivory text-ink">
      {/* Hero */}
      <section className="border-b border-black/5 bg-primary px-5 py-16 text-ivory sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-ivory/70">
            Get in touch
          </p>

          <h1 className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            We would love to hear from you.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-ivory/80 sm:text-lg">
            Have a question about our sweets, namkeen, bakery products,
            restaurant menu, or an order? Get in touch with Shiv Mishthan
            Bhandar.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Contact information */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/70">
              Contact information
            </p>

            <h2 className="mt-3 font-serif text-3xl leading-tight text-primary sm:text-4xl">
              Visit, call or message us
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-black/60 sm:text-base">
              Whether you are planning a celebration, looking for your
              favourite sweets, or simply want to know more about our
              products, our team is happy to help.
            </p>

            <div className="mt-8 space-y-4">
              {/* Address */}
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                      />
                      <circle cx="12" cy="9" r="2.2" />
                    </svg>
                  </div>

                  <div>
                    <p className="font-medium text-primary">Visit us</p>
                    <p className="mt-1 text-sm leading-6 text-black/60">
                      {ADDRESS}
                    </p>

                    <a
                      href={MAP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex text-sm font-medium text-primary underline underline-offset-4"
                    >
                      Get directions
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.7 3.8 9.2 3a1.4 1.4 0 0 1 1.7.8l1.1 2.8a1.4 1.4 0 0 1-.4 1.5L10 9.6a12.2 12.2 0 0 0 4.4 4.4l1.5-1.6a1.4 1.4 0 0 1 1.5-.4l2.8 1.1a1.4 1.4 0 0 1 .8 1.7l-.8 2.5a1.9 1.9 0 0 1-2 1.3C10.7 17.7 6.3 13.3 5.4 7.8a1.9 1.9 0 0 1 1.3-2Z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="font-medium text-primary">Call us</p>

                    {PHONE_NUMBER ? (
                      <a
                        href={`tel:${PHONE_NUMBER}`}
                        className="mt-1 block text-sm text-black/60 hover:text-primary"
                      >
                        {PHONE_NUMBER}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-black/50">
                        Phone number coming soon
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.5 9.2c.3 2 2.3 4 4.3 4.3.5.1.9-.1 1.2-.5l.5-.7c.2-.3.2-.7-.1-.9l-1.1-.6c-.3-.2-.6-.1-.8.2l-.4.5c-.9-.4-1.5-1-1.9-1.9l.5-.4c.3-.2.4-.5.2-.8l-.6-1.1c-.2-.3-.6-.3-.9-.1l-.7.5c-.4.3-.6.7-.5 1.2Z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="font-medium text-primary">WhatsApp</p>

                    <p className="mt-1 text-sm leading-6 text-black/60">
                      Chat with us directly for orders and enquiries.
                    </p>

                    {WHATSAPP_NUMBER && (
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER.replace(
                          /\D/g,
                          '',
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex text-sm font-medium text-primary underline underline-offset-4"
                      >
                        Start a WhatsApp chat
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle cx="12" cy="12" r="8.5" />
                      <path
                        strokeLinecap="round"
                        d="M12 7v5l3.2 2"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="font-medium text-primary">
                      Opening hours
                    </p>

                    <div className="mt-2 space-y-1 text-sm text-black/60">
                      <p className="flex justify-between gap-8">
                        <span>Monday – Sunday</span>
                        <span>Open daily</span>
                      </p>
                      <p className="text-xs text-black/40">
                        Please contact us for today's exact timings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            {WHATSAPP_NUMBER && (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(
                  /\D/g,
                  '',
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-ivory transition hover:bg-primary/90"
              >
                Chat with us on WhatsApp
              </a>
            )}
          </div>

          {/* Contact form */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/70">
              Send us a message
            </p>

            <h2 className="mt-3 font-serif text-3xl text-primary">
              How can we help?
            </h2>

            <p className="mt-3 text-sm leading-6 text-black/60">
              Fill in your details and we will help you with your enquiry.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl bg-primary/5 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-ivory">
                  ✓
                </div>

                <h3 className="mt-4 text-lg font-medium text-primary">
                  Thank you!
                </h3>

                <p className="mt-2 text-sm leading-6 text-black/60">
                  Your enquiry has been prepared for WhatsApp. Please send
                  the message there to complete the conversation.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 text-sm font-medium text-primary underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-primary"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Your name"
                    className="min-h-12 w-full rounded-xl border border-black/10 bg-ivory px-4 text-sm outline-none transition placeholder:text-black/35 focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-primary"
                  >
                    Phone number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        phone: event.target.value,
                      }))
                    }
                    placeholder="Your phone number"
                    className="min-h-12 w-full rounded-xl border border-black/10 bg-ivory px-4 text-sm outline-none transition placeholder:text-black/35 focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-primary"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-xl border border-black/10 bg-ivory px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-black/35 focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="min-h-12 w-full rounded-xl bg-primary px-5 text-sm font-medium text-ivory transition hover:bg-primary/90"
                >
                  Send via WhatsApp
                </button>

                <p className="text-center text-xs leading-5 text-black/45">
                  This will open WhatsApp with your message already written.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
<section className="border-t border-black/5 bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
  <div className="mx-auto max-w-7xl">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary/70">
          Find us
        </p>

        <h2 className="mt-2 font-serif text-3xl text-primary sm:text-4xl">
          Come visit Shiv Mishthan Bhandar
        </h2>
      </div>

      <a
        href="https://www.google.com/maps"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-primary underline underline-offset-4"
      >
        Open in Google Maps
      </a>
    </div>

    <div className="mt-8 overflow-hidden rounded-3xl border border-black/10 bg-ivory">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57142.931536563!2d80.22268301757641!3d26.473992711345996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c37461640367b%3A0x28501dcc2a623cc5!2z4pyF77iPIFNISVYgTUlTVEhBTiBCSEFOREFS!5e0!3m2!1sen!2sin!4v1791219309746!5m2!1sen!2sin"
        width="600"
        height="450"
        style={{ border: 0 }}
        className="h-[320px] w-full sm:h-[400px] lg:h-[450px]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Shiv Mishthan Bhandar location"
      />
    </div>
  </div>
</section>
    </main>
  );
}