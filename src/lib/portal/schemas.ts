import { z } from "zod";
import type { Article, Publication } from "@/lib/site";

/**
 * Shared validation rules for everything the admin portal stores.
 * Used on the server (to reject bad data) and in the admin forms.
 */
export const ARTICLE_CATEGORIES = [
  "Research Methodology",
  "Academic Writing",
  "Career & Documentation",
  "Study Skills",
] as const;

export const PUBLICATION_CATEGORIES = ["Training Manual", "Scholarly Article", "Newsletter"] as const;

export const ENQUIRY_STATUSES = ["new", "in_progress", "done", "spam"] as const;
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export const ENQUIRY_STATUS_LABEL: Record<EnquiryStatus, string> = {
  new: "New",
  in_progress: "In progress",
  done: "Done",
  spam: "Spam",
};

const text = (max: number) => z.string().trim().max(max);

export const contactSchema = z.object({
  phoneDisplay: text(40).min(5),
  phoneIntl: z.string().trim().regex(/^\d{9,15}$/, "Digits only, with country code (e.g. 254794191690)"),
  email: z.string().trim().email().max(200),
  location: text(120).min(2),
  postalAddress: text(200),
  availability: text(200),
  responseGuarantee: text(200),
});
export type ContactSettings = z.infer<typeof contactSchema>;

export const serviceOverrideSchema = z.object({
  title: text(160).min(3).optional(),
  summary: text(900).min(10).optional(),
  audience: text(600).optional(),
  deliverables: z.array(text(300).min(1)).max(12).optional(),
  hidden: z.boolean().optional(),
});
export type ServiceOverride = z.infer<typeof serviceOverrideSchema>;

export const settingsSchema = z.object({
  contact: contactSchema.partial(),
  services: z.record(z.string().max(80), serviceOverrideSchema),
});
export type SiteSettings = z.infer<typeof settingsSchema>;
export const EMPTY_SETTINGS: SiteSettings = { contact: {}, services: {} };

export const articleSchema = z.object({
  slug: z.string().trim().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes"),
  category: z.enum(ARTICLE_CATEGORIES),
  title: text(200).min(5),
  excerpt: text(800).min(10),
  readTime: text(40).min(1),
  publishedDate: text(40).min(1),
  highlights: z.array(text(300).min(1)).max(12),
});
export const articlesSchema = z.array(articleSchema).max(200);

export const publicationSchema = z.object({
  id: z.string().trim().min(1).max(60),
  title: text(200).min(3),
  category: z.enum(PUBLICATION_CATEGORIES),
  publishedDate: text(40).min(1),
  readTimeOrPages: text(60),
  fileFormat: text(20),
  fileSize: text(30),
  description: text(900).min(5),
  topics: z.array(text(80).min(1)).max(12),
  downloadUrl: z
    .string()
    .trim()
    .max(600)
    .refine((v) => v === "" || /^https?:\/\//i.test(v) || /^\/files\/[A-Za-z0-9._-]+$/.test(v), "Must be a web link or an uploaded file")
    .optional(),
});
export const publicationsSchema = z.array(publicationSchema).max(300);

/** What a visitor sends from the public enquiry form. */
export const enquiryInputSchema = z.object({
  name: text(100).min(2),
  email: z.string().trim().email().max(255),
  phone: text(30).min(7),
  academicLevel: text(100).optional(),
  service: text(200).min(1),
  timeline: text(100).optional(),
  message: text(2500).min(10),
  contactMethod: z.enum(["WhatsApp", "Email", "Phone"]),
  /** Honeypot: real people never fill this hidden field. */
  website: text(200).optional(),
});
export type EnquiryInput = z.infer<typeof enquiryInputSchema>;

export const enquiryRecordSchema = enquiryInputSchema.omit({ website: true }).extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  status: z.enum(ENQUIRY_STATUSES),
  notes: text(4000),
});
export type EnquiryRecord = z.infer<typeof enquiryRecordSchema>;

export const ENQUIRY_ID = /^\d{4}-\d{2}-[a-z0-9]{8}$/;

/** Everything the public site reads from the portal. null = nothing saved yet, so built-in content shows. */
export type PortalContent = {
  settings: SiteSettings;
  articles: Article[] | null;
  publications: Publication[] | null;
};
