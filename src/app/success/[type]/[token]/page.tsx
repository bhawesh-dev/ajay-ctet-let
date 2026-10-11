import { notFound } from "next/navigation";

import { supabaseAdmin } from "@/lib/supabase-admin";
import SuccessContent, {
  type SuccessType,
  type SubmissionRecord,
} from "@/components/success/success-content";
export const instant = false;

type PageProps = {
  params: Promise<{
    type: string;
    token: string;
  }>;
};

type DatabaseRecord = {
  serial_number?: string | null;
  full_name: string;
  father_name: string;
  mother_name: string;
  phone_number: string;
  whatsapp_number: string;
  address_line: string;
  city_town: string;
  district: string;
  state: string;
  pin_code: string;
  created_at: string;
};

function normalizeRecord(data: DatabaseRecord): SubmissionRecord {
  return {
    fullName: data.full_name,
    fatherName: data.father_name,
    motherName: data.mother_name,
    mobile: data.phone_number,
    whatsapp: data.whatsapp_number,
    address: data.address_line,
    city: data.city_town,
    district: data.district,
    state: data.state,
    pin: data.pin_code,
    createdAt: data.created_at,
  };
}

export default async function SuccessPage({ params }: PageProps) {
  const { type, token } = await params;

  const allowedTypes: SuccessType[] = [
    "batch_registration",
    "book_preorder",
    "book_sample",
  ];

  if (!allowedTypes.includes(type as SuccessType)) {
    notFound();
  }

  // Validate the UUID before looking up a record.
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidPattern.test(token)) {
    notFound();
  }

  const submissionType = type as SuccessType;

  if (submissionType === "batch_registration") {
    const { data, error } = await supabaseAdmin
      .from("batch_registrations")
      .select(
        "serial_number, receipt_token, full_name, father_name, mother_name, phone_number, whatsapp_number, address_line, city_town, district, state, pin_code, created_at"
      )
      .eq("receipt_token", token)
      .maybeSingle();

    if (error) {
      console.error("Failed to retrieve batch registration:", error);
      throw new Error("Unable to retrieve your registration.");
    }

    if (!data) {
      notFound();
    }

    return (
      <SuccessContent
        type="batch_registration"
        serialNumber={data.serial_number}
        record={normalizeRecord(data)}
      />
    );
  }

  if (submissionType === "book_preorder") {
    const { data, error } = await supabaseAdmin
      .from("book_preorders")
      .select(
        "serial_number, receipt_token, full_name, father_name, mother_name, phone_number, whatsapp_number, address_line, city_town, district, state, pin_code, created_at"
      )
      .eq("receipt_token", token)
      .maybeSingle();

    if (error) {
      console.error("Failed to retrieve book pre-order:", error);
      throw new Error("Unable to retrieve your book pre-order.");
    }

    if (!data) {
      notFound();
    }

    return (
      <SuccessContent
        type="book_preorder"
        serialNumber={data.serial_number}
        record={normalizeRecord(data)}
      />
    );
  }

  const { data, error } = await supabaseAdmin
    .from("book_sample_requests")
    .select(
      "request_token, full_name, father_name, mother_name, phone_number, whatsapp_number, address_line, city_town, district, state, pin_code, created_at"
    )
    .eq("request_token", token)
    .maybeSingle();

  if (error) {
    console.error("Failed to retrieve book sample request:", error);
    throw new Error("Unable to retrieve your book sample request.");
  }

  if (!data) {
    notFound();
  }

  return (
    <SuccessContent
      type="book_sample"
      serialNumber={null}
      record={normalizeRecord(data)}
    />
  );
}