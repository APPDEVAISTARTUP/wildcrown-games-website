import { Resend } from "resend";
import type { ContactEnquiry } from "./contact-enquiry.schema";

const destination = "aashuprajapati537@gmail.com";
const maxRequestsPerWindow = 5;
const rateLimitWindowMs = 10 * 60 * 1000;
const submissionsByIp = new Map<string, { count: number; resetAt: number }>();

export type ContactEnquiryResult =
  | { status: "accepted" }
  | { status: "unconfigured" | "rate-limited" | "failed" };

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = submissionsByIp.get(ip);

  if (!current || current.resetAt <= now) {
    submissionsByIp.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  if (current.count >= maxRequestsPerWindow) return true;
  current.count += 1;
  return false;
}

export async function sendContactEnquiry(
  enquiry: ContactEnquiry,
  ipAddress: string,
): Promise<ContactEnquiryResult> {
  if (enquiry.company?.trim()) return { status: "failed" };

  const apiKey = process.env["RESEND_API_KEY"]?.trim();
  const from = process.env["RESEND_FROM_EMAIL"]?.trim();
  if (!apiKey || !from) return { status: "unconfigured" };
  if (isRateLimited(ipAddress)) return { status: "rate-limited" };

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [destination],
      replyTo: enquiry.email,
      subject: `Website enquiry — ${enquiry.category}`,
      text: [
        "New enquiry from the Wildcrown Games contact form",
        "",
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        `Enquiry category: ${enquiry.category}`,
        "",
        "Message:",
        enquiry.message,
      ].join("\n"),
    });

    if (error || !data?.id) {
      console.error("Resend did not accept a Wildcrown contact enquiry.");
      return { status: "failed" };
    }

    return { status: "accepted" };
  } catch {
    console.error("Sending a Wildcrown contact enquiry failed.");
    return { status: "failed" };
  }
}
