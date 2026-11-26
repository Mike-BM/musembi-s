import { describe, expect, it } from "vitest";
import { BRAND, CONTACT, SERVICES, VALUES, AUDIENCES, TRAINING_AREAS, INITIAL_PUBLICATIONS } from "@/lib/site";

// Checks the site data against the approved Final Website Update & Implementation Brief (24 Nov 2026).
describe("Final website brief: identity and contact", () => {
  it("uses the official name, tagline and contact details", () => {
    expect(BRAND.name).toBe("Musembi S. Educational Consultancy");
    expect(BRAND.tagline).toBe("Unlocking Potential, Shaping Futures");
    expect(CONTACT.phoneDisplay).toBe("0794 191 690");
    expect(CONTACT.phoneIntl).toBe("254794191690");
    expect(CONTACT.email).toBe("info.musembisconsultancy@gmail.com");
    expect(CONTACT.location).toBe("Kikima Town, Mbooni West Sub-County, Makueni County, Kenya");
    expect(CONTACT.postalAddress).toBe("P.O. Box 112-90125, Kikima, Kenya");
    expect(CONTACT.availability).toBe("Monday–Saturday, 8:00 AM–6:00 PM EAT");
  });

  it("uses '24 business hours' wording everywhere, never a bare '24 hours'", () => {
    expect(CONTACT.responseGuarantee).toContain("24 business hours");
    const all = JSON.stringify({ SERVICES, VALUES, AUDIENCES, TRAINING_AREAS, INITIAL_PUBLICATIONS });
    expect(all).not.toMatch(/within 24 hours/i);
  });
});

describe("Final website brief: content", () => {
  it("lists all thirteen service areas from the Services page copy", () => {
    expect(SERVICES).toHaveLength(13);
    const titles = SERVICES.map((s) => s.title);
    for (const t of [
      "Educational consultancy",
      "Tuition and learning support",
      "Mentorship and guidance",
      "Teacher support and professional development",
      "Curriculum, CBC/CBE and assessment support",
      "Research and academic support",
      "Career and professional services",
      "Language services",
      "Content and learning-resource development",
      "Digital learning and educational technology",
      "Workshops and training",
      "Educational projects and partnerships",
      "Environmental education and sustainability",
    ]) {
      expect(titles).toContain(t);
    }
    expect(new Set(SERVICES.map((s) => s.slug)).size).toBe(SERVICES.length);
  });

  it("has the five core values", () => {
    expect(VALUES.map((v) => v.title)).toEqual(["Excellence", "Integrity", "Innovation", "Empowerment", "Inclusivity"]);
  });

  it("covers the five audiences and the training areas", () => {
    expect(AUDIENCES).toHaveLength(5);
    expect(TRAINING_AREAS.length).toBe(8);
  });

  it("does not claim fixed fees anywhere in built-in content", () => {
    expect(JSON.stringify(SERVICES)).not.toMatch(/KSh|KES|\$\d/);
  });

  it("keeps built-in resource entries valid for the library filters", () => {
    expect(INITIAL_PUBLICATIONS.length).toBeGreaterThan(0);
    for (const p of INITIAL_PUBLICATIONS) expect(p.title.length).toBeGreaterThan(3);
  });
});
