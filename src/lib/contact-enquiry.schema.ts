import { z } from "zod";

export const contactCategories = ["Business", "Publishing", "Press", "General"] as const;

export const contactEnquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  category: z.enum(contactCategories),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
  company: z.string().max(200).optional(),
});

export type ContactEnquiry = z.infer<typeof contactEnquirySchema>;
