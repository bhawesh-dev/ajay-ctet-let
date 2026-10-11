"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Share2,
} from "lucide-react";

import { Hind } from "next/font/google";

/*
 * Load the PDF viewer only in the browser.
 */

const PdfViewer = dynamic(
  () => import("@/components/success/pdf-viewer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[420px] items-center justify-center text-sm text-[#64748B]">
        Loading PDF viewer...
      </div>
    ),
  }
);

const hindi = Hind({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* =========================================================
   TYPES
========================================================= */

export type SuccessType =
  | "batch_registration"
  | "book_preorder"
  | "book_sample";

export type SubmissionRecord = {
  fullName: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  whatsapp: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pin: string;
  createdAt: string;
};

type Props = {
  type: SuccessType;
  serialNumber: string | null;
  record: SubmissionRecord;
};

/* =========================================================
   CONSTANTS
========================================================= */

const SAMPLE_PDF_URL = "/documents/book-sample.pdf";

const titles: Record<SuccessType, string> = {
  batch_registration: "Batch Registration Successful",
  book_preorder: "Book Pre-Order Successful",
  book_sample: "Your Book Sample Is Ready",
};

/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
}

/* =========================================================
   PDF RECEIPT GENERATOR
========================================================= */

function createReceipt(
  type: Exclude<SuccessType, "book_sample">,
  serialNumber: string,
  record: SubmissionRecord
) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const width = 210;
  const pageHeight = 297;

  const navy: [number, number, number] = [25, 41, 88];
  const blue: [number, number, number] = [35, 68, 155];
  const paleBlue: [number, number, number] = [238, 244, 255];
  const grey: [number, number, number] = [90, 105, 130];

  /* Header */

  pdf.setFillColor(...navy);
  pdf.rect(0, 0, width, 43, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text("AJAY CTET CLASSES", 20, 19);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text("Registration Acknowledgement", 20, 28);

  pdf.setTextColor(255, 196, 0);
  pdf.setFontSize(9);

  pdf.text(
    type === "batch_registration"
      ? "BATCH REGISTRATION"
      : "BOOK PRE-ORDER",
    20,
    36
  );

  /* Reference number */

  pdf.setFillColor(...paleBlue);
  pdf.roundedRect(15, 51, 180, 26, 3, 3, "F");

  pdf.setTextColor(...grey);
  pdf.setFontSize(9);
  pdf.text("YOUR REFERENCE NUMBER", 21, 60);

  pdf.setTextColor(...blue);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text(serialNumber, 21, 70);

  let y = 91;

  /* Applicant details */

  pdf.setTextColor(...navy);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Applicant Details", 20, y);

  y += 7;

  pdf.setDrawColor(220, 229, 245);
  pdf.line(20, y, 190, y);

  y += 8;

  const rows: [string, string][] = [
    ["Full name", record.fullName],
    ["Father's name", record.fatherName],
    ["Mother's name", record.motherName],
    ["Mobile number", record.mobile],
    ["WhatsApp number", record.whatsapp],
    [
      "Address",
      `${record.address}, ${record.city}, ${record.district}, ${record.state} - ${record.pin}`,
    ],
    ["Request date", formatDate(record.createdAt)],
  ];

  for (const [label, value] of rows) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(...grey);
    pdf.text(label, 20, y);

    y += 5;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(...navy);

    const lines = pdf.splitTextToSize(value || "-", 165);

    pdf.text(lines, 20, y);

    y += lines.length * 5 + 5;

    if (y > pageHeight - 45) {
      pdf.addPage();
      y = 25;
    }
  }

  /* Acknowledgement notice */

  if (y + 30 > pageHeight - 20) {
    pdf.addPage();
    y = 25;
  }

  pdf.setFillColor(255, 249, 220);
  pdf.roundedRect(15, y, 180, 27, 3, 3, "F");

  pdf.setTextColor(...navy);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text("IMPORTANT", 21, y + 8);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);

  const notice = pdf.splitTextToSize(
    "This document acknowledges your registration or pre-order request. No payment has been collected. This is not a payment receipt. Please save it for future reference.",
    166
  );

  pdf.text(notice, 21, y + 15);

  /* Footer */

  pdf.setTextColor(...grey);
  pdf.setFontSize(8);

  pdf.text(
    "Ajay CTET Classes | Saharsa, Bihar",
    20,
    pageHeight - 12
  );

  return pdf;
}

/* =========================================================
   SUCCESS PAGE
========================================================= */

