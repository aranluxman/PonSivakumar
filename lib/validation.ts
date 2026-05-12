export type ContactInput = {
  fullName: string;
  email: string;
  phone: string;
  interest: "Investor" | "Buyer" | "Seller" | "Joint Venture Partner" | "Other";
  message: string;
  details?: Record<string, string | string[]>;
};

export type InvestorPackageInput = {
  fullName: string;
  email: string;
  phone?: string;
  interest?: "Investor" | "Buyer" | "Seller" | "Joint Venture Partner" | "Other";
};

const interests = new Set(["Investor", "Buyer", "Seller", "Joint Venture Partner", "Other"]);

export function parseContactInput(value: unknown): ContactInput {
  const data = assertRecord(value);
  const fullName = cleanString(data.fullName);
  const email = cleanString(data.email).toLowerCase();
  const phone = cleanString(data.phone);
  const interest = cleanString(data.interest);
  const message = cleanString(data.message) || "No additional notes provided.";
  const details = cleanDetails(data.details);

  if (fullName.length < 2) throw new Error("Full name is required.");
  if (!isEmail(email)) throw new Error("A valid email address is required.");
  if (phone.length < 7) throw new Error("A valid phone number is required.");
  if (!interests.has(interest)) throw new Error("Please select a valid investor type.");

  return {
    fullName,
    email,
    phone,
    interest: interest as ContactInput["interest"],
    message,
    details
  };
}

export function parseInvestorPackageInput(value: unknown): InvestorPackageInput {
  const data = assertRecord(value);
  const fullName = cleanString(data.fullName);
  const email = cleanString(data.email).toLowerCase();
  const phone = cleanString(data.phone);
  const interest = cleanString(data.interest);

  if (fullName.length < 2) throw new Error("Full name is required.");
  if (!isEmail(email)) throw new Error("A valid email address is required.");
  if (interest && !interests.has(interest)) throw new Error("Please select a valid investor type.");

  return {
    fullName,
    email,
    phone: phone || undefined,
    interest: interest ? (interest as InvestorPackageInput["interest"]) : undefined
  };
}

export function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function assertRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid request body.");
  }
  return value as Record<string, unknown>;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanDetails(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;

  const details: Record<string, string | string[]> = {};

  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (Array.isArray(item)) {
      const values = item.map(cleanString).filter(Boolean);
      if (values.length) details[key] = values;
      continue;
    }

    const cleaned = cleanString(item);
    if (cleaned) details[key] = cleaned;
  }

  return Object.keys(details).length ? details : undefined;
}
