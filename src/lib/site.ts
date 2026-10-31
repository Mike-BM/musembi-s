import {
  GraduationCap, PenLine, FileText, FolderOpen, IdCard, MonitorPlay,
  BookOpenCheck, Languages, Newspaper, Presentation, Award, ShieldCheck,
  Lock, HeartHandshake, Lightbulb, Clock, Users, Microscope, Briefcase,
  Building2, CheckCircle2, type LucideIcon,
} from "lucide-react";

export const CONTACT = {
  phoneDisplay: "0794 191 690",
  phoneIntl: "254794191690",
  email: "info.musembisconsultancy@gmail.com",
  location: "Nairobi, Kenya",
  availability: "Monday – Saturday, 8:00 AM – 6:00 PM EAT",
  responseGuarantee: "Enquiries reviewed within 24 hours",
};

export const whatsappLink = (text = "Hello Musembi S. Educational Consultancy, I would like to enquire about your services.") =>
  `https://wa.me/${CONTACT.phoneIntl}?text=${encodeURIComponent(text)}`;

export type Service = {
  slug: string;
  title: string;
  category: "Academic & Research" | "Documentation & Career" | "Linguistic Services" | "Mentorship & Training";
  summary: string;
  deliverables: string[];
  audience: string;
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    slug: "consultancy-research",
    title: "Educational Consultancy & Research Support",
    category: "Academic & Research",
    summary: "Comprehensive methodological, structural, and analytical guidance for academic research projects, theses, and dissertations.",
    deliverables: [
      "Research design and conceptual framework formulation",
      "Methodology review and data collection instrument auditing",
      "Chapter-by-chapter critical academic feedback",
      "Defense and viva voce preparation guidance",
    ],
    audience: "Postgraduate students (Masters/PhD), faculty members, and independent researchers.",
    icon: GraduationCap,
  },
  {
    slug: "academic-writing",
    title: "Academic Writing & Editing",
    category: "Academic & Research",
    summary: "Meticulous substantive editing, proofreading, and stylistic polishing of scholarly manuscripts, journal submissions, and theses.",
    deliverables: [
      "Rigorous grammatical, syntactic, and structural copyediting",
      "Scholarly tone alignment and clarity enhancement",
      "Citation and reference list compliance (APA, Harvard, Chicago, MLA)",
      "Comprehensive tracked-changes file with editor's notes",
    ],
    audience: "Scholars, university researchers, and postgraduates preparing manuscripts for submission.",
    icon: PenLine,
  },
  {
    slug: "proposals",
    title: "Reports, Concept Notes & Proposal Writing",
    category: "Academic & Research",
    summary: "Clear, persuasive, and structured development of institutional project reports, grant concept notes, and funding proposals.",
    deliverables: [
      "Problem statement and theory of change structuring",
      "Project outcome and indicator mapping (Logframes / M&E matrices)",
      "Executive summaries and policy brief drafting",
      "Compliance review against donor or institutional terms of reference",
    ],
    audience: "NGO project managers, academic departments, researchers, and educational non-profits.",
    icon: FileText,
  },
  {
    slug: "academic-support",
    title: "Academic Support Services",
    category: "Academic & Research",
    summary: "Personalized assistance with complex academic coursework, project organization, and rigorous reference management.",
    deliverables: [
      "Coursework structure planning and literature search strategy",
      "Reference management system setup (Mendeley / Zotero guidance)",
      "Academic presentation and slide deck refinement",
      "Plagiarism prevention and originality auditing guidance",
    ],
    audience: "Undergraduate and postgraduate students seeking to elevate coursework rigor.",
    icon: BookOpenCheck,
  },
  {
    slug: "cv-writing",
    title: "CV Writing & Review Services",
    category: "Documentation & Career",
    summary: "Strategic crafting and restructuring of academic curricula vitae, executive resumes, and professional career portfolios.",
    deliverables: [
      "Targeted academic CV or professional executive resume",
      "Compelling personal statement / Cover letter alignment",
      "LinkedIn profile audit and optimization recommendations",
      "Applicant Tracking System (ATS) readability formatting",
    ],
    audience: "Graduates, mid-career professionals, university faculty, and executive job candidates.",
    icon: IdCard,
  },
  {
    slug: "documentation",
    title: "Documentation Services",
    category: "Documentation & Career",
    summary: "End-to-end preparation, formatting, standardization, and quality auditing of institutional manuals, policies, and formal reports.",
    deliverables: [
      "Standard Operating Procedures (SOPs) and policy documentation",
      "Document typography, pagination, and layout standardization",
      "Institutional handbooks and internal review documentation",
      "Print-ready and digital archive-ready file preparation",
    ],
    audience: "Schools, colleges, corporate training units, and non-governmental bodies.",
    icon: FolderOpen,
  },
  {
    slug: "content",
    title: "Professional Writing & Content Development",
    category: "Documentation & Career",
    summary: "High-level editorial development for educational articles, organizational thought leadership, white papers, and newsletters.",
    deliverables: [
      "Well-researched educational articles and op-eds",
      "White papers and educational briefing notes",
      "Institutional newsletters and stakeholder communications",
      "Web content and program brochures tailored to academic audiences",
    ],
    audience: "Educational institutions, think tanks, researchers, and professional associations.",
    icon: Newspaper,
  },
  {
    slug: "translation",
    title: "English ↔ Kiswahili Translation Services",
    category: "Linguistic Services",
    summary: "Accurate, culturally nuanced, and context-sensitive translation and localization of academic, legal, and educational texts.",
    deliverables: [
      "Context-accurate bidirectional translation (English to Kiswahili / Kiswahili to English)",
      "Localization of research instruments, questionnaires, and consent forms",
      "Community educational brochures and sensitization materials",
      "Certified translation review for academic documentation",
    ],
    audience: "Field researchers, humanitarian organizations, educational bodies, and publishers.",
    icon: Languages,
  },
  {
    slug: "tutoring",
    title: "Online Tutoring & Mentorship",
    category: "Mentorship & Training",
    summary: "Direct, one-to-one virtual academic tutoring, study methodology coaching, and personalized intellectual mentorship.",
    deliverables: [
      "Diagnostic learning assessment and custom study roadmap",
      "Scheduled interactive 1-on-1 virtual sessions (Google Meet / Zoom)",
      "Assignment breakdown and critical reasoning guidance",
      "Continuous progress tracking and milestone reviews",
    ],
    audience: "Secondary and tertiary students, adult learners, and early-career researchers.",
    icon: MonitorPlay,
  },
  {
    slug: "training",
    title: "Training & Capacity Building",
    category: "Mentorship & Training",
    summary: "Interactive workshops, institutional faculty seminars, and specialized skill-building modules for teams and organizations.",
    deliverables: [
      "Custom syllabus and practical workshop materials",
      "Interactive training facilitation (online or on-site in Kenya)",
      "Pre- and post-training participant capability assessments",
      "Actionable toolkit and reference guide for ongoing application",
    ],
    audience: "Educational institutions, academic faculties, NGO project teams, and professional bodies.",
    icon: Presentation,
  },
];

