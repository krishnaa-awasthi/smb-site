import { getBestsellers } from '@/data/products';
import { Bestsellers } from '@/components/home/Bestsellers';
import { FourHouses } from '@/components/home/FourHouses';
import { Hero } from '@/components/home/Hero';
import { HowToOrder } from '@/components/home/HowToOrder';
import { LegacyReveal } from '@/components/home/LegacyReveal';
import { OfferBanner } from '@/components/home/OfferBanner';
import { BusinessJsonLd } from '@/components/seo/BusinessJsonLd';
import { CurveSwipeTransition } from '@/components/home/CurveSwipeTransition';

export default function HomePage() {
  return (
    <div className="w-full">
      <BusinessJsonLd />
      <div className="relative bg-maroon">
      <Hero />
      <FourHouses />
      </div>
      <Bestsellers products={getBestsellers()} />
      <OfferBanner />
      <LegacyReveal />
      <HowToOrder />
    </div>
  );
}