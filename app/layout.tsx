import type { Metadata, Viewport } from 'next';
import { Hind, Marcellus, Pinyon_Script } from 'next/font/google';

import './globals.css';

import { siteConfig } from '@/config/site';

import { CartoucheDefs } from '@/components/brand/Cartouche';
import { Footer } from '@/components/layout/Footer';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { Header } from '@/components/layout/Header';

import { SmoothScroll } from '@/components/motion/SmoothScroll';

import { ToastProvider } from '@/components/ui/Toast';

import { CartProvider } from '@/components/cart/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';


// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-marcellus',
  display: 'swap',
});

const hind = Hind({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '600'],
  variable: '--font-hind',
  display: 'swap',
});

// Script font:
// Used sparingly for the tagline and About signature.
const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pinyon',
  display: 'swap',
});


// -----------------------------------------------------------------------------
// SEO / Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.name} | Sweets, Bakery & Family Restaurant in ${siteConfig.city}`,
    template: `%s | ${siteConfig.name}`,
  },

  description:
    `Shiv Mishthan Bhandar in ${siteConfig.city} offers traditional Indian sweets, ` +
    `namkeen, bakery items and family restaurant food. Explore our menu and order on WhatsApp.`,

  applicationName: siteConfig.name,

  keywords: [
    'Shiv Mishthan Bhandar',
    'Sweets shop in Kalyanpur Kanpur',
    'Sweets shop in Kalyanpur',
    'Sweets shop in Panki Kanpur',
    'Sweets shop in Awas vikas Kanpur',
    'Sweets shop in Kalyanpur Kanpur',
    'Sweets shop in Kalyanpur Kanpur',
    'Shiv Mishthan Bhandar Kanpur',
    'Sweets shop in Kanpur',
    'Sweets shop near me in Kanpur',
    'sweets in Kanpur',
    'mithai in Kanpur',
    'namkeen in Kanpur',
    'bakery in Kanpur',
    'restaurant in Kanpur',
    'Indian sweets',
    'family restaurant Kanpur',
  ],

  authors: [
    {
      name: siteConfig.name,
    },
  ],

  creator: siteConfig.name,

  publisher: siteConfig.name,

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  verification: siteConfig.gscVerification
    ? {
        google: siteConfig.gscVerification,
      }
    : undefined,

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,

    title: `${siteConfig.name} | Sweets, Bakery & Family Restaurant in ${siteConfig.city}`,

    description:
      `Traditional sweets, namkeen, bakery items and family restaurant food in ` +
      `${siteConfig.city}. Order directly on WhatsApp.`,

    images: [
      {
        url: '/images/hero/mithai-platter.png',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Traditional Indian sweets`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: `${siteConfig.name} | Sweets & Restaurant in ${siteConfig.city}`,

    description:
      `Traditional sweets, namkeen, bakery and restaurant food in ${siteConfig.city}.`,

    images: ['/images/hero/mithai-platter.png'],
  },

  icons: {
    icon: '/favicon.ico',
  },
};


// -----------------------------------------------------------------------------
// Viewport
// -----------------------------------------------------------------------------

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FEFADB',
};


// -----------------------------------------------------------------------------
// Root Layout
// -----------------------------------------------------------------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${marcellus.variable} ${hind.variable} ${pinyon.variable}`}
    >
      <body className="bg-cream font-body text-ink antialiased">

        {/* Skip navigation */}
        <a
          href="#main"
          className="
            sr-only
            focus:not-sr-only
            focus:fixed
            focus:left-4
            focus:top-4
            focus:z-[90]
            focus:rounded-ctl
            focus:bg-primary
            focus:px-4
            focus:py-3
            focus:text-ivory
          "
        >
          Skip to content
        </a>

        {/* Brand SVG definitions */}
        <CartoucheDefs />

        {/* Global providers */}
        <ToastProvider>
          <CartProvider>
            <SmoothScroll>

              {/* Fixed site header */}
              <Header />

              {/* Main page content */}
              <main
                id="main"
                className="pt-16 md:pt-20"
              >
                {children}
              </main>

              {/* Global footer */}
              <Footer />

              {/* Floating WhatsApp / call actions */}
              <FloatingActions />

              {/* Global shopping cart drawer */}
              <CartDrawer />

            </SmoothScroll>
          </CartProvider>
        </ToastProvider>

      </body>
    </html>
  );
}