import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header bg-white">
      <div className="header-inner mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        {/* Logo and institute branding */}
        <Link
          href="/"
          className="brand-lockup flex min-w-0 items-center gap-2.5 sm:gap-3"
          aria-label="Ajay CTET Classes home"
        >
          {/* Original logo: preserve the complete blue outer ring */}
          <span className="relative block h-11 w-11 shrink-0 sm:h-12 sm:w-12">
            <Image
              src="/logo.png"
              alt="Ajay CTET Classes logo"
              width={48}
              height={48}
              priority
              sizes="48px"
              className="block h-full w-full object-contain"
            />
          </span>

          {/* Name and tagline remain vertically aligned */}
          <span className="flex min-w-0 flex-col justify-center">
            <span className="brand-name text-[clamp(0.9rem,3.8vw,1.35rem)] font-extrabold leading-tight tracking-tight text-[#192958]">
              Ajay CTET Classes
            </span>

            <span className="brand-tagline mt-0.5 text-[clamp(0.57rem,2.2vw,0.875rem)] font-semibold leading-snug text-blue-700">
              Trusted Guidance For Future Teachers
            </span>
          </span>
        </Link>

        {/* Contact button */}
        <Link
          href="/contact"
          className="contact-button inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-[#FFC400] px-3 py-2.5 text-xs font-bold text-[#192958] shadow-sm transition-colors duration-200 hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 sm:px-5 sm:text-sm"
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
}