export const SERVICE_CATEGORIES = [
  "All Services",
  "Academic & Research",
  "Documentation & Career",
  "Linguistic Services",
  "Mentorship & Training",
] as const;

export const VALUES: { title: string; subtitle: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Professional Excellence",
    subtitle: "High academic standards",
    text: "Every consultation, review, and document is held to exacting academic and professional standards with zero shortcuts.",
    icon: Award,
  },
  {
    title: "Quality & Accuracy",
    subtitle: "Meticulous verification",
    text: "Rigorous attention to detail, precision in factual referencing, and thorough linguistic validation in every deliverable.",
    icon: ShieldCheck,
  },
  {
    title: "Integrity & Confidentiality",
    subtitle: "Strict ethical boundaries",
    text: "Your research data, intellectual property, and personal drafts remain strictly confidential. We support original scholarship ethically.",
    icon: Lock,
  },
  {
    title: "Client-Centred Guidance",
    subtitle: "Tailored to your timeline",
    text: "We meet you where you are—adapting our guidance to your academic stage, institutional requirements, and deadlines.",
    icon: HeartHandshake,
  },
  {
    title: "Methodological Rigor",
    subtitle: "Evidence-based practice",
    text: "We apply established academic methodologies and current research conventions to build durable intellectual capability.",
    icon: Lightbulb,
  },
  {
    title: "Dependable Delivery",
    subtitle: "Clear commitments",
    text: "Transparent turnaround times, dependable communication, and structured milestones you can rely on with confidence.",
    icon: Clock,
  },
];

