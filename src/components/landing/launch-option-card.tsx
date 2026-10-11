import Link from "next/link";
import { PenLine, BookOpen, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

type LaunchOptionCardProps = {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  icon: string;
  accent: string;
  tint: string;
  button: string;
};

export function LaunchOptionCard({
  title,
  description,
  href,
  buttonLabel,
  icon,
  accent,
  tint,
  button,
}: LaunchOptionCardProps) {
  const isBatchCard = href.startsWith("/batch");
  const isBookCard = href.startsWith("/book");

  const displayDescription = isBatchCard
    ? "बैच की जानकारी देखें और registration के लिए आगे बढ़ें।"
    : isBookCard
      ? "किताब की जानकारी, sample और pre-order के लिए आगे बढ़ें।"
      : description;

  const displayButtonLabel = isBatchCard
    ? "Register Now"
    : isBookCard
      ? "Explore Book"
      : buttonLabel;

  const isBlueButton = button === "#23449B";

  const CardIcon = isBatchCard
    ? PenLine
    : isBookCard
      ? BookOpen
      : null;

  return (
    <article
      className="launch-card"
      style={
        {
          "--card-accent": accent,
          "--card-tint": tint,
          "--card-button": button,
        } as CSSProperties
      }
    >
      {/* Card icon */}
      <div className="launch-card__icon" aria-hidden="true">
        {CardIcon ? (
          <CardIcon className="h-7 w-7" strokeWidth={1.8} />
        ) : (
          icon
        )}
      </div>

      {/* Card title with a controlled line break */}
      <h3>
        {isBatchCard ? (
          <>
            Bihar Librarian 2026
            <span className="block">Batch Registration</span>
          </>
        ) : isBookCard ? (
          <>
            Bihar Librarian 2026
            <span className="block">Book Pre-Order</span>
          </>
        ) : (
          title
        )}
      </h3>

      {/* Description */}
      <p>{displayDescription}</p>

      {/* Action button */}
      <Link
        className={`primary-button ${
          isBlueButton ? "primary-button--blue" : ""
        }`}
        href={href}
      >
        {displayButtonLabel}
        <ArrowRight
          className="ml-2 inline-block h-4 w-4"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}