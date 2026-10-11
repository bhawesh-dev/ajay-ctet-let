import "server-only";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";



type SubmissionType =
  | "batch_registration"
  | "book_preorder"
  | "book_sample";

function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function errorResponse(
  message: string,
  status: number,
  errors?: Record<string, string>
) {
  return NextResponse.json(
    { success: false, message, ...(errors ? { errors } : {}) },
    { status }
  );
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(
      request.headers.get("content-length") ?? "0"
    );

    if (contentLength > 20_000) {
      return errorResponse("Request is too large.", 413);
    }

    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return errorResponse("Invalid request.", 400);
    }

    const input = body as Record<string, unknown>;

    const allowedTypes: SubmissionType[] = [
      "batch_registration",
      "book_preorder",
      "book_sample",
    ];

    if (
      typeof input.submissionType !== "string" ||
      !allowedTypes.includes(input.submissionType as SubmissionType)
    ) {
      return errorResponse("Invalid submission type.", 400);
    }

    const submissionType = input.submissionType as SubmissionType;

    // Never trust client-generated serial numbers.
    const fullName = cleanText(input.fullName);
    const fatherName = cleanText(input.fatherName);
    const motherName = cleanText(input.motherName);

    const mobile = cleanText(input.mobile);
    const sameWhatsapp = input.sameWhatsapp === true;

    const whatsapp = sameWhatsapp
      ? mobile
      : cleanText(input.whatsapp);

    const address = cleanText(input.address);
    const city = cleanText(input.city);
    const district = cleanText(input.district);
    const state = cleanText(input.state);
    const pin = cleanText(input.pin);

    const privacy = input.privacy === true;

    const errors: Record<string, string> = {};

    if (!fullName || fullName.length > 120) {
      errors.fullName = "Enter a valid full name.";
    }

    if (!fatherName || fatherName.length > 120) {
      errors.fatherName = "Enter your father's name.";
    }

    if (!motherName || motherName.length > 120) {
      errors.motherName = "Enter your mother's name.";
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      errors.mobile = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!/^[6-9]\d{9}$/.test(whatsapp)) {
      errors.whatsapp = "Enter a valid 10-digit WhatsApp number.";
    }

    if (!address || address.length > 500) {
      errors.address = "Enter a valid address.";
    }

    if (!city || city.length > 100) {
      errors.city = "Enter your city or town.";
    }

    if (!district || district.length > 100) {
      errors.district = "Enter your district.";
    }

    if (!state || state.length > 100) {
      errors.state = "Enter your state.";
    }

    if (!/^\d{6}$/.test(pin)) {
      errors.pin = "Enter a valid six-digit PIN code.";
    }

    if (!privacy) {
      errors.privacy = "Accept the privacy notice to continue.";
    }

    if (Object.keys(errors).length > 0) {
      return errorResponse(
        "Please correct the highlighted fields.",
        422,
        errors
      );
    }

    const record = {
      full_name: fullName,
      father_name: fatherName,
      mother_name: motherName,
      phone_number: mobile,
      whatsapp_number: whatsapp,
      address_line: address,
      city_town: city,
      district,
      state,
      pin_code: pin,
      privacy_consent_at: new Date().toISOString(),
    };

    // BATCH REGISTRATION
    if (submissionType === "batch_registration") {
      const { data, error } = await supabaseAdmin
        .from("batch_registrations")
        .insert(record)
        .select("serial_number, receipt_token")
        .single();

      if (error) {
        console.error("Batch registration failed:", error);

        return errorResponse(
          "Registration could not be saved. Please try again.",
          500
        );
      }

      return NextResponse.json(
        {
          success: true,
          submissionType,
          serialNumber: data.serial_number,
          accessToken: data.receipt_token,
        },
        { status: 201 }
      );
    }

    // BOOK PRE-ORDER
    if (submissionType === "book_preorder") {
      const { data, error } = await supabaseAdmin
        .from("book_preorders")
        .insert(record)
        .select("serial_number, receipt_token")
        .single();

      if (error) {
        console.error("Book pre-order failed:", error);

        return errorResponse(
          "Book pre-order could not be saved. Please try again.",
          500
        );
      }

      return NextResponse.json(
        {
          success: true,
          submissionType,
          serialNumber: data.serial_number,
          accessToken: data.receipt_token,
        },
        { status: 201 }
      );
    }

    // BOOK SAMPLE REQUEST — no serial number
    const { data, error } = await supabaseAdmin
      .from("book_sample_requests")
      .insert(record)
      .select("request_token")
      .single();

    if (error) {
      console.error("Book sample request failed:", error);

      return errorResponse(
        "Book sample request could not be saved. Please try again.",
        500
      );
    }

    return NextResponse.json(
      {
        success: true,
        submissionType,
        serialNumber: null,
        accessToken: data.request_token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submission API error:", error);

    return errorResponse(
      "Something went wrong. Please try again.",
      500
    );
  }
}