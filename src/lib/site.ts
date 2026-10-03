import {
  GraduationCap, PenLine, FileText, FolderOpen, IdCard, MonitorPlay,
  BookOpenCheck, Languages, Newspaper, Presentation, Award, ShieldCheck,
  Lock, HeartHandshake, Lightbulb, Clock, Users, Microscope, Briefcase,
  Building2, type LucideIcon,
} from "lucide-react";

export const CONTACT = {
  phoneDisplay: "0794 191 690",
  phoneIntl: "254794191690",
  email: "info.musembisconsultancy@gmail.com",
};

export const whatsappLink = (text = "Hello Musembi S. Educational Consultancy, I would like to enquire about your services.") =>
  `https://wa.me/${CONTACT.phoneIntl}?text=${encodeURIComponent(text)}`;

export type Service = { slug: string; title: string; summary: string; icon: LucideIcon };

export const SERVICES: Service[] = [
  { slug: "consultancy-research", title: "Educational Consultancy & Research Support", summary: "Research guidance, academic support, and consultancy.", icon: GraduationCap },
  { slug: "academic-writing", title: "Academic Writing & Editing", summary: "Writing, editing, proofreading, and formatting of academic papers.", icon: PenLine },
  { slug: "proposals", title: "Reports, Concept Notes & Proposal Writing", summary: "Professional reports, concept notes, and project proposals.", icon: FileText },
  { slug: "documentation", title: "Documentation Services", summary: "Preparation, editing, formatting, and review of documents.", icon: FolderOpen },
  { slug: "cv-writing", title: "CV Writing & Review Services", summary: "Professional CV writing, review, and improvement.", icon: IdCard },
  { slug: "tutoring", title: "Online Tutoring & Mentorship", summary: "Personalised tutoring, mentorship, and academic guidance.", icon: MonitorPlay },
  { slug: "academic-support", title: "Academic Support Services", summary: "Support with assignments, projects, presentations, and referencing.", icon: BookOpenCheck },
  { slug: "translation", title: "English ↔ Kiswahili Translation Services", summary: "Accurate and culturally appropriate translation services.", icon: Languages },
  { slug: "content", title: "Professional Writing & Content Development", summary: "Articles, educational content, and professional documents.", icon: Newspaper },
  { slug: "training", title: "Training & Capacity Building", summary: "Training and workshops for academic and professional development.", icon: Presentation },
];

export const VALUES: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Professional Excellence", text: "Work held to high academic and professional standards.", icon: Award },
  { title: "Quality & Accuracy", text: "Careful attention to detail in every document and session.", icon: ShieldCheck },
  { title: "Integrity & Confidentiality", text: "Your work and information are handled with discretion.", icon: Lock },
  { title: "Client-Centred Service", text: "Support shaped around your goals, level, and timeline.", icon: HeartHandshake },
  { title: "Innovation & Continuous Improvement", text: "Modern methods and tools, refined with every engagement.", icon: Lightbulb },
  { title: "Timely & Reliable Delivery", text: "Clear timelines and dependable communication.", icon: Clock },
];

export const AUDIENCES: { title: string; icon: LucideIcon }[] = [
  { title: "Learners", icon: GraduationCap },
  { title: "Educators", icon: BookOpenCheck },
  { title: "Researchers", icon: Microscope },
  { title: "Professionals", icon: Briefcase },
  { title: "Institutions", icon: Building2 },
];

export const PROGRAMMES: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Academic Mentorship", text: "One-to-one guidance through coursework, study planning, and academic decisions.", icon: Users },
  { title: "Research Support", text: "Help shaping research questions, methodology, analysis, and write-up.", icon: Microscope },
  { title: "Professional Development", text: "Skills for career growth: writing, communication, and documentation.", icon: Briefcase },
  { title: "Capacity Building", text: "Structured programmes that strengthen teams and institutions.", icon: Building2 },
  { title: "Online Tutoring", text: "Flexible, personalised tutoring sessions delivered online.", icon: MonitorPlay },
  { title: "Workshops & Training", text: "Practical workshops for academic and professional audiences.", icon: Presentation },
];

/** Placeholder articles — replace with real content (or load from a CMS/database) later. */
export type Article = { slug: string; category: string; title: string; excerpt: string; readTime: string };
export const ARTICLES: Article[] = [
  { slug: "research-question", category: "Research Tips", title: "How to frame a clear, researchable question", excerpt: "A practical starting point for proposals, theses, and project reports.", readTime: "5 min read" },
  { slug: "academic-tone", category: "Academic Writing", title: "Finding an academic voice without losing clarity", excerpt: "Simple habits that make scholarly writing easier to read.", readTime: "4 min read" },
  { slug: "cv-structure", category: "Career Development", title: "Structuring a CV that reads well in 30 seconds", excerpt: "What reviewers look for first, and how to make it easy to find.", readTime: "6 min read" },
  { slug: "referencing", category: "Learning Resources", title: "Referencing styles: a plain-language overview", excerpt: "APA, Harvard and others — when each is used and why it matters.", readTime: "5 min read" },
  { slug: "concept-notes", category: "Professional Development", title: "What makes a concept note persuasive", excerpt: "Key elements funders and decision-makers expect to see.", readTime: "7 min read" },
  { slug: "study-routines", category: "Educational Articles", title: "Building study routines that actually last", excerpt: "Small, consistent steps for learners at every level.", readTime: "4 min read" },
];