export const AUDIENCES: { title: string; description: string; services: string; icon: LucideIcon }[] = [
  {
    title: "Learners & Students",
    description: "Navigating coursework, examinations, thesis milestones, and study discipline.",
    services: "Online Tutoring · Academic Support · Referencing",
    icon: GraduationCap,
  },
  {
    title: "Researchers & Scholars",
    description: "Designing studies, structuring dissertations, and publishing peer-reviewed work.",
    services: "Research Support · Manuscript Editing · Methodology Audits",
    icon: Microscope,
  },
  {
    title: "Educators & Tutors",
    description: "Enhancing pedagogical materials, instructional clarity, and academic content.",
    services: "Content Development · Curriculum Reviews · Training",
    icon: BookOpenCheck,
  },
  {
    title: "Professionals & Executives",
    description: "Advancing career opportunities, executive proposals, and high-stakes documents.",
    services: "CV & Portfolio Writing · Concept Notes · Professional Editing",
    icon: Briefcase,
  },
  {
    title: "Institutions & NGOs",
    description: "Building team capability, standardizing documentation, and localizing materials.",
    services: "Capacity Building Workshops · Documentation · Translation",
    icon: Building2,
  },
];

export type Programme = {
  id: string;
  title: string;
  tagline: string;
  targetAudience: string;
  format: string;
  duration: string;
  learningOutcomes: string[];
  icon: LucideIcon;
};

export const PROGRAMMES: Programme[] = [
  {
    id: "research-thesis-mastery",
    title: "Academic Research & Thesis Development",
    tagline: "Structured guidance from concept note to defended dissertation.",
    targetAudience: "Masters & PhD candidates, independent researchers",
    format: "1-on-1 Mentorship & Small Cohort Seminars",
    duration: "4 to 8 weeks (Modular)",
    learningOutcomes: [
      "Formulating clear, testable research questions and conceptual frameworks",
      "Conducting rigorous, systematic literature reviews",
      "Selecting and justifying quantitative or qualitative methodologies",
      "Structuring thesis chapters in compliance with university standards",
      "Anticipating examiner questions and preparing for oral defenses",
    ],
    icon: Microscope,
  },
  {
    id: "scholarly-writing-publishing",
    title: "Scholarly Writing & Journal Publishing",
    tagline: "Bridging the gap between raw research findings and published papers.",
    targetAudience: "Early-career academics, university lecturers, postgraduates",
    format: "Hands-on Workshop & Manuscript Coaching",
    duration: "3 weeks intensive or weekend cohort",
    learningOutcomes: [
      "Mastering academic tone, precision, and active/passive voice conventions",
      "Navigating journal scope, author guidelines, and indexing standards",
      "Handling peer review feedback and drafting persuasive response letters",
      "Eliminating accidental citation errors and ethical publishing pitfalls",
    ],
    icon: PenLine,
  },
  {
    id: "proposal-grant-writing",
    title: "Project Proposals & Concept Notes",
    tagline: "Developing persuasive, fundable proposals for programs and research.",
    targetAudience: "NGO officers, program managers, institutional researchers",
    format: "Interactive Group Seminar or Institutional Training",
    duration: "2-day intensive or 4-week evening track",
    learningOutcomes: [
      "Framing acute problem statements backed by verifiable baseline data",
      "Designing logical frameworks (Logframes) and monitoring indicators",
      "Drafting transparent project budgets and implementation schedules",
      "Aligning proposals with donor priorities and evaluation rubrics",
    ],
    icon: FileText,
  },
  {
    id: "professional-cv-career",
    title: "Academic CV & Executive Career Positioning",
    tagline: "Presenting your scholarly and professional trajectory with distinction.",
    targetAudience: "Job seekers, fellowship applicants, mid-career professionals",
    format: "Personal 1-on-1 Consultation & Drafting",
    duration: "3 to 5 business days",
    learningOutcomes: [
      "Differentiating between academic CVs and corporate resumes",
      "Crafting compelling Statements of Purpose (SOP) and motivation letters",
      "Positioning publications, grants, and teaching portfolios effectively",
      "Preparing for high-stakes academic and panel interviews",
    ],
    icon: Briefcase,
  },
  {
    id: "bilingual-translation-practice",
    title: "Bilingual Academic & Field Translation (English ↔ Kiswahili)",
    tagline: "Linguistic accuracy and cultural fidelity in field research and documentation.",
    targetAudience: "Field enumerators, research assistants, community facilitators",
    format: "Practical Training Workshop",
    duration: "2-day workshop",
    learningOutcomes: [
      "Standardizing academic and technical terminology in Kiswahili",
      "Translating informed consent forms and survey instruments accurately",
      "Preserving semantic nuance and cultural appropriateness in community research",
    ],
    icon: Languages,
  },
];

