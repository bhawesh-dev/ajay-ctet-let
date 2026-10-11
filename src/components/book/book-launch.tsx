"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { TouchEvent } from "react";

import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileText,
  GraduationCap,
  IndianRupee,
  ShoppingBag,
} from "lucide-react";

import { Hind } from "next/font/google";

import {
  LaunchSubmissionForm,
  type SubmissionType,
} from "@/components/forms/launch-submission-form";

const hindi = Hind({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* =========================================================
   BOOK INFORMATION
========================================================= */

const BOOK = {
  edition: "प्रथम संस्करण 2026",
  title: "SLET 2026",
  subtitle: "GUIDE",
  author: "Ajay Sir",
  publisher: "Board Easy Publications",
  price: "₹499",
};

/* =========================================================
   EXAM OVERVIEW
========================================================= */

const EXAM_STATS = [
  { value: "150", label: "कुल MCQ प्रश्न" },
  { value: "100", label: "पुस्तकालय विज्ञान" },
  { value: "50", label: "सामान्य ज्ञान (GK)" },
  { value: "NO", label: "Negative Marking" },
];

/* =========================================================
   BOOK FEATURES
========================================================= */

const BOOK_FEATURES = [
  {
    icon: BookOpen,
    title: "सम्पूर्ण थ्योरी",
    subtitle: "Theory + Quick Revision Mind Maps",
    description:
      "सभी प्रमुख concepts को समझने और revision के लिए व्यवस्थित सामग्री।",
  },
  {
    icon: FileText,
    title: "हल प्रश्न-पत्र",
    subtitle: "Previous Year Solved Papers",
    description:
      "विगत वर्षों के प्रश्न-पत्रों को हल सहित समझें और अभ्यास करें।",
  },
  {
    icon: ClipboardCheck,
    title: "100+ अभ्यास प्रश्न",
    subtitle: "Chapter-wise Practice",
    description:
      "हर अध्याय के अंत में अभ्यास प्रश्न, ताकि अपनी तैयारी को जाँच सकें।",
  },
  {
    icon: GraduationCap,
    title: "विशेष कवरेज",
    subtitle: "MLIS & UGC-NET Level",
    description:
      "Library Science के लिए MLIS और UGC-NET स्तर का विशेष कवरेज।",
  },
];

/* =========================================================
   SIX BOOK IMAGES
   Files: public/books/1.png through 6.png
========================================================= */

const BOOK_GALLERY = [
  {
    src: "/books/1.png",
    alt: "SLET 2026 Guide — book page 1",
  },
  {
    src: "/books/2.png",
    alt: "SLET 2026 Guide — book page 2",
  },
  {
    src: "/books/3.png",
    alt: "SLET 2026 Guide — book page 3",
  },
  {
    src: "/books/4.png",
    alt: "SLET 2026 Guide — book page 4",
  },
  {
    src: "/books/5.png",
    alt: "SLET 2026 Guide — book page 5",
  },
  {
    src: "/books/6.png",
    alt: "SLET 2026 Guide — book page 6",
  },
];

/* =========================================================
   BOOK LAUNCH PAGE
========================================================= */

export function BookLaunch() {
  const [activeType, setActiveType] =
    useState<SubmissionType | null>(null);

  const [currentImage, setCurrentImage] = useState(0);

  const touchStartX = useRef<number | null>(null);

  /* Support footer links */

  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#preorder") {
      setActiveType("book_preorder");
    } else if (hash === "#sample") {
      setActiveType("book_sample");
    }
  }, []);

  /* Modal behaviour */

  useEffect(() => {
    if (!activeType) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeForm();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeType]);

  function openForm(type: SubmissionType) {
    setActiveType(type);

    const hash =
      type === "book_sample" ? "#sample" : "#preorder";

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${hash}`
    );
  }

  function closeForm() {
    setActiveType(null);

    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }

  /* Carousel navigation */

  function showNextImage() {
    setCurrentImage(
      (current) => (current + 1) % BOOK_GALLERY.length
    );
  }

  function showPreviousImage() {
    setCurrentImage(
      (current) =>
        (current - 1 + BOOK_GALLERY.length) %
        BOOK_GALLERY.length
    );
  }

  /* Mobile swipe navigation */

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.changedTouches[0].clientX;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;

    const endX = event.changedTouches[0].clientX;
    const difference = endX - touchStartX.current;

    touchStartX.current = null;

    if (Math.abs(difference) < 45) return;

    if (difference < 0) {
      showNextImage();
    } else {
      showPreviousImage();
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F9FE] text-[#192958]">

      {/* =====================================================
          1. HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#EEF4FF] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#FFC400]/10 sm:h-80 sm:w-80"
        />

        <div className="relative mx-auto max-w-7xl">

          <p
            className={`${hindi.className} text-xs font-bold tracking-[0.12em] text-[#23449B] sm:text-sm`}
          >
            {BOOK.edition}
          </p>

          <h1 className="mt-4 font-extrabold leading-[1.02] tracking-tight">

            <span className="block text-[clamp(3rem,10vw,5.25rem)] text-[#192958]">
              {BOOK.title}
            </span>

            <span className="mt-1 block text-[clamp(2.6rem,8vw,4rem)] text-[#23449B]">
              {BOOK.subtitle}
            </span>

          </h1>

          <p
            className={`${hindi.className} mt-5 max-w-3xl text-sm leading-7 text-[#4B5D7A] sm:text-base sm:leading-8`}
          >
            लाइब्रेरियन परीक्षा की तैयारी के लिए एक comprehensive guide।
            <br />
            सरल, बोलचाल की हिंदी में theory और साथ में English शब्दावली।
          </p>

          <p
            className={`${hindi.className} mt-3 max-w-3xl text-sm leading-7 text-[#4B5D7A] sm:text-base`}
          >
            सम्पूर्ण थ्योरी, Quick Revision Mind Maps, हल प्रश्न-पत्र और
            chapter-wise practice questions।
          </p>

        </div>
      </section>

      {/* =====================================================
          2. MINIMAL BOOK CAROUSEL
          One image, two arrows, no captions or cards.
      ===================================================== */}

      <section className="px-4 py-9 sm:px-6 sm:py-11 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <p className="text-[10px] font-bold tracking-[0.16em] text-[#23449B] sm:text-xs">
            BOOK OVERVIEW
          </p>

          <h2
            className={`${hindi.className} mt-2 text-2xl font-bold tracking-tight text-[#192958] sm:text-3xl`}
          >
            किताब के अंदर की झलक
          </h2>

          <div className="mx-auto mt-6 flex w-full items-center justify-center gap-2 sm:mt-8 sm:gap-5">

            {/* Previous image */}

            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="Previous book image"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white text-[#23449B] transition-colors hover:border-[#FFC400] hover:bg-[#FFF9E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Single image only */}

            <div
              className="relative aspect-[3/4] w-full min-w-0 max-w-[360px] flex-1 touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >

              <Image
                key={BOOK_GALLERY[currentImage].src}
                src={BOOK_GALLERY[currentImage].src}
                alt={BOOK_GALLERY[currentImage].alt}
                fill
                priority={currentImage === 0}
                sizes="(max-width: 640px) 70vw, 360px"
                draggable={false}
                className="select-none object-contain"
              />

            </div>

            {/* Next image */}

            <button
              type="button"
              onClick={showNextImage}
              aria-label="Next book image"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white text-[#23449B] transition-colors hover:border-[#FFC400] hover:bg-[#FFF9E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

          </div>
        </div>
      </section>

      {/* =====================================================
          3. QUICK ACTION BUTTONS
          Immediately below the carousel.
      ===================================================== */}

      <section className="px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8">

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">

          <button
            type="button"
            onClick={() => openForm("book_preorder")}
            className={`${hindi.className} group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-5 py-3.5 text-sm font-bold text-[#192958] shadow-sm transition-colors hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] focus-visible:ring-offset-2 sm:text-base`}
          >
            <ShoppingBag className="h-5 w-5" />
            Pre-Order Book
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => openForm("book_sample")}
            className={`${hindi.className} group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3.5 text-sm font-bold text-[#23449B] transition-colors hover:border-[#FFC400] hover:bg-[#FFF9E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] focus-visible:ring-offset-2 sm:text-base`}
          >
            <Download className="h-5 w-5" />
            Download Book Sample
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

        </div>
      </section>

      {/* =====================================================
          4. EXAM OVERVIEW
      ===================================================== */}

      <section className="bg-white px-4 py-9 sm:px-6 sm:py-11 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <h2
            className={`${hindi.className} text-2xl font-bold tracking-tight text-[#192958] sm:text-3xl`}
          >
            परीक्षा एक नज़र में
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-4 sm:gap-4">

            {EXAM_STATS.map((stat, index) => (
              <article
                key={stat.label}
                className={`rounded-2xl border p-4 sm:rounded-3xl sm:p-5 ${
                  index === 3
                    ? "border-[#FFC400] bg-[#FFF9E5]"
                    : "border-blue-100 bg-[#F7F9FE]"
                }`}
              >

                <p className="text-3xl font-extrabold tracking-tight text-[#23449B] sm:text-4xl">
                  {stat.value}
                </p>

                <p
                  className={`${hindi.className} mt-2 text-xs font-semibold leading-5 text-[#4B5D7A] sm:text-sm`}
                >
                  {stat.label}
                </p>

              </article>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          5. BOOK FEATURES
      ===================================================== */}

      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <h2
              className={`${hindi.className} text-2xl font-bold tracking-tight text-[#192958] sm:text-3xl`}
            >
              इस किताब में क्या मिलेगा?
            </h2>

            <p
              className={`${hindi.className} mt-3 text-sm leading-7 text-[#64748B] sm:text-base`}
            >
              Theory से लेकर revision और practice तक, तैयारी के लिए व्यवस्थित study material।
            </p>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {BOOK_FEATURES.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-blue-100 bg-white p-5 transition-colors duration-200 hover:border-[#FFC400] sm:rounded-3xl sm:p-6"
                >

                  <div className="flex items-center justify-between">

                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#23449B] text-white">
                      <Icon className="h-6 w-6" />
                    </span>

                    <span className="text-2xl font-extrabold text-blue-100">
                      0{index + 1}
                    </span>

                  </div>

                  <h3
                    className={`${hindi.className} mt-5 text-lg font-bold leading-snug text-[#192958]`}
                  >
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs font-semibold leading-6 text-[#23449B] sm:text-sm">
                    {feature.subtitle}
                  </p>

                  <p
                    className={`${hindi.className} mt-3 text-sm leading-7 text-[#64748B]`}
                  >
                    {feature.description}
                  </p>

                </article>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          6. AUTHOR / PUBLISHER / PRICE
      ===================================================== */}

      <section className="px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">

            {/* Author */}

            <article className="rounded-2xl border border-blue-100 bg-white p-5 sm:rounded-3xl sm:p-6">

              <p
                className={`${hindi.className} text-xs font-medium text-[#64748B] sm:text-sm`}
              >
                लेखक / Author
              </p>

              <h3 className="mt-2 text-xl font-extrabold text-[#192958] sm:text-2xl">
                {BOOK.author}
              </h3>

            </article>

            {/* Publisher */}

            <article className="rounded-2xl border border-blue-100 bg-white p-5 sm:rounded-3xl sm:p-6">

              <p
                className={`${hindi.className} text-xs font-medium text-[#64748B] sm:text-sm`}
              >
                प्रकाशक / Publisher
              </p>

              <h3 className="mt-2 text-lg font-extrabold leading-snug text-[#192958] sm:text-xl">
                {BOOK.publisher}
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#64748B]">
                A Unit of Ajay Group of Institutions
              </p>

            </article>

            {/* Price */}

            <article className="rounded-2xl border border-[#FFC400] bg-[#FFF9E5] p-5 sm:rounded-3xl sm:p-6">

              <div className="flex items-center gap-2 text-[#64748B]">
                <IndianRupee className="h-4 w-4" />

                <p
                  className={`${hindi.className} text-xs font-medium sm:text-sm`}
                >
                  पुस्तक का मूल्य
                </p>
              </div>

              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-[#192958] sm:text-4xl">
                {BOOK.price}
              </h3>

              <p
                className={`${hindi.className} mt-2 text-sm leading-6 text-[#64748B]`}
              >
                प्रथम संस्करण · 2026
              </p>

            </article>

          </div>
        </div>
      </section>

      {/* =====================================================
          7. TWO SEPARATE ACTION CARDS — RESTORED
          These cards remain near the bottom of the page.
      ===================================================== */}

      <section
        id="book-options"
        className="bg-[#EEF4FF] px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <h2
              className={`${hindi.className} text-2xl font-bold tracking-tight text-[#192958] sm:text-3xl`}
            >
              किताब के लिए अपना अगला कदम चुनें
            </h2>

            <p
              className={`${hindi.className} mt-3 text-sm leading-7 text-[#64748B] sm:text-base`}
            >
              किताब pre-order करें या पहले sample देखने के लिए request भेजें।
            </p>

          </div>

          {/* Two independent cards */}

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

            {/* BOOK PRE-ORDER CARD */}

            <article className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-7">

              <div className="absolute left-0 top-0 h-1.5 w-full bg-[#FFC400]" />

              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF4C7] text-[#192958]">
                <ShoppingBag className="h-6 w-6" />
              </span>

              <h3
                className={`${hindi.className} mt-5 text-xl font-bold leading-snug text-[#192958] sm:text-2xl`}
              >
                Book Pre-Order
              </h3>

              <p
                className={`${hindi.className} mt-3 text-sm leading-7 text-[#64748B]`}
              >
                SLET 2026 की किताब के लिए अपनी pre-order request दर्ज करें।
                इस form में कोई online payment नहीं ली जाएगी।
              </p>

              <button
                type="button"
                onClick={() => openForm("book_preorder")}
                className={`${hindi.className} group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-5 py-3 text-sm font-bold text-[#192958] transition-colors hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] focus-visible:ring-offset-2`}
              >
                Pre-Order Book

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

            </article>

            {/* BOOK SAMPLE CARD */}

            <article className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-7">

              <div className="absolute left-0 top-0 h-1.5 w-full bg-[#23449B]" />

              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#23449B]">
                <Download className="h-6 w-6" />
              </span>

              <h3
                className={`${hindi.className} mt-5 text-xl font-bold leading-snug text-[#192958] sm:text-2xl`}
              >
                Download Book Sample
              </h3>

              <p
                className={`${hindi.className} mt-3 text-sm leading-7 text-[#64748B]`}
              >
                किताब के sample PDF के लिए request करें। Form submit करने
                के बाद sample viewer और download options success page पर मिलेंगे।
              </p>

              <button
                type="button"
                onClick={() => openForm("book_sample")}
                className={`${hindi.className} group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-[#EEF4FF] px-5 py-3 text-sm font-bold text-[#23449B] transition-colors hover:border-[#FFC400] hover:bg-[#FFF9E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] focus-visible:ring-offset-2`}
              >
                Request Book Sample

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

            </article>

          </div>
        </div>
      </section>

      {/* =====================================================
          8. SHARED REGISTRATION MODAL
      ===================================================== */}

      {activeType && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#10182F]/65 p-3 backdrop-blur-md sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeForm();
            }
          }}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-label={
              activeType === "book_sample"
                ? "Book sample request form"
                : "Book pre-order form"
            }
            className="my-auto max-h-[94dvh] w-full max-w-3xl overflow-y-auto rounded-3xl shadow-2xl"
          >

            <LaunchSubmissionForm
              type={activeType}
              onClose={closeForm}
            />

          </div>
        </div>
      )}

    </main>
  );
}