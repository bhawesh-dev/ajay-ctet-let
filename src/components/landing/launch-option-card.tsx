import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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

  const thumbnailSrc = isBatchCard
    ? "/thumbnails/bihar-librarian-batch.png"
    : isBookCard
      ? "/thumbnails/bihar-librarian-book.png"
      : null;

  const displayDescription = isBatchCard
    ? "बैच की जानकारी देखें और registration के लिए आगे बढ़ें।"
    : isBookCard
      ? "किताब की जानकारी, sample और pre-order के लिए आगे बढ़ें।"
      : description;

  const displayButtonLabel = isBatchCard
    ? "एडमिशन लें"
    : isBookCard
      ? "बुक खरीदें"
      : buttonLabel;

  const isBlueButton = button === "#23449B";

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
      {/* Thumbnail for batch and book cards */}
      {thumbnailSrc ? (
        <div className="mb-5 aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={thumbnailSrc}
            alt={
              isBatchCard
                ? "Bihar Librarian 2026 Batch Registration"
                : "Bihar Librarian 2026 Book Pre-Order"
            }
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="launch-card__icon" aria-hidden="true">
          {icon}
        </div>
      )}

      {/* Card title */}
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