import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3, Heart, MapPin, Sparkles } from 'lucide-react';

import { homeContent } from '@/content/home';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Discover the story, values, and tradition behind Shiv Mishthan Bhandar.',
};

const { legacy } = homeContent;

const values = [
  {
    icon: Heart,
    title: 'Made with care',
    description:
      'Every offering is prepared with attention to taste, quality, and the experience we want our customers to remember.',
  },
  {
    icon: Sparkles,
    title: 'Tradition with a touch of today',
    description:
      'We celebrate the flavours people love while continuing to make the experience welcoming for every generation.',
  },
  {
    icon: Clock3,
    title: 'Freshness matters',
    description:
      'From sweets and namkeen to bakery favourites and restaurant dishes, freshness remains at the heart of what we serve.',
  },
];

export default function AboutPage() {
  return (
    <main id="main" className="bg-cream text-ink">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-maroon">
        <div className="relative min-h-[560px] lg:min-h-[680px]">
          {/* Background image */}

          <Image
            src="/images/legacy/sweets-display.jpg"
            alt="Traditional Indian sweets displayed at Shiv Mishthan Bhandar"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Brand overlay */}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-maroon/65"
          />

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-linear-to-r
              from-maroon/90
              via-maroon/65
              to-maroon/20
            "
          />

          {/* Hero content */}

          <div
            className="
              relative
              z-10
              mx-auto
              flex
              min-h-[560px]
              w-full
              max-w-[1320px]
              items-center
              px-5
              py-16

              lg:min-h-[680px]
              lg:px-12
              lg:py-20
            "
          >
            <div className="max-w-2xl">
              <span
                className="
                  mb-4
                  block
                  text-small
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-gold-light
                "
              >
                {legacy.eyebrow}
              </span>

              <h1
                className="
                  max-w-[14ch]
                  font-display
                  text-[clamp(3rem,7vw,6.5rem)]
                  leading-[0.92]
                  text-ivory
                "
              >
                {legacy.title}
              </h1>

              <p
                className="
                  mt-7
                  max-w-[55ch]
                  text-body
                  leading-relaxed
                  text-parchment/90
                "
              >
                {legacy.body}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/sweets"
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    gap-2
                    rounded-ctl
                    bg-gold-light
                    px-6
                    text-button
                    font-semibold
                    text-maroon
                    transition-all
                    duration-[160ms]
                    hover:bg-ivory
                    hover:shadow-lg
                  "
                >
                  Explore our sweets
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.7}
                  />
                </Link>

                <Link
                  href="/contact"
                  className="
                    inline-flex
                    min-h-12
                    items-center
                    justify-center
                    rounded-ctl
                    border
                    border-ivory/30
                    bg-maroon/20
                    px-6
                    text-button
                    font-semibold
                    text-ivory
                    backdrop-blur-sm
                    transition-colors
                    duration-[160ms]
                    hover:bg-ivory/10
                  "
                >
                  Visit us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}

      <section className="bg-cream py-16 lg:py-24">
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-[1320px]
            gap-10
            px-5

            lg:grid-cols-[0.8fr_1.2fr]
            lg:items-start
            lg:gap-20
            lg:px-12
          "
        >
          <div>
            <span
              className="
                text-small
                font-medium
                uppercase
                tracking-widest
                text-primary
              "
            >
              Who we are
            </span>

            <h2
              className="
                mt-3
                max-w-[12ch]
                font-display
                text-h2
                leading-tight
                text-ink
              "
            >
              More than a mithai shop.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p
              className="
                text-body
                leading-relaxed
                text-ink-variant
              "
            >
              {legacy.body}
            </p>

            <p
              className="
                mt-5
                text-body
                leading-relaxed
                text-ink-variant
              "
            >
              At Shiv Mishthan Bhandar, sweets are only one part of the
              experience. Our world brings together traditional mithai,
              savoury namkeen, bakery favourites, and restaurant dishes
              under one roof.
            </p>

            <p
              className="
                mt-5
                text-body
                leading-relaxed
                text-ink-variant
              "
            >
              Whether it is a box of sweets for someone special, a quick
              savoury bite, something from the bakery, or a meal shared
              with family, the idea is simple: good food should create
              good memories.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          HERITAGE IMAGE
      ========================================================= */}

      <section className="bg-surface-low py-10 lg:py-16">
        <div className="mx-auto w-full max-w-[1320px] px-5 lg:px-12">
          <div
            className="
              relative
              min-h-[420px]
              overflow-hidden
              rounded-soft
              bg-maroon
              shadow-xl

              lg:min-h-[620px]
            "
          >
            <Image
              src="/images/legacy/sweets-display.jpg"
              alt="A colourful traditional Indian mithai display"
              fill
              sizes="(min-width: 1024px) 1320px, 100vw"
              className="
                object-cover
                object-center
                transition-transform
                duration-[1200ms]
                hover:scale-[1.02]
              "
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-maroon/75 via-maroon/10 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-10 lg:p-14">
              <p
                className="
                  max-w-xl
                  font-display
                  text-h3
                  leading-tight
                  text-ivory
                  md:text-h2
                "
              >
                A place where colour, craft, flavour, and celebration come
                together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOUR HOUSES
      ========================================================= */}

      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1320px] px-5 lg:px-12">
          <div className="max-w-2xl">
            <span
              className="
                text-small
                font-medium
                uppercase
                tracking-widest
                text-primary
              "
            >
              Our world of food
            </span>

            <h2
              className="
                mt-3
                font-display
                text-h2
                text-ink
              "
            >
              Four ways to enjoy SMB.
            </h2>

            <p
              className="
                mt-4
                max-w-[55ch]
                text-body
                text-ink-variant
              "
            >
              From traditional mithai to everyday favourites, there is
              something for every occasion.
            </p>
          </div>

          <div
            className="
              mt-10
              grid
              gap-5

              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {[
              {
                href: '/sweets',
                title: 'Sweets',
                image: '/images/houses/sweets.jpg',
                alt: 'Traditional Indian sweets',
              },
              {
                href: '/restaurant',
                title: 'Restaurant',
                image: '/images/houses/restaurant.jpg',
                alt: 'Dosa served with chutney',
              },
              {
                href: '/bakery',
                title: 'Bakery',
                image: '/images/houses/bakery.jpg',
                alt: 'Fresh bakery cakes',
              },
              {
                href: '/namkeen',
                title: 'Namkeen',
                image: '/images/houses/namkeen.jpg',
                alt: 'Assorted Indian namkeen',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  group
                  overflow-hidden
                  rounded-soft
                  bg-surface-lowest
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="
                      (min-width: 1024px) 25vw,
                      (min-width: 640px) 50vw,
                      100vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-105
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-linear-to-t
                      from-maroon/75
                      via-transparent
                      to-transparent
                    "
                  />

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3
                      className="
                        font-display
                        text-h3
                        text-ivory
                      "
                    >
                      {item.title}
                    </h3>

                    <span
                      className="
                        mt-1
                        inline-flex
                        items-center
                        gap-1.5
                        text-small
                        text-gold-light
                      "
                    >
                      Explore
                      <ArrowRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}

      <section className="bg-maroon py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1320px] px-5 lg:px-12">
          <div className="max-w-2xl">
            <span
              className="
                text-small
                font-medium
                uppercase
                tracking-widest
                text-gold-light
              "
            >
              What matters to us
            </span>

            <h2
              className="
                mt-3
                font-display
                text-h2
                text-ivory
              "
            >
              The things we believe in.
            </h2>
          </div>

          <div
            className="
              mt-10
              grid
              gap-px
              overflow-hidden
              rounded-soft
              bg-gold/20

              md:grid-cols-3
            "
          >
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="
                    bg-maroon
                    p-7

                    lg:p-9
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-gold-light/10
                      text-gold-light
                    "
                  >
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>

                  <h3
                    className="
                      mt-6
                      font-display
                      text-h3
                      text-ivory
                    "
                  >
                    {value.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-small
                      leading-relaxed
                      text-parchment/80
                    "
                  >
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          VISIT US
      ========================================================= */}

      <section className="bg-cream py-16 lg:py-24">
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-[1320px]
            gap-10
            px-5

            lg:grid-cols-[1.1fr_0.9fr]
            lg:items-center
            lg:px-12
          "
        >
          <div>
            <span
              className="
                text-small
                font-medium
                uppercase
                tracking-widest
                text-primary
              "
            >
              Come say hello
            </span>

            <h2
              className="
                mt-3
                max-w-[12ch]
                font-display
                text-h2
                text-ink
              "
            >
              Good food is better shared.
            </h2>

            <p
              className="
                mt-5
                max-w-[52ch]
                text-body
                leading-relaxed
                text-ink-variant
              "
            >
              Visit Shiv Mishthan Bhandar and discover your favourites
              across sweets, restaurant, bakery, and namkeen.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-ctl
                  bg-primary
                  px-6
                  text-button
                  font-semibold
                  text-ivory
                  transition-colors
                  duration-[160ms]
                  hover:bg-secondary
                "
              >
                Contact us
                <ArrowRight
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/sweets"
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  rounded-ctl
                  border
                  border-primary/20
                  px-6
                  text-button
                  font-semibold
                  text-primary
                  transition-colors
                  duration-[160ms]
                  hover:bg-primary/5
                "
              >
                Browse sweets
              </Link>
            </div>
          </div>

          {/* Location card */}

          <div
            className="
              rounded-soft
              border
              border-primary/10
              bg-surface-lowest
              p-7
              shadow-sm

              lg:p-9
            "
          >
            <div className="flex items-start gap-4">
              <span
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-primary/10
                  text-primary
                "
              >
                <MapPin
                  className="h-5 w-5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>

              <div>
                <h3
                  className="
                    font-display
                    text-h3
                    text-ink
                  "
                >
                  Visit us
                </h3>

                <p
                  className="
                    mt-2
                    text-small
                    leading-relaxed
                    text-ink-variant
                  "
                >
                  {siteConfig.fullAddress ||
                    `${siteConfig.city}, Uttar Pradesh`}
                </p>
              </div>
            </div>

            <div
              className="
                mt-7
                border-t
                border-primary/10
                pt-6
              "
            >
              <p className="text-small text-ink-soft">
                Opening hours
              </p>

              <p
                className="
                  mt-1
                  font-medium
                  text-ink
                "
              >
                {siteConfig.hours}
              </p>
            </div>

            <Link
              href="/contact"
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                text-small
                font-semibold
                text-primary
                transition-colors
                hover:text-secondary
              "
            >
              Get directions & contact details
              <ArrowRight
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}