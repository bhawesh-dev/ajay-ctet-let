import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hind } from "next/font/google";

const hindi = Hind({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">

          {/* Original heading unchanged */}
          <h1>
            Your next chapter <em>starts here.</em>
          </h1>

          {/* Description in Hindi */}
          <p className={hindi.className}>
            बिहार लाइब्रेरियन 2026 बैच के लिए Register करें!    या SLET 2026 किताब
            के बारे में जानकारी पाएं।
          </p>

          <p className={hindi.className}>
            SLET 2026 किताब
            के बारे में जानकारी पाएं।
          </p>

          {/* Batch and book buttons unchanged */}
          <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:mt-7 sm:max-w-4xl sm:grid-cols-2 sm:gap-4">

            <Link
              href="/batch"
              className="group flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-4 py-3 text-center text-sm font-bold leading-5 text-[#192958] shadow-sm transition-colors duration-200 hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] focus-visible:ring-offset-2 sm:min-h-[58px] sm:px-5 sm:text-base"
            >
              <span className={hindi.className}>
                Batch में Register करें
              </span>

              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/book"
              className="group flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-3 text-center text-sm font-bold leading-5 text-[#23449B] shadow-sm transition-colors duration-200 hover:border-[#FFC400] hover:bg-[#FFFDF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] focus-visible:ring-offset-2 sm:min-h-[58px] sm:px-5 sm:text-base"
            >
              <span className={hindi.className}>
                Book की जानकारी पाएं
              </span>

              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}