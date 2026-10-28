
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white">
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        {/* Error code */}
        <h1
          className="
            select-none font-serif
            text-[clamp(8rem,22vw,17rem)]
            font-normal leading-[0.9]
            tracking-tight text-white
            [text-shadow:0_0_18px_rgba(255,255,255,0.2),0_0_50px_rgba(255,255,255,0.08)]
          "
        >
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-8 font-serif text-3xl font-normal tracking-tight sm:text-5xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
          The website you are looking for is not available.
        </p>

        {/* Home button */}
        <Link
          href="/"
          className="
            group mt-10 inline-flex min-h-[56px]
            items-center justify-center gap-4
            rounded-full border border-white/80
            px-8 py-3 text-sm font-medium text-white
            transition-all duration-300
            hover:border-white hover:bg-white hover:text-black
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-white
            focus-visible:ring-offset-4
            focus-visible:ring-offset-black
          "
        >
          <ArrowLeft
            size={21}
            strokeWidth={1.6}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span>Go Back Home</span>
        </Link>
      </div>
    </main>
  );
}
