import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Batch Registration", href: "/batch" },
  { label: "Book Pre-Order", href: "/book#preorder" },
  { label: "Book Sample Download", href: "/book#sample" },
  { label: "Contact Us", href: "/contact" },
] as const;

const CONTACT = {
  email: "support@ajayctetclasses.in",
  phoneDisplay: "7739881130",
  phoneHref: "+917739881130",
  whatsappNumber: "15553341082",
};

const SOCIAL_LINKS = {
  youtube: "https://youtube.com/@ajayctetclasses",
  instagram: "https://instagram.com/ajayctetclasses",
  facebook: "https://www.facebook.com/ajayctetclasses/",
  whatsapp: `https://wa.me/${CONTACT.whatsappNumber}`,
};

type SocialNetwork = "youtube" | "instagram" | "facebook" | "whatsapp";

function SocialIcon({ network }: { network: SocialNetwork }) {
  const iconClass = "h-5 w-5";

  switch (network) {
    case "youtube":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClass}
        >
          <path d="M22 12c0 2.2-.2 4.4-.5 5.4a2.8 2.8 0 0 1-2 2C17.8 19.8 12 19.8 12 19.8s-5.8 0-7.5-.4a2.8 2.8 0 0 1-2-2C2.2 16.4 2 14.2 2 12s.2-4.4.5-5.4a2.8 2.8 0 0 1 2-2C6.2 4.2 12 4.2 12 4.2s5.8 0 7.5.4a2.8 2.8 0 0 1 2 2C21.8 7.6 22 9.8 22 12Z" />
          <path d="m10 8.5 5 3.5-5 3.5Z" />
        </svg>
      );

    case "instagram":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={iconClass}
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
        </svg>
      );

    case "facebook":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={iconClass}
        >
          <path d="M13.4 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3H10v8h3.4Z" />
        </svg>
      );

    case "whatsapp":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={iconClass}
        >
          <path
            fillRule="evenodd"
            d="M20.52 3.48A11.82 11.82 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.09.55 4.14 1.59 5.95L.06 24l6.33-1.66a11.93 11.93 0 0 0 5.66 1.44h.01c6.55 0 11.88-5.33 11.88-11.88a11.8 11.8 0 0 0-3.42-8.42ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98.99-3.65-.23-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.13 1.03 7 2.91a9.84 9.84 0 0 1 2.9 7.01c0 5.45-4.44 9.86-9.9 9.86Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.18.2-.35.22-.65.08-.3-.15-1.25-.47-2.39-1.48-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.06 2.88 1.21 3.08.15.2 2.09 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.58-.35Z"
          />
        </svg>
      );
  }
}

function ContactIcon({ type }: { type: "mail" | "phone" }) {
  if (type === "mail") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5 shrink-0"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />
    </svg>
  );
}

const socialButtonClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-[#FFC400] hover:text-[#192958] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#192958]";

export function SiteFooter() {
  return (
    <footer className="site-footer mt-16 bg-[#192958] text-white">
      <div className="footer-inner mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="footer-grid grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-16">

          {/* BRAND */}
          <section className="footer-brand">
            <Link
              href="/"
              className="brand-lockup flex items-center gap-3"
              aria-label="Ajay CTET Classes home"
            >
              {/* Logo moved 8px upward for better optical alignment */}
              <span className="relative -translate-y-2 block h-12 w-12 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Ajay CTET Classes logo"
                  width={48}
                  height={48}
                  sizes="48px"
                  className="block h-full w-full object-contain"
                />
              </span>

              {/* Brand text */}
              <span className="flex min-w-0 flex-col justify-center">
                <span className="brand-name text-lg font-bold leading-tight text-white sm:text-xl">
                  Ajay CTET Classes
                </span>

                <span className="footer-tagline mt-1 text-sm leading-relaxed text-blue-200">
                  Shaping Future Educators Of India
                </span>
              </span>
            </Link>

            <p className="footer-copy mt-5 max-w-md text-sm leading-7 text-blue-100">
              Empowering future teachers with high-quality guidance,
              structured preparation, scholarship opportunities, and
              result-oriented mentorship.
            </p>
          </section>

          {/* QUICK LINKS */}
          <nav aria-label="Footer navigation">
            <h2 className="footer-heading text-lg font-bold text-white">
              Quick Links
            </h2>

            <div className="footer-links mt-5 flex flex-col items-start gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-blue-100 transition-colors duration-200 hover:text-[#FFC400] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC400]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* CONTACT AND SOCIAL MEDIA */}
          <section>
            <h2 className="footer-heading text-lg font-bold text-white">
              Contact Us
            </h2>

            <div className="contact-list mt-5 flex flex-col gap-4">
              <a
                href={`mailto:${CONTACT.email}`}
                className="contact-link inline-flex items-center gap-3 break-all text-sm text-blue-100 transition-colors hover:text-[#FFC400]"
              >
                <ContactIcon type="mail" />
                <span>{CONTACT.email}</span>
              </a>

              <a
                href={`tel:${CONTACT.phoneHref}`}
                className="contact-link inline-flex items-center gap-3 text-sm text-blue-100 transition-colors hover:text-[#FFC400]"
              >
                <ContactIcon type="phone" />
                <span>{CONTACT.phoneDisplay}</span>
              </a>
            </div>

            {/* SOCIAL LINKS */}
            <div
              className="footer-socials mt-6 flex flex-wrap items-center gap-3"
              aria-label="Social media links"
            >
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
                className={socialButtonClass}
              >
                <SocialIcon network="youtube" />
              </a>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className={socialButtonClass}
              >
                <SocialIcon network="instagram" />
              </a>

              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className={socialButtonClass}
              >
                <SocialIcon network="facebook" />
              </a>

              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Ajay CTET Classes on WhatsApp"
                title="WhatsApp"
                className={socialButtonClass}
              >
                <SocialIcon network="whatsapp" />
              </a>
            </div>
          </section>
        </div>

        {/* COPYRIGHT */}
        <div className="footer-bottom mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs leading-relaxed text-blue-200 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <p>
            © 2026 Ajay CTET Classes. All rights reserved.
          </p>

          <p>Built for future teachers across India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}