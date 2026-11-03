import { describe, expect, it } from "vitest";
import { CONTACT, SERVICES, AUDIENCES, INITIAL_PUBLICATIONS } from "@/lib/site";

describe("Website Content Review & Audit Verification", () => {
  it("has Kikima, Kenya as primary location and includes postal address", () => {
    expect(CONTACT.location).toBe("Kikima, Kenya");
    expect(CONTACT.postalAddress).toBe("P.O Box 112-90125 Kikima, Makueni County");
    expect(CONTACT.phoneDisplay).toBe("0794 191 690");
    expect(CONTACT.email).toBe("info.musembisconsultancy@gmail.com");
  });

  it("integrates CBC/CBE Advisory into Service 01 (Educational Consultancy & Research Support)", () => {
    const s1 = SERVICES.find((s) => s.slug === "consultancy-research");
    expect(s1).toBeDefined();
    expect(s1?.summary).toContain("Competency-Based Curriculum (CBC) / Competency-Based Education (CBE) Advisory");
    expect(s1?.deliverables).toContain("Competency-Based Curriculum (CBC) / Competency-Based Education (CBE) Advisory");
    expect(s1?.audience).toContain("undergraduate");
  });

  it("aligns education terminology to junior and senior school in Service 09 (Online Tutoring)", () => {
    const s9 = SERVICES.find((s) => s.slug === "tutoring");
    expect(s9).toBeDefined();
    expect(s9?.audience).toContain("junior, senior school");
    expect(s9?.audience).not.toContain("Secondary and tertiary");
  });

  it("clarifies service boundaries by reviewing scholarly work in audience and practice descriptors", () => {
    const researchers = AUDIENCES.find((a) => a.title === "Researchers & Scholars");
    expect(researchers).toBeDefined();
    expect(researchers?.description).toContain("reviewing scholarly work");
  });

  it("provides publication repository items for Training Manuals, Scholarly Articles, and Newsletters", () => {
    expect(INITIAL_PUBLICATIONS.length).toBeGreaterThanOrEqual(3);
    const types = INITIAL_PUBLICATIONS.map((p) => p.category);
    expect(types).toContain("Training Manual");
    expect(types).toContain("Scholarly Article");
    expect(types).toContain("Newsletter");
  });
});

