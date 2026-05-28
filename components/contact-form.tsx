"use client";

import { FormEvent, useMemo, useState } from "react";

type InquiryType = "Investor" | "Buyer" | "Seller" | "Joint Venture Partner" | "Other";
type Errors = Record<string, string>;

const inquiryTypes: InquiryType[] = [
  "Investor",
  "Buyer",
  "Seller",
  "Joint Venture Partner",
  "Other"
];

const investmentAmounts = [
  "Below $100,000",
  "$100K-$250K",
  "$250K-$500K",
  "$500K-$1M",
  "$1M+",
  "Prefer not to say"
];

const investmentTypes = [
  "Fix and Flip",
  "Multifamily",
  "Retail Plaza",
  "Industrial",
  "Private Lending",
  "Land Development",
  "Joint Venture"
];

const propertyTypes = ["Retail Plaza", "Industrial", "Mixed-Use", "Land", "Multi-Family"];
const budgetRanges = ["Under $1M", "$1M-$3M", "$3M-$5M", "$5M-$10M", "$10M+"];
const timelines = ["Immediately", "Within 3 months", "Within 6 months", "Just exploring"];
const heardOptions = ["Google", "Referral", "LinkedIn", "Instagram", "Real estate event", "Other"];

export function ContactForm() {
  const [type, setType] = useState<InquiryType>("Investor");
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const sectionTitle = useMemo(() => {
    if (type === "Investor") return "Investor Profile";
    if (type === "Buyer") return "Acquisition Criteria";
    if (type === "Seller") return "Asset Details";
    if (type === "Joint Venture Partner") return "Partnership Opportunity";
    return "Inquiry Details";
  }, [type]);

  function validate(form: HTMLFormElement) {
    const formData = new FormData(form);
    const nextErrors: Errors = {};
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const digits = phone.replace(/\D/g, "");

    if (!name) nextErrors.name = "This field is required";
    if (!phone) nextErrors.phone = "This field is required";
    else if (digits.length < 10) nextErrors.phone = "Phone must be at least 10 digits";
    if (!email) nextErrors.email = "This field is required";
    else if (!email.includes("@")) nextErrors.email = "Please enter a valid email";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!validate(form)) return;

    const data = new FormData(form);
    const details = formDataToObject(data);
    const payload = {
      fullName: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      interest: type,
      message: String(data.get("message") || "").trim() || "No additional notes provided.",
      details
    };

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Submission failed");

      setSuccess(true);
      form.reset();
      setType("Investor");
    } catch {
      setSuccess(true);
      setSubmitError("Your browser opened a prepared email as a backup.");
      const lines = Object.entries(details).map(([key, value]) =>
        `${labelize(key)}: ${Array.isArray(value) ? value.join(", ") : value}`
      );
      const subject = encodeURIComponent(`Website inquiry from ${payload.fullName}`);
      const body = encodeURIComponent(lines.join("\n"));
      window.location.href = `mailto:aran.luxman@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="smart-form" onSubmit={onSubmit} noValidate>
      <div className="form-section-title">Personal Info</div>
      <div className="form-grid">
        <Field error={errors.name} label="First and Last Name *" name="name" />
        <Field error={errors.phone} label="Phone Number *" name="phone" type="tel" />
        <Field error={errors.email} label="Email *" name="email" type="email" full />
      </div>

      <div className="form-section-title">I am a:</div>
      <div className="pill-radio-group" role="radiogroup" aria-label="Inquiry type">
        {inquiryTypes.map((item) => (
          <label className="radio-pill" key={item}>
            <input
              checked={type === item}
              name="inquiryType"
              onChange={() => setType(item)}
              type="radio"
              value={item}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <div className="conditional-panel">
        <div className="form-section-title">{sectionTitle}</div>
        {type === "Investor" ? (
          <>
            <div className="form-grid">
              <Select label="Amount to be invested" name="amount" options={investmentAmounts} />
              <Select label="Investment timeline" name="timeline" options={timelines} />
            </div>
            <CheckboxGroup
              label="Investment type"
              name="investmentType"
              options={investmentTypes}
            />
          </>
        ) : null}

        {type === "Buyer" ? (
          <div className="form-grid">
            <Select label="Property type looking for" name="buyerPropertyType" options={propertyTypes} />
            <Select label="Budget range" name="budgetRange" options={budgetRanges} />
            <Field label="Target location in Ontario" name="targetLocation" full />
          </div>
        ) : null}

        {type === "Seller" ? (
          <div className="form-grid">
            <Field label="Property address" name="propertyAddress" />
            <Select label="Property type" name="sellerPropertyType" options={propertyTypes} />
            <Select label="Asking price range" name="askingRange" options={budgetRanges} />
            <Field label="Current occupancy %" name="occupancy" />
          </div>
        ) : null}

        {type === "Joint Venture Partner" ? (
          <div className="form-grid">
            <Textarea label="Brief description of the opportunity" name="opportunity" full rows={4} />
            <Select label="Capital you are bringing" name="capital" options={investmentAmounts} full />
          </div>
        ) : null}

        {type === "Other" ? (
          <div className="form-grid">
            <Textarea label="Tell us what you are looking for" name="otherInquiry" full rows={4} />
          </div>
        ) : null}
      </div>

      <div className="form-grid">
        <Textarea
          label="Message / Additional notes"
          name="message"
          placeholder="Tell us about your investment goals, timeline, or any questions..."
          full
          rows={5}
        />
        <Select label="How did you hear about us?" name="heardFrom" options={heardOptions} full />
      </div>

      <p className="form-disclaimer">
        By submitting this form, you agree to be contacted by Pon Sivakumar Commercial Real Estate
        regarding investment opportunities. This is not a solicitation or offering.
      </p>

      {success ? (
        <div className="success-card" role="status">
          <span>✓</span>
          Thank you! Pon will be in touch within 24 hours.
        </div>
      ) : null}
      {submitError ? <p className="submit-error">{submitError}</p> : null}

      <button className="button button--gold submit-button" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Send My Inquiry →"}
      </button>
      <p className="phone-note">
        Or call directly: <a href="tel:4169195658">(416) 919-5658</a>
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  full = false,
  error
}: {
  label: string;
  name: string;
  type?: string;
  full?: boolean;
  error?: string;
}) {
  return (
    <div className={`field ${full ? "field--full" : ""} ${error ? "field--error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} aria-invalid={Boolean(error)} />
      {error ? <span className="field-error">{error}</span> : null}
    </div>
  );
}

function Textarea({
  label,
  name,
  placeholder,
  rows = 5,
  full = false
}: {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  full?: boolean;
}) {
  return (
    <div className={`field ${full ? "field--full" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} placeholder={placeholder} rows={rows} />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  full = false
}: {
  label: string;
  name: string;
  options: string[];
  full?: boolean;
}) {
  return (
    <div className={`field select-field ${full ? "field--full" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} defaultValue="">
        <option value="" disabled>
          Select one
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function CheckboxGroup({
  label,
  name,
  options
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <fieldset className="checkbox-group">
      <legend>{label}</legend>
      <div className="checkbox-options">
        {options.map((option) => (
          <label className="custom-checkbox" key={option}>
            <input name={name} type="checkbox" value={option} />
            <span aria-hidden="true" />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function labelize(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function formDataToObject(data: FormData) {
  const result: Record<string, string | string[]> = {};

  data.forEach((value, key) => {
    const stringValue = String(value);
    if (key in result) {
      const existing = result[key];
      result[key] = Array.isArray(existing) ? [...existing, stringValue] : [existing, stringValue];
      return;
    }

    result[key] = stringValue;
  });

  return result;
}
