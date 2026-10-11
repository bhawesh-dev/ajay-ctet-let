"use client";

import { useEffect, useState } from "react";

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  MapPin,
  NotebookPen,
} from "lucide-react";

import { Hind } from "next/font/google";

import { LaunchSubmissionForm } from "@/components/forms/launch-submission-form";

const hindi = Hind({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* =========================================================
   BATCH INFORMATION
========================================================= */

const BATCH = {
  name: "Bihar Librarian SLET 2026",
  examName: "Bihar School Librarian Eligibility Test 2026",
  fee: "₹4,999",
  startDate: "15 October 2026",
  mode: "Offline Classes",
  location: "Saharsa",
  address: "Gokul Chowk, Gangjala, Saharsa, Bihar – 852201",
};

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(BATCH.address);

/* Temporary 16:9 banner; replace with the official banner later. */

const BANNER_URL =
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1800&q=85";

/* =========================================================
   WHAT THE BATCH INCLUDES
========================================================= */

const FEATURES = [
  {
    icon: CalendarDays,
    title: "Regular Offline Classes",
    description:
      "नियमित कक्षाओं के साथ अपनी preparation को बेहतर तरीके से आगे बढ़ाएँ।",
  },
  {
    icon: BookOpen,
    title: "Concept-Based Theory",
    description:
      "Library Science के concepts को समझें और theory की मजबूत foundation बनाएँ।",
  },
  {
    icon: NotebookPen,
    title: "Mind Maps & Notes",
    description:
      "Mind maps और structured notes से revision को आसान बनाएँ।",
  },
  {
    icon: CheckCircle2,
    title: "Practice & Revision",
    description:
      "Topic-wise questions की practice करें और नियमित revision करते रहें।",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function BatchPage() {
  const [showForm, setShowForm] = useState(false);

  /*
   * Open the form as a modal.
   * Prevent background scrolling and support the Escape key.
   */

  useEffect(() => {
    if (!showForm) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowForm(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showForm]);

  function handleRegisterClick() {
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F9FE] text-[#192958]">

      {/* =====================================================
          1. HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#EEF4FF] px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

        {/* Subtle background decoration */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#FFC400]/10 sm:h-80 sm:w-80"
        />

        <div className="relative mx-auto max-w-7xl">

          <div className="max-w-4xl">

            {/* Batch name */}

            <h1
              className={`${hindi.className} text-3xl font-bold leading-[1.18] tracking-tight text-[#192958] sm:text-5xl lg:text-6xl`}
            >
              Bihar Librarian

              <span className="mt-1 block text-[#23449B]">
                SLET 2026
              </span>
            </h1>

            {/* Description */}

            <p
              className={`${hindi.className} mt-4 max-w-3xl text-sm leading-7 text-[#4B5D7A] sm:mt-5 sm:text-base sm:leading-8 lg:text-lg`}
            >
              Bihar School Librarian Eligibility Test 2026 की तैयारी
              के लिए एक focused offline batch.
              <br />
              Regular classes,
              mind-map based theory और practice के साथ अपनी तैयारी
              को सुदृढ़ करें।
            </p>

          </div>

          {/* Fee, date and location: one horizontal row */}

          <div className="mt-6 grid grid-cols-3 gap-2.5 sm:mt-7 sm:max-w-3xl sm:gap-4">

            {/* Fee */}

            <div className="min-w-0 rounded-xl border border-blue-100 bg-white px-2.5 py-3 shadow-sm sm:rounded-2xl sm:px-4 sm:py-4">

              <div className="flex items-center gap-1.5 text-[#64748B]">
                <IndianRupee className="h-3.5 w-3.5 shrink-0 text-[#23449B] sm:h-4 sm:w-4" />

                <span className={`${hindi.className} text-[10px] font-medium sm:text-sm`}>
                  Course Fee
                </span>
              </div>

              <p className="mt-2 whitespace-nowrap text-base font-extrabold tracking-tight text-[#192958] sm:text-2xl">
                ₹4,999
              </p>

            </div>

            {/* Start date */}

            <div className="min-w-0 rounded-xl border border-blue-100 bg-white px-2.5 py-3 shadow-sm sm:rounded-2xl sm:px-4 sm:py-4">

              <div className="flex items-center gap-1.5 text-[#64748B]">
                <CalendarDays className="h-3.5 w-3.5 shrink-0 text-[#23449B] sm:h-4 sm:w-4" />

                <span className={`${hindi.className} text-[10px] font-medium sm:text-sm`}>
                  Starts
                </span>
              </div>

              <p className="mt-2 text-sm font-extrabold leading-snug text-[#192958] sm:text-lg">
                15 October
              </p>

              <p className="mt-0.5 text-[11px] font-semibold text-[#23449B] sm:text-sm">
                2026
              </p>

            </div>

            {/* Location */}

            <div className="min-w-0 rounded-xl border border-blue-100 bg-white px-2.5 py-3 shadow-sm sm:rounded-2xl sm:px-4 sm:py-4">

              <div className="flex items-center gap-1.5 text-[#64748B]">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#23449B] sm:h-4 sm:w-4" />

                <span className={`${hindi.className} text-[10px] font-medium sm:text-sm`}>
                  Location
                </span>
              </div>

              <p className="mt-2 text-sm font-extrabold text-[#192958] sm:text-lg">
                Saharsa
              </p>

              <p className="mt-0.5 text-[11px] text-[#64748B] sm:text-sm">
                Bihar
              </p>

            </div>

          </div>

          {/* Register button */}

          <button
            type="button"
            onClick={handleRegisterClick}
            className={`${hindi.className} group mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-[#FFC400] px-5 py-3.5 text-base font-bold text-[#192958] shadow-sm transition-colors duration-200 hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] focus-visible:ring-offset-2 sm:mt-6 sm:min-h-16 sm:max-w-3xl sm:text-lg`}
          >
            Register Now

            <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

        </div>
      </section>

      {/* =====================================================
          2. CLEAN 16:9 BANNER
      ===================================================== */}

      <section className="px-4 pt-5 sm:px-6 sm:pt-7 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div
            role="img"
            aria-label="Library shelves representing the Bihar Librarian SLET 2026 batch"
            className="aspect-video w-full rounded-2xl border border-blue-100 bg-[#192958] bg-cover bg-center shadow-sm sm:rounded-[28px]"
            style={{
              backgroundImage: `url("${BANNER_URL}")`,
            }}
          />

        </div>
      </section>

      {/* =====================================================
          3. WHAT THE BATCH INCLUDES
      ===================================================== */}

      <section className="bg-white px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-14">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <h2
              className={`${hindi.className} text-2xl font-bold tracking-tight text-[#192958] sm:text-3xl`}
            >
              इस बैच में क्या मिलेगा?
            </h2>

            <p
              className={`${hindi.className} mt-3 text-sm leading-7 text-[#64748B] sm:text-base`}
            >
              Concepts को समझने, theory को मजबूत करने और practice
              के जरिए तैयारी को बेहतर बनाने पर फोकस।
            </p>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">

            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-blue-100 bg-[#F7F9FE] p-5 transition-colors duration-200 hover:border-[#FFC400] sm:rounded-3xl sm:p-6"
                >

                  <div className="flex items-center justify-between">

                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#23449B] text-white sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </span>

                    <span className="text-2xl font-extrabold text-blue-100">
                      0{index + 1}
                    </span>

                  </div>

                  <h3
                    className={`${hindi.className} mt-4 text-lg font-bold leading-snug text-[#192958]`}
                  >
                    {feature.title}
                  </h3>

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
          4. BATCH DETAILS
      ===================================================== */}

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">

            {/* Fee */}

            <article className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4C7] text-[#192958] sm:h-11 sm:w-11">
                <IndianRupee className="h-5 w-5" />
              </span>

              <p className={`${hindi.className} mt-4 text-xs leading-5 text-[#64748B] sm:text-sm`}>
                कुल कोर्स फीस
              </p>

              <p className="mt-1 text-xl font-extrabold tracking-tight text-[#192958] sm:text-2xl">
                {BATCH.fee}
              </p>

            </article>

            {/* Start date */}

            <article className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#23449B] sm:h-11 sm:w-11">
                <CalendarDays className="h-5 w-5" />
              </span>

              <p className={`${hindi.className} mt-4 text-xs leading-5 text-[#64748B] sm:text-sm`}>
                Classes शुरू होंगी
              </p>

              <p className="mt-1 text-base font-extrabold leading-snug text-[#192958] sm:text-xl">
                15 October
              </p>

              <p className="mt-1 text-sm font-semibold text-[#23449B]">
                2026
              </p>

            </article>

            {/* Mode */}

            <article className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#23449B] sm:h-11 sm:w-11">
                <BookOpen className="h-5 w-5" />
              </span>

              <p className={`${hindi.className} mt-4 text-xs leading-5 text-[#64748B] sm:text-sm`}>
                पढ़ाई का माध्यम
              </p>

              <p className="mt-1 text-base font-extrabold leading-snug text-[#192958] sm:text-xl">
                Offline
              </p>

              <p className={`${hindi.className} mt-1 text-xs leading-5 text-[#64748B] sm:text-sm`}>
                Classroom Classes
              </p>

            </article>

            {/* Venue */}

            <article className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#23449B] sm:h-11 sm:w-11">
                <MapPin className="h-5 w-5" />
              </span>

              <p className={`${hindi.className} mt-4 text-xs leading-5 text-[#64748B] sm:text-sm`}>
                क्लास का स्थान
              </p>

              <p className="mt-1 text-base font-extrabold leading-snug text-[#192958] sm:text-xl">
                Saharsa, Bihar
              </p>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${hindi.className} mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#23449B] hover:underline sm:text-sm`}
              >
                पूरा पता देखें
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

            </article>

          </div>
        </div>
      </section>

      {/* =====================================================
          5. FINAL REGISTRATION CTA
      ===================================================== */}

      <section className="px-4 pb-12 pt-3 sm:px-6 sm:pb-16 sm:pt-5 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden rounded-3xl bg-[#192958] p-6 text-white sm:rounded-[28px] sm:p-9 lg:p-12">

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/5"
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">

              <div className="max-w-2xl">

                {/* The wrapper guarantees spacing below the date capsule */}

                <div className="mb-6 sm:mb-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-blue-100 sm:text-xs">
                    <Clock3 className="h-3.5 w-3.5" />
                    CLASSES START 15 OCTOBER 2026
                  </span>
                </div>

                <h2
                  className={`${hindi.className} text-2xl font-bold leading-[1.3] sm:text-3xl lg:text-4xl`}
                >
                  अपनी तैयारी शुरू करने के लिए तैयार हैं?
                </h2>

                <p
                  className={`${hindi.className} mt-4 text-sm leading-7 text-blue-100 sm:mt-5 sm:text-base`}
                >
                  Batch की जानकारी देख लें और registration request
                  submit करें। Form भरने के बाद आपकी registration
                  details रिकॉर्ड की जाएँगी।
                </p>

              </div>

              <div className="shrink-0 sm:min-w-[190px]">

                <p className="text-sm text-blue-200">
                  Course Fee
                </p>

                <p className="mt-1 text-4xl font-extrabold tracking-tight text-[#FFC400]">
                  ₹4,999
                </p>

                <button
                  type="button"
                  onClick={handleRegisterClick}
                  className={`${hindi.className} group mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-5 py-3 text-sm font-bold text-[#192958] shadow-sm transition-colors hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#192958]`}
                >
                  Register Now

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          6. REGISTRATION MODAL
          Opens from either Register Now button
      ===================================================== */}

      {showForm && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#10182F]/60 p-3 backdrop-blur-md sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeForm();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Batch Registration Form"
            className="my-auto w-full max-w-3xl"
          >
            <LaunchSubmissionForm
              type="batch_registration"
              onClose={closeForm}
            />
          </div>
        </div>
      )}

    </main>
  );
}