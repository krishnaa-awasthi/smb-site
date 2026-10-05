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

// Script font: only the tagline (footer, hero) and the About signature. Max three uses site-wide.
const pinyon = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pinyon',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Sweets, Bakery & Family Restaurant in ${siteConfig.city}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `Sweets, bakery, namkeen and a family restaurant in ${siteConfig.city}. Order on WhatsApp.`,
  verification: siteConfig.gscVerification ? { google: siteConfig.gscVerification } : undefined,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FEFADB',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${marcellus.variable} ${hind.variable} ${pinyon.variable}`}>
      <body className="bg-cream font-body text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-ctl focus:bg-primary focus:px-4 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>
        <CartoucheDefs />
        <ToastProvider>
  <CartProvider>
    <SmoothScroll>
      <Header />

      {/* Offset equals the fixed header height */}
      <div className="pt-16 md:pt-20">
        {children}
      </div>

      <Footer />
      <FloatingActions />

      {/* Global cart drawer */}
      <CartDrawer />
    </SmoothScroll>
  </CartProvider>
</ToastProvider>
      </body>
    </html>
  );
}