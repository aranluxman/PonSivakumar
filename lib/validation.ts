export type ContactInput = {
  fullName: string;
  email: string;
  phone: string;
  interest: "Investor" | "Buyer" | "Seller" | "Partner";
  message: string;
};

export type InvestorPackageInput = {
  fullName: string;
  email: string;
  phone?: string;
  interest?: "Investor" | "Buyer" | "Seller" | "Partner";
};

const interests = new Set(["Investor", "Buyer", "Seller", "Partner"]);

export function parseContactInput(value: unknown): ContactInput {
  const data = assertRecord(value);
  const fullName = cleanString(data.fullName);
  const email = cleanString(data.email).toLowerCase();
  const phone = cleanString(data.phone);
  const interest = cleanString(data.interest);
  const message = cleanString(data.message);

  if (fullName.length < 2) throw new Error("Full name is required.");
  if (!isEmail(email)) throw new Error("A valid email address is required.");
  if (phone.length < 7) throw new Error("A valid phone number is required.");
  if (!interests.has(interest)) throw new Error("Please select a valid investor type.");
  if (message.length < 8) throw new Error("Please include a short message.");

  return {
    fullName,
    email,
    phone,
    interest: interest as ContactInput["interest"],
    message
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
