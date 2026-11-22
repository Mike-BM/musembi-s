import { describe, expect, it } from "vitest";
import { CONTACT, SERVICES } from "@/lib/site";
import { mergeContact, mergeServices } from "@/lib/portal/merge";
import { articleSchema, contactSchema, enquiryInputSchema, publicationSchema, EMPTY_SETTINGS } from "@/lib/portal/schemas";
import { waNumber, slugify, moveItem, splitLines } from "@/components/admin/shared";

describe("portal merge", () => {
  it("returns defaults when nothing is saved", () => {
    expect(mergeContact(CONTACT, EMPTY_SETTINGS)).toEqual(CONTACT);
    expect(mergeServices(SERVICES, EMPTY_SETTINGS)).toHaveLength(SERVICES.length);
  });
  it("applies overrides and hides services", () => {
    const first = SERVICES[0]!;
    const out = mergeServices(SERVICES, { contact: {}, services: { [first.slug]: { hidden: true } } });
    expect(out.find((s) => s.slug === first.slug)).toBeUndefined();
    const second = SERVICES[1]!;
    const edited = mergeServices(SERVICES, { contact: {}, services: { [second.slug]: { title: "New title" } } });
    expect(edited.find((s) => s.slug === second.slug)?.title).toBe("New title");
    expect(mergeContact(CONTACT, { contact: { email: "a@b.co" }, services: {} }).email).toBe("a@b.co");
  });
});

describe("portal schemas", () => {
  it("validates contact numbers", () => {
    expect(contactSchema.safeParse({ ...CONTACT, phoneIntl: "0794" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...CONTACT, phoneIntl: "254794191690" }).success).toBe(true);
  });
  it("rejects unsafe download links", () => {
    const base = {
      id: "p1", title: "Guide", category: "Newsletter", publishedDate: "Nov 2026", readTimeOrPages: "", fileFormat: "PDF",
      fileSize: "", description: "A guide", topics: [],
    };
    expect(publicationSchema.safeParse({ ...base, downloadUrl: "javascript:alert(1)" }).success).toBe(false);
    expect(publicationSchema.safeParse({ ...base, downloadUrl: "/files/a.pdf" }).success).toBe(true);
    expect(publicationSchema.safeParse({ ...base, downloadUrl: "" }).success).toBe(true);
  });
  it("requires a valid slug for articles", () => {
    const a = { slug: "Bad Slug", category: "Study Skills", title: "A title", excerpt: "An excerpt text", readTime: "5", publishedDate: "x", highlights: [] };
    expect(articleSchema.safeParse(a).success).toBe(false);
    expect(articleSchema.safeParse({ ...a, slug: "good-slug" }).success).toBe(true);
  });
  it("validates enquiries", () => {
    expect(enquiryInputSchema.safeParse({ name: "A", email: "x", phone: "1", service: "", message: "hi", contactMethod: "SMS" }).success).toBe(false);
  });
});

describe("admin helpers", () => {
  it("normalises Kenyan numbers", () => {
    expect(waNumber("0794 191 690")).toBe("254794191690");
    expect(waNumber("+254794191690")).toBe("254794191690");
    expect(waNumber("794191690")).toBe("254794191690");
  });
  it("slugifies, splits and reorders", () => {
    expect(slugify("  Hello, World! 2026 ")).toBe("hello-world-2026");
    expect(splitLines("a\n\n b \n")).toEqual(["a", "b"]);
    expect(moveItem([1, 2, 3], 2, 0)).toEqual([3, 1, 2]);
    expect(moveItem([1, 2, 3], 0, -1)).toEqual([1, 2, 3]);
  });
});
