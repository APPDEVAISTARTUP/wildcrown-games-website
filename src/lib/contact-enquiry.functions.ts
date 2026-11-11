import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { contactEnquirySchema } from "./contact-enquiry.schema";
import { sendContactEnquiry } from "./contact-enquiry.server";

export const submitContactEnquiry = createServerFn({ method: "POST" })
  .validator(contactEnquirySchema)
  .handler(async ({ data }) => {
    const forwardedFor = getRequestHeader("x-forwarded-for");
    const ipAddress =
      forwardedFor?.split(",")[0]?.trim() ||
      getRequestHeader("x-real-ip")?.trim() ||
      "unknown";

    return sendContactEnquiry(data, ipAddress);
  });
