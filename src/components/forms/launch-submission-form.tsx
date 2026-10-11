"use client";

import { Fragment, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export type SubmissionType =
  | "batch_registration"
  | "book_preorder"
  | "book_sample";

type Props = {
  type: SubmissionType;
  onClose?: () => void;
};

type FieldName =
  | "fullName"
  | "fatherName"
  | "motherName"
  | "mobile"
  | "whatsapp"
  | "address"
  | "city"
  | "district"
  | "state"
  | "pin";

type Values = Record<FieldName, string> & {
  sameWhatsapp: boolean;
  privacy: boolean;
};

const initialValues: Values = {
  fullName: "",
  fatherName: "",
  motherName: "",
  mobile: "",
  whatsapp: "",
  sameWhatsapp: false,
  address: "",
  city: "",
  district: "",
  state: "",
  pin: "",
  privacy: false,
};

const actionLabels: Record<SubmissionType, string> = {
  batch_registration: "Batch Registration",
  book_preorder: "Book Pre-Order",
  book_sample: "Book Sample Request",
};

const textFields: {
  name: FieldName;
  label: string;
  type?: "text" | "tel";
  wide?: boolean;
  pattern?: string;
  hint?: string;
}[] = [
  { name: "fullName", label: "Full name" },
  { name: "fatherName", label: "Father’s name" },
  { name: "motherName", label: "Mother’s name" },
  {
    name: "mobile",
    label: "Mobile number",
    type: "tel",
    pattern: "[6-9][0-9]{9}",
    hint: "Enter a valid 10-digit Indian mobile number.",
  },
  {
    name: "whatsapp",
    label: "WhatsApp number",
    type: "tel",
    pattern: "[6-9][0-9]{9}",
    hint: "Enter a valid 10-digit Indian WhatsApp number.",
  },
  {
    name: "address",
    label: "Address (house, street, locality, or landmark)",
    wide: true,
  },
  { name: "city", label: "City/Town" },
  { name: "district", label: "District" },
  { name: "state", label: "State" },
  {
    name: "pin",
    label: "PIN code",
    type: "tel",
    pattern: "[0-9]{6}",
    hint: "Enter a valid 6-digit PIN code.",
  },
];

export function LaunchSubmissionForm({ type, onClose }: Props) {
  const router = useRouter();

  const [values, setValues] = useState<Values>(initialValues);
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function updateField(name: FieldName, value: string) {
    setValues((current) => ({
      ...current,
      [name]: value,
      ...(name === "mobile" && current.sameWhatsapp
        ? { whatsapp: value }
        : {}),
    }));
  }

  function isInvalid(name: FieldName) {
    if (!attempted) return false;

    if (!values[name].trim()) return true;

    if (name === "mobile" || name === "whatsapp") {
      return !/^[6-9]\d{9}$/.test(values[name]);
    }

    if (name === "pin") {
      return !/^\d{6}$/.test(values[name]);
    }

    return false;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setAttempted(true);
    setServerError("");

    if (submitting) return;

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    if (!values.privacy) {
      setServerError("Please accept the privacy notice to continue.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submissionType: type,
          fullName: values.fullName,
          fatherName: values.fatherName,
          motherName: values.motherName,
          mobile: values.mobile,
          whatsapp: values.sameWhatsapp
            ? values.mobile
            : values.whatsapp,
          sameWhatsapp: values.sameWhatsapp,
          address: values.address,
          city: values.city,
          district: values.district,
          state: values.state,
          pin: values.pin,
          privacy: values.privacy,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.accessToken) {
        setServerError(
          result.message ||
            "Submission failed. Please check your details and try again."
        );
        return;
      }

      const allowedTypes: SubmissionType[] = [
        "batch_registration",
        "book_preorder",
        "book_sample",
      ];

      if (!allowedTypes.includes(result.submissionType)) {
        setServerError("Invalid response from the server.");
        return;
      }

      /*
       * Common success route:
       * /success/batch_registration/<token>
       * /success/book_preorder/<token>
       * /success/book_sample/<token>
       *
       * The success page will be created in the next step.
       */

      const destination =
        `/success/${result.submissionType}/` +
        encodeURIComponent(result.accessToken);

      router.push(destination);
    } catch (error) {
      console.error("Submission request failed:", error);

      setServerError(
        "Unable to submit your request right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <input type="hidden" name="submissionType" value={type} />

      <div className="form-heading">
        <div className="flex items-start justify-between gap-4">
          <h2>{actionLabels[type]}</h2>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close registration form"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#23449B] transition-colors hover:bg-[#FFF4C7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23449B] focus-visible:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <p>
          Share your details and our team will follow up when this launch
          is ready.
        </p>
      </div>

      <div className="form-grid">
        {textFields.map((field) => (
          <Fragment key={field.name}>
            <div
              className={`form-field ${
                field.wide ? "form-field--wide" : ""
              }`}
            >
              <label htmlFor={field.name}>
                {field.label}{" "}
                <span className="required" aria-hidden="true">
                  *
                </span>
              </label>

              {field.name === "address" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={values[field.name]}
                  onChange={(event) =>
                    updateField(field.name, event.target.value)
                  }
                  required
                  aria-invalid={isInvalid(field.name)}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type ?? "text"}
                  inputMode={
                    field.type === "tel" ? "numeric" : undefined
                  }
                  value={values[field.name]}
                  onChange={(event) =>
                    updateField(
                      field.name,
                      field.name === "mobile" ||
                        field.name === "whatsapp" ||
                        field.name === "pin"
                        ? event.target.value.replace(/\D/g, "")
                        : event.target.value
                    )
                  }
                  required
                  readOnly={
                    field.name === "whatsapp" &&
                    values.sameWhatsapp
                  }
                  pattern={field.pattern}
                  maxLength={
                    field.name === "pin"
                      ? 6
                      : field.type === "tel"
                        ? 10
                        : undefined
                  }
                  aria-invalid={isInvalid(field.name)}
                />
              )}

              {isInvalid(field.name) && (
                <span className="field-error">
                  {field.hint ?? "This field is required."}
                </span>
              )}
            </div>

            {/* Same WhatsApp checkbox stays between mobile and WhatsApp */}

            {field.name === "mobile" && (
              <label className="check-row checkbox-label form-field--wide">
                <input
                  type="checkbox"
                  name="sameWhatsapp"
                  checked={values.sameWhatsapp}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      sameWhatsapp: event.target.checked,
                      whatsapp: event.target.checked
                        ? current.mobile
                        : current.whatsapp,
                    }))
                  }
                />

                <span>
                  WhatsApp number is the same as my mobile number.
                </span>
              </label>
            )}
          </Fragment>
        ))}

        {/* Privacy notice */}

        <div className="form-field--wide">
          <label className="check-row checkbox-label">
            <input
              type="checkbox"
              name="privacy"
              checked={values.privacy}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  privacy: event.target.checked,
                }))
              }
              required
              aria-invalid={attempted && !values.privacy}
            />

            <span>
              I agree to share these details for registration-related
              communication.{" "}
              <span className="required">*</span>
            </span>
          </label>
        </div>
      </div>

      {serverError && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {serverError}
        </p>
      )}

      <button
        className="primary-button form-submit"
        type="submit"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit registration request"}

        {!submitting && <span aria-hidden="true">→</span>}
      </button>

      <p className="form-status" aria-live="polite">
        {submitting
          ? "Saving your details securely..."
          : "Your information will be stored for registration-related communication."}
      </p>
    </form>
  );
}