export type Article = {
  slug: string;
  category: "Research Methodology" | "Academic Writing" | "Career & Documentation" | "Study Skills";
  title: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
  highlights: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "research-question-formulation",
    category: "Research Methodology",
    title: "How to Frame a Researchable Question for Your Postgraduate Thesis",
    excerpt: "A practical guide to moving from a broad topic of interest to a focused, defensible research problem that satisfies academic review boards.",
    readTime: "6 min read",
    publishedDate: "October 2026",
    highlights: [
      "The 'FINER' criteria: Feasible, Interesting, Novel, Ethical, and Relevant",
      "Common pitfalls: Questions that are too broad, purely descriptive, or untestable",
      "Mapping research objectives directly to methodological instruments",
    ],
  },
  {
    slug: "academic-voice-clarity",
    category: "Academic Writing",
    title: "Finding an Academic Voice Without Sacrificing Clarity",
    excerpt: "Scholarly prose does not require unnecessary jargon. Learn how to write with intellectual rigor while keeping your arguments accessible and precise.",
    readTime: "5 min read",
    publishedDate: "October 2026",
    highlights: [
      "Pruning nominalizations and unnecessary passive constructions",
      "Using signposting to guide the reader through complex arguments",
      "Balancing original critical voice with cited literature evidence",
    ],
  },
  {
    slug: "academic-cv-vs-resume",
    category: "Career & Documentation",
    title: "Structuring an Academic CV: What Selection Committees Look for First",
    excerpt: "Whether applying for university positions, fellowships, or doctoral admissions, your CV must follow established scholarly conventions.",
    readTime: "7 min read",
    publishedDate: "October 2026",
    highlights: [
      "Standard ordering: Education, Research, Teaching, Publications, Grants",
      "How to cite forthcoming and in-review papers ethically",
      "Formatting for readability across international scholarship panels",
    ],
  },
  {
    slug: "referencing-systems-overview",
    category: "Academic Writing",
    title: "Navigating Referencing Systems: APA 7th, Harvard, and Chicago",
    excerpt: "Understanding the philosophical differences and technical nuances among major citation conventions, and why consistency protects your academic integrity.",
    readTime: "5 min read",
    publishedDate: "September 2026",
    highlights: [
      "Author-date systems vs. numerical footnote conventions",
      "Digital Object Identifiers (DOIs) and modern online source referencing",
      "Common bibliographic errors caught by university plagiarism checkers",
    ],
  },
  {
    slug: "concept-notes-persuasion",
    category: "Research Methodology",
    title: "Key Elements of a Persuasive Project Concept Note",
    excerpt: "Before writing a 40-page grant proposal, decision-makers review a 3-page concept note. Here is how to make those three pages count.",
    readTime: "8 min read",
    publishedDate: "September 2026",
    highlights: [
      "Articulating the core problem in the first two paragraphs",
      "Defining realistic, measurable project milestones and beneficiaries",
      "Establishing organizational credibility and risk mitigation upfront",
    ],
  },
  {
    slug: "sustainable-study-routines",
    category: "Study Skills",
    title: "Building Sustainable Study Routines for Working Professionals",
    excerpt: "Balancing full-time employment with postgraduate coursework or professional examinations requires intentional calendar design and energy management.",
    readTime: "4 min read",
    publishedDate: "August 2026",
    highlights: [
      "Time-blocking deep work intervals around peak cognitive energy",
      "The 'Minimum Viable Study Session' technique for demanding workweeks",
      "Setting non-negotiable boundaries with personal and professional commitments",
    ],
  },
];
