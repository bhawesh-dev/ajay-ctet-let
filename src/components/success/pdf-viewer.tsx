"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

/*
 * Configure the PDF.js worker in the same module
 * where Document and Page are used.
 */

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type PdfViewerProps = {
  file: string | Blob | null;
  title: string;
};

export default function PdfViewer({
  file,
  title,
}: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /*
   * The installed Document type expects a File.
   * Both URL strings and Blobs are converted to File objects.
   */

  const [pdfFile, setPdfFile] = useState<File | undefined>(
    undefined
  );

  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [loadingFile, setLoadingFile] = useState(true);
  const [error, setError] = useState(false);

  /* =====================================================
     PREPARE PDF FILE
  ===================================================== */

  useEffect(() => {
    let cancelled = false;

    async function preparePdf() {
      setPdfFile(undefined);
      setNumPages(0);
      setError(false);
      setLoadingFile(true);

      if (!file) {
        setLoadingFile(false);
        return;
      }

      try {
        let blob: Blob;

        if (typeof file === "string") {
          const response = await fetch(file);

          if (!response.ok) {
            throw new Error(
              `Unable to fetch PDF: ${response.status}`
            );
          }

          blob = await response.blob();
        } else {
          blob = file;
        }

        if (blob.size === 0) {
          throw new Error("The PDF file is empty.");
        }

        const safeFilename =
          title.replace(/[^a-zA-Z0-9_-]/g, "-") + ".pdf";

        const preparedFile = new File(
          [blob],
          safeFilename,
          {
            type: "application/pdf",
          }
        );

        if (!cancelled) {
          setPdfFile(preparedFile);
          setLoadingFile(false);
        }
      } catch (err) {
        console.error("PDF preparation failed:", err);

        if (!cancelled) {
          setError(true);
          setLoadingFile(false);
        }
      }
    }

    void preparePdf();

    return () => {
      cancelled = true;
    };
  }, [file, title]);

  /* =====================================================
     RESPONSIVE PAGE WIDTH
  ===================================================== */

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    function updateWidth() {
      const element = containerRef.current;

      if (!element) {
        return;
      }

      const availableWidth = element.clientWidth - 32;

      setPageWidth(
        Math.max(220, Math.min(820, availableWidth))
      );
    }

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);

      return () => {
        window.removeEventListener("resize", updateWidth);
      };
    }

    const observer = new ResizeObserver(updateWidth);

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =====================================================
     DOCUMENT EVENTS
  ===================================================== */

  function handleLoadSuccess({
    numPages: totalPages,
  }: {
    numPages: number;
  }) {
    setNumPages(totalPages);
    setError(false);
  }

  function handleLoadError(err: Error) {
    console.error("PDF rendering failed:", err);
    setError(true);
  }

  /* =====================================================
     RENDER PDF VIEWER
  ===================================================== */

  return (
    <div
      ref={containerRef}
      className="h-[65vh] min-h-[420px] w-full overflow-y-auto bg-slate-100 p-3 sm:p-5"
    >
      {error ? (
        <div
          role="alert"
          className="flex min-h-[350px] flex-col items-center justify-center px-4 text-center"
        >
          <p className="text-base font-bold text-[#192958]">
            PDF preview unavailable
          </p>

          <p className="mt-2 max-w-sm text-sm leading-6 text-[#64748B]">
            The PDF could not be displayed. Please download the PDF
            using the button below.
          </p>
        </div>
      ) : loadingFile || !pdfFile ? (
        <div
          role="status"
          className="flex min-h-[350px] items-center justify-center text-sm text-[#64748B]"
        >
          Loading PDF...
        </div>
      ) : (
        <Document
          file={pdfFile}
          onLoadSuccess={handleLoadSuccess}
          onLoadError={handleLoadError}
          loading={
            <div
              role="status"
              className="flex min-h-[350px] items-center justify-center text-sm text-[#64748B]"
            >
              Loading PDF pages...
            </div>
          }
          error={
            <div className="flex min-h-[350px] items-center justify-center text-sm text-red-600">
              Unable to load this PDF.
            </div>
          }
          className="flex flex-col items-center"
        >
          {Array.from({ length: numPages }, (_, index) => (
            <div
              key={`${title}-page-${index + 1}`}
              className="mb-4 w-fit max-w-full overflow-hidden bg-white shadow-md"
            >
              <Page
                pageNumber={index + 1}
                width={pageWidth || undefined}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={
                  <div className="flex min-h-[300px] items-center justify-center text-sm text-[#64748B]">
                    Rendering page {index + 1}...
                  </div>
                }
              />
            </div>
          ))}
        </Document>
      )}
    </div>
  );
}