export default function SuccessContent({
  type,
  serialNumber,
  record,
}: Props) {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [message, setMessage] = useState("");
  const [sharing, setSharing] = useState(false);

  const isSample = type === "book_sample";

  const serialLabel =
    type === "batch_registration"
      ? "Batch Registration Number"
      : "Book Pre-Order Number";

  /* =======================================================
     GENERATE RECEIPT PDF
  ======================================================= */

  useEffect(() => {
    if (isSample || !serialNumber) {
      setPdfBlob(null);
      return;
    }

    try {
      const pdf = createReceipt(
        type as Exclude<SuccessType, "book_sample">,
        serialNumber,
        record
      );

      const blob = pdf.output("blob");

      setPdfBlob(blob);
    } catch (error) {
      console.error("Receipt PDF generation failed:", error);
      setPdfBlob(null);
    }
  }, [
    type,
    serialNumber,
    isSample,
    record.fullName,
    record.fatherName,
    record.motherName,
    record.mobile,
    record.whatsapp,
    record.address,
    record.city,
    record.district,
    record.state,
    record.pin,
    record.createdAt,
  ]);

  /* =======================================================
     DOWNLOAD PDF
  ======================================================= */

  function downloadDocument() {
    setMessage("");

    if (isSample) {
      const link = document.createElement("a");

      link.href = SAMPLE_PDF_URL;
      link.download = "Ajay-CTET-Book-Sample.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      return;
    }

    if (!pdfBlob || !serialNumber) {
      setMessage("Your PDF is being prepared. Please try again.");
      return;
    }

    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${serialNumber}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  /* =======================================================
     SHARE PDF
  ======================================================= */

  async function shareDocument() {
    setSharing(true);
    setMessage("");

    try {
      let blob: Blob;
      let fileName: string;

      if (isSample) {
        const response = await fetch(SAMPLE_PDF_URL);

        if (!response.ok) {
          setMessage(
            "The sample PDF is unavailable. Please try again later."
          );
          return;
        }

        blob = await response.blob();
        fileName = "Ajay-CTET-Book-Sample.pdf";
      } else {
        if (!pdfBlob || !serialNumber) {
          setMessage("Your receipt PDF is still being prepared.");
          return;
        }

        blob = pdfBlob;
        fileName = `${serialNumber}.pdf`;
      }

      const file = new File([blob], fileName, {
        type: "application/pdf",
      });

      /*
       * Use the native sharing interface when supported.
       */

      if (
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: titles[type],
          text: isSample
            ? "Ajay CTET Classes — Book Sample"
            : `Ajay CTET Classes — ${serialNumber}`,
        });

        return;
      }

      /*
       * Fallback for browsers without file sharing.
       */

      if (!isSample) {
        downloadDocument();

        const text = encodeURIComponent(
          `Ajay CTET Classes acknowledgement. Reference number: ${serialNumber}. Please attach the downloaded PDF to this message.`
        );

        window.open(
          `https://wa.me/?text=${text}`,
          "_blank",
          "noopener,noreferrer"
        );

        setMessage(
          "The PDF has been downloaded. Attach it to your WhatsApp message."
        );

        return;
      }

      const sampleLink =
        `${window.location.origin}${SAMPLE_PDF_URL}`;

      const text = encodeURIComponent(
        `Ajay CTET Classes — Book Sample: ${sampleLink}`
      );

      window.open(
        `https://wa.me/?text=${text}`,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      console.error("PDF sharing failed:", error);

      setMessage(
        "Unable to share automatically. Please download the PDF and share it manually."
      );
    } finally {
      setSharing(false);
    }
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#F7F9FE] px-4 py-8 text-[#192958] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">

        {/* =================================================
            1. SUCCESS HEADER
        ================================================= */}

        <section className="px-1 py-3 text-center sm:py-5">

          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600 sm:h-[72px] sm:w-[72px]">
            <CheckCircle2 className="h-9 w-9 sm:h-10 sm:w-10" />
          </span>

          <h1
            className={`${hindi.className} mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-[#192958] sm:mt-6 sm:text-4xl lg:text-5xl`}
          >
            {titles[type]}
          </h1>

          {/* Sample introduction */}

          {isSample && (
            <p
              className={`${hindi.className} mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base`}
            >
              आपका book sample नीचे उपलब्ध है। PDF देखें, download करें
              या अपने फोन के sharing options से share करें।
            </p>
          )}

          {/* Serial number */}

          {!isSample && serialNumber && (
            <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-blue-100 bg-[#EEF4FF] px-5 py-6 sm:mt-8 sm:px-8 sm:py-7">

              <p className="text-sm font-semibold text-[#64748B] sm:text-base">
                {serialLabel}
              </p>

              <p className="mt-2 break-words text-2xl font-extrabold tracking-tight text-[#23449B] sm:text-3xl lg:text-4xl">
                {serialNumber}
              </p>

              <p
                className={`${hindi.className} mt-3 text-sm leading-6 text-[#64748B]`}
              >
                इस नंबर को future reference के लिए सुरक्षित रखें।
              </p>

            </div>
          )}

          {/* Receipt reminder */}

          {!isSample && (
            <p
              className={`${hindi.className} mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#64748B] sm:mt-5 sm:text-base`}
            >
              Receipt का screenshot ले सकते हैं, लेकिन बेहतर होगा कि
              PDF download करके सुरक्षित रखें।
            </p>
          )}

        </section>

        {/* =================================================
            2. PDF VIEWER
        ================================================= */}

        <section className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm sm:mt-10 sm:rounded-3xl">

          {/* Viewer heading */}

          <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">

            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#23449B]">
              <FileText className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <h2 className="text-base font-bold leading-snug text-[#192958] sm:text-lg">
                {isSample
                  ? "Book Sample PDF"
                  : "Acknowledgement PDF"}
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#64748B] sm:text-sm">
                {isSample
                  ? "Preview the book sample"
                  : "Preview your registration acknowledgement"}
              </p>
            </div>

          </div>

          {/* PDF.js viewer */}

          {isSample ? (
            <PdfViewer
              file={SAMPLE_PDF_URL}
              title="Ajay CTET Classes book sample"
            />
          ) : pdfBlob ? (
            <PdfViewer
              file={pdfBlob}
              title="Registration acknowledgement"
            />
          ) : (
            <div
              role="status"
              className="flex min-h-[320px] items-center justify-center px-5 text-center text-sm text-[#64748B]"
            >
              Preparing your PDF...
            </div>
          )}

          {/* PDF actions */}

          <div className="grid grid-cols-1 gap-3 border-t border-slate-100 p-4 sm:grid-cols-2 sm:p-5">

            <button
              type="button"
              onClick={downloadDocument}
              className={`${hindi.className} inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FFC400] px-5 py-3 text-sm font-bold text-[#192958] transition-colors hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] focus-visible:ring-offset-2`}
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>

            <button
              type="button"
              onClick={shareDocument}
              disabled={sharing}
              className={`${hindi.className} inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-[#EEF4FF] px-5 py-3 text-sm font-bold text-[#23449B] transition-colors hover:bg-[#E2EBFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60`}
            >
              <Share2 className="h-4 w-4" />
              {sharing
                ? "Preparing to share..."
                : "Share PDF"}
            </button>

          </div>

          {message && (
            <p
              role="status"
              className={`${hindi.className} px-5 pb-5 text-sm leading-6 text-[#4B5D7A] sm:px-6`}
            >
              {message}
            </p>
          )}

        </section>

        {/* =================================================
            3. NEXT STEPS
        ================================================= */}

        {!isSample && (
          <section className="mt-6 rounded-2xl bg-[#192958] p-5 text-white sm:mt-8 sm:rounded-3xl sm:p-7 lg:p-8">

            <h2
              className={`${hindi.className} text-xl font-bold sm:text-2xl`}
            >
              आगे क्या करें?
            </h2>

            {type === "batch_registration" ? (
              <>
                <p
                  className={`${hindi.className} mt-3 text-sm leading-7 text-blue-100 sm:text-base`}
                >
                  अपनी acknowledgement का screenshot लें या PDF download
                  करके सुरक्षित रखें। अपने registration number को नोट कर लें।
                </p>

                <p
                  className={`${hindi.className} mt-3 text-sm leading-7 text-blue-100 sm:text-base`}
                >
                  आगे की जानकारी के लिए institute के निर्देशों का पालन करें।
                  Centre पर आने या batch से जुड़ी प्रक्रिया पूरी करने के समय
                  अपना registration number दिखाएँ।
                </p>
              </>
            ) : (
              <>
                <p
                  className={`${hindi.className} mt-3 text-sm leading-7 text-blue-100 sm:text-base`}
                >
                  Book pre-order acknowledgement का screenshot लें या PDF
                  download करके सुरक्षित रखें। अपना reference number नोट कर लें।
                </p>

                <p
                  className={`${hindi.className} mt-3 text-sm leading-7 text-blue-100 sm:text-base`}
                >
                  Book की availability और उसे प्राप्त करने से जुड़ी आगे की
                  जानकारी के लिए institute के निर्देशों का पालन करें।
                  Book लेते समय अपना reference number साथ रखें।
                </p>
              </>
            )}

            <p
              className={`${hindi.className} mt-4 border-t border-white/15 pt-4 text-xs leading-6 text-blue-200`}
            >
              यह acknowledgement है, payment receipt नहीं। इस request के लिए
              कोई payment collect नहीं की गई है।
            </p>

          </section>
        )}

        {/* Back to Home */}

        <div className="pb-3 pt-6 text-center sm:pt-8">

          <Link
            href="/"
            className={`${hindi.className} inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#192958] transition-colors hover:bg-[#EEF4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] focus-visible:ring-offset-2`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

        </div>

      </div>
    </main>
  );
}