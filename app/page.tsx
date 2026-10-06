import { getBestsellers } from '@/data/products';
import { Bestsellers } from '@/components/home/Bestsellers';
import { FourHouses } from '@/components/home/FourHouses';
import { Hero } from '@/components/home/Hero';
import { HowToOrder } from '@/components/home/HowToOrder';
import { LegacyReveal } from '@/components/home/LegacyReveal';
import { OfferBanner } from '@/components/home/OfferBanner';
import { BusinessJsonLd } from '@/components/seo/BusinessJsonLd';

export default function HomePage() {
  return (
    <main id="main" className="w-full">
      <BusinessJsonLd />
      <Hero />
      <FourHouses />
      <Bestsellers products={getBestsellers()} />
      <OfferBanner />
      <LegacyReveal />
      <HowToOrder />
    </main>
  );
}