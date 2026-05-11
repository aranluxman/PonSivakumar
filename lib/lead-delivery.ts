export type LeadPayload = {
  type: "contact" | "investor-package";
  fullName: string;
  email: string;
  phone?: string;
  interest?: string;
  message?: string;
  source: string;
  submittedAt: string;
  userAgent?: string | null;
  ip?: string | null;
};

export async function deliverLead(payload: LeadPayload) {
  const deliveries = await Promise.allSettled([
    postWebhook(payload),
    sendEmail(payload)
  ]);

  const failures = deliveries.filter((result) => result.status === "rejected");
  if (failures.length === deliveries.length) {
    console.info("Lead captured without external delivery integration", payload);
  }
}

async function postWebhook(payload: LeadPayload) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Webhook delivery failed with ${response.status}`);
  }
}

async function sendEmail(payload: LeadPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const to = process.env.LEAD_TO_EMAIL || "pon@ponhome.com";
  const from = process.env.LEAD_FROM_EMAIL || "Pon Sivakumar <onboarding@resend.dev>";
  const subject =
    payload.type === "investor-package"
      ? `Investor package request from ${payload.fullName}`
      : `Website lead from ${payload.fullName}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text: formatLead(payload)
    })
  });

  if (!response.ok) {
    throw new Error(`Email delivery failed with ${response.status}`);
  }
}

function formatLead(payload: LeadPayload) {
  return [
    `Lead Type: ${payload.type}`,
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `I am a: ${payload.interest || "Not provided"}`,
    `Message: ${payload.message || "Not provided"}`,
    `Source: ${payload.source}`,
    `Submitted: ${payload.submittedAt}`,
    `IP: ${payload.ip || "Unknown"}`,
    `User Agent: ${payload.userAgent || "Unknown"}`
  ].join("\n");
}
