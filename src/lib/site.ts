import {
  GraduationCap, PenLine, BookOpen, HeartHandshake, Users, ClipboardCheck, Microscope,
  Briefcase, Languages, MonitorPlay, Presentation, Network, Leaf, Compass, Award,
  ShieldCheck, Lightbulb, Sparkles, Globe2, type LucideIcon,
} from "lucide-react";

export const BRAND = {
  name: "Musembi S. Educational Consultancy",
  short: "Musembi S.",
  tagline: "Unlocking Potential, Shaping Futures",
  strapline: "Empowering learners, supporting educators and advancing educational excellence.",
};

export const CONTACT = {
  phoneDisplay: "0794 191 690",
  phoneIntl: "254794191690",
  email: "info.musembisconsultancy@gmail.com",
  location: "Kikima Town, Mbooni West Sub-County, Makueni County, Kenya",
  postalAddress: "P.O. Box 112-90125, Kikima, Kenya",
  availability: "Monday–Saturday, 8:00 AM–6:00 PM EAT",
  responseGuarantee: "We aim to review and respond within 24 business hours.",
};

export const DEFAULT_WHATSAPP_TEXT = "Hello Musembi S. Educational Consultancy. I would like to enquire about your services.";

export const whatsappUrl = (phoneIntl: string, text = DEFAULT_WHATSAPP_TEXT) =>
  `https://wa.me/${phoneIntl}?text=${encodeURIComponent(text)}`;

export const whatsappLink = (text = DEFAULT_WHATSAPP_TEXT) => whatsappUrl(CONTACT.phoneIntl, text);

export const SERVICE_CATEGORIES = [
  "All Services",
  "Learning & Mentorship",
  "Consultancy & Curriculum",
  "Research & Professional",
  "Content & Digital Learning",
  "Training & Community",
] as const;

export type Service = {
  slug: string;
  title: string;
  category: Exclude<(typeof SERVICE_CATEGORIES)[number], "All Services">;
  summary: string;
  deliverables: string[];
  audience: string;
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    slug: "educational-consultancy",
    title: "Educational consultancy",
    category: "Consultancy & Curriculum",
    summary: "Educational guidance and advisory support for learners, parents, educators, schools and institutions. This may include learning needs, educational planning, teaching and learning improvement, institutional priorities and education-related projects.",
    deliverables: ["Guidance on learning needs", "Educational planning", "Teaching and learning improvement", "Support with institutional priorities and education-related projects"],
    audience: "Learners, parents, educators, schools and institutions",
    icon: Compass,
  },
  {
    slug: "tuition-learning-support",
    title: "Tuition and learning support",
    category: "Learning & Mentorship",
    summary: "Online and in-person tutorials, remedial learning, revision programmes, academic coaching, study guidance, academic planning and learner development. Sessions are planned around the learner’s needs and agreed learning goals.",
    deliverables: ["Online and in-person tutorials", "Remedial learning and revision programmes", "Academic coaching and study guidance", "Academic planning and learner development"],
    audience: "Learners, students, parents and guardians",
    icon: BookOpen,
  },
  {
    slug: "mentorship-guidance",
    title: "Mentorship and guidance",
    category: "Learning & Mentorship",
    summary: "Academic, personal, career and professional mentorship focusing on goal-setting, study habits, confidence, decision-making, career direction and independent learning skills.",
    deliverables: ["Goal-setting", "Study habits and independent learning skills", "Confidence and decision-making", "Career direction"],
    audience: "Learners, graduates and young professionals",
    icon: HeartHandshake,
  },
  {
    slug: "teacher-support",
    title: "Teacher support and professional development",
    category: "Consultancy & Curriculum",
    summary: "Professional development, lesson-planning support, assessment support, instructional design, teaching resources, pedagogical guidance, digital learning and capacity-building programmes.",
    deliverables: ["Lesson-planning and assessment support", "Instructional design and teaching resources", "Pedagogical guidance", "Digital learning and capacity-building programmes"],
    audience: "Teachers, tutors and education professionals",
    icon: Users,
  },
  {
    slug: "curriculum-cbc-cbe",
    title: "Curriculum, CBC/CBE and assessment support",
    category: "Consultancy & Curriculum",
    summary: "Support in curriculum implementation, Competency-Based Curriculum (CBC), Competency-Based Education (CBE), assessment practices and instructional improvement, with an emphasis on practical understanding and application.",
    deliverables: ["Curriculum implementation support", "CBC and CBE guidance", "Assessment practices", "Instructional improvement"],
    audience: "Teachers, schools and learning institutions",
    icon: ClipboardCheck,
  },
  {
    slug: "research-academic-support",
    title: "Research and academic support",
    category: "Research & Professional",
    summary: "Research-methodology guidance, research planning, surveys, needs assessments, data collection and analysis support, monitoring and evaluation, academic feedback, proofreading, editing and referencing guidance.",
    deliverables: ["Research-methodology guidance and planning", "Surveys, needs assessments, and data collection and analysis support", "Monitoring and evaluation", "Academic feedback, proofreading, editing and referencing guidance"],
    audience: "Researchers, scholars, writers and students",
    icon: Microscope,
  },
  {
    slug: "career-professional",
    title: "Career and professional services",
    category: "Research & Professional",
    summary: "CV writing and review, cover letters, professional statements, proposals, LinkedIn profile support, professional portfolios, career guidance, interview preparation and employability support.",
    deliverables: ["CV writing and review", "Cover letters and professional statements", "LinkedIn profile support and professional portfolios", "Career guidance, interview preparation and employability support"],
    audience: "Graduates, job seekers and working professionals",
    icon: Briefcase,
  },
  {
    slug: "language-services",
    title: "Language services",
    category: "Research & Professional",
    summary: "English–Kiswahili and Kiswahili–English translation, proofreading, editing and interpretation support. Work is handled with attention to accuracy, context, meaning and intended audience.",
    deliverables: ["English–Kiswahili and Kiswahili–English translation", "Proofreading and editing", "Interpretation support"],
    audience: "Individuals, institutions and organisations",
    icon: Languages,
  },
  {
    slug: "content-resource-development",
    title: "Content and learning-resource development",
    category: "Content & Digital Learning",
    summary: "Educational articles, study guides, teaching and learning materials, modules, training materials, digital resources and e-learning content for learners, educators and institutions.",
    deliverables: ["Educational articles and study guides", "Teaching and learning materials and modules", "Training materials", "Digital resources and e-learning content"],
    audience: "Learners, educators and institutions",
    icon: PenLine,
  },
  {
    slug: "digital-learning",
    title: "Digital learning and educational technology",
    category: "Content & Digital Learning",
    summary: "Digital literacy, ICT-integrated teaching and learning, educational technology support, e-learning resources and practical digital learning solutions.",
    deliverables: ["Digital literacy", "ICT-integrated teaching and learning", "Educational technology support", "E-learning resources and practical digital learning solutions"],
    audience: "Learners, educators and institutions",
    icon: MonitorPlay,
  },
  {
    slug: "workshops-training",
    title: "Workshops and training",
    category: "Training & Community",
    summary: "Workshops, seminars, short courses and tailored training programmes for learners, educators, professionals, institutions and community groups.",
    deliverables: ["Workshops and seminars", "Short courses", "Tailored training programmes"],
    audience: "Learners, educators, professionals, institutions and community groups",
    icon: Presentation,
  },
  {
    slug: "educational-projects",
    title: "Educational projects and partnerships",
    category: "Training & Community",
    summary: "Support for the design, coordination, implementation, monitoring and evaluation of educational projects and collaborative learning initiatives.",
    deliverables: ["Project design and coordination", "Implementation support", "Monitoring and evaluation of educational projects"],
    audience: "Schools, institutions, community groups and organisations",
    icon: Network,
  },
  {
    slug: "environmental-education",
    title: "Environmental education and sustainability",
    category: "Training & Community",
    summary: "Environmental awareness, climate-change and resilience education, conservation learning, tree-growing, waste-management awareness, environmental clubs and community sustainability programmes.",
    deliverables: ["Climate-change and resilience education", "Conservation learning and tree-growing", "Waste-management awareness and environmental clubs", "Community sustainability programmes"],
    audience: "Schools, learners, community groups and organisations",
    icon: Leaf,
  },
];

export const ACADEMIC_INTEGRITY =
  "Our academic support is intended to strengthen learning, understanding and independent capability. We provide tutoring, guidance, feedback, research-methodology support, editing, proofreading and referencing assistance. We do not complete examinations for learners or produce academic work for dishonest submission as another person’s independent work. Clients remain responsible for their own academic decisions, original contributions and compliance with their institutions’ rules.";

export const VALUES: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Excellence", text: "We strive for high standards and continuously seek to improve the quality and impact of our services.", icon: Award },
  { title: "Integrity", text: "We act honestly, fairly and transparently, and take responsibility for our commitments and actions.", icon: ShieldCheck },
  { title: "Innovation", text: "We welcome creative ideas, modern teaching approaches and technology that improve learning and educational outcomes.", icon: Lightbulb },
  { title: "Empowerment", text: "We equip people with knowledge, skills, confidence and opportunities to become more capable and independent.", icon: Sparkles },
  { title: "Inclusivity", text: "We respect diversity and seek to make our services accessible and responsive to different needs and circumstances.", icon: Globe2 },
];

export const AUDIENCES = [
  "Learners, students, parents and guardians",
  "Teachers, tutors and education professionals",
  "Researchers, scholars and writers",
  "Graduates, job seekers and working professionals",
  "Schools, learning institutions, community groups and organisations",
];

export const TRAINING_AREAS = [
  "Teacher professional development, pedagogy and instructional improvement.",
  "Lesson planning, curriculum and assessment, including CBC/CBE.",
  "Research skills, research methodology and evidence-informed practice.",
  "Digital literacy, educational technology and digital learning.",
  "Academic skills, study strategies and learner development.",
  "Career development, employability and professional documentation.",
  "Environmental education, climate-change awareness, resilience and sustainability.",
  "Community learning, environmental clubs and responsible resource use.",
];

export type Article = {
  slug: string;
  category:
    | "Teaching & Learning"
    | "Study & Examination Guidance"
    | "CBC/CBE"
    | "Research Methodology"
    | "Academic Writing"
    | "Career & Documentation"
    | "Study Skills"
    | "Professional Development"
    | "Digital Learning"
    | "Environmental Education";
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

export type Publication = {
  id: string;
  title: string;
  category: "Study Guide" | "Teaching Material" | "Training Manual" | "Scholarly Article" | "Newsletter" | "Handbook";
  publishedDate: string;
  readTimeOrPages: string;
  fileFormat: string;
  fileSize: string;
  description: string;
  topics: string[];
  subject?: string;
  level?: string;
  audience?: string;
  downloadUrl?: string;
};

export const INITIAL_PUBLICATIONS: Publication[] = [
  {
    id: "pub-cbc-cbe-manual-2026",
    title: "Competency-Based Curriculum (CBC) & CBE Implementation Advisory Manual",
    category: "Training Manual",
    publishedDate: "October 2026",
    readTimeOrPages: "48 pages",
    fileFormat: "PDF",
    fileSize: "2.4 MB",
    description: "An operational facilitation and benchmarking manual for junior and senior school educators, curriculum leaders, and institutional administrators in Kenya.",
    topics: ["CBC Core Competencies", "Formative Assessment Rubrics", "Pedagogical Material Localization"],
    subject: "CBC/CBE",
    level: "Junior & Senior School",
    audience: "Educators",
  },
  {
    id: "pub-scholarly-dissertation-audit",
    title: "Scholarly Manuscript & Dissertation Pre-Submission Review Framework",
    category: "Scholarly Article",
    publishedDate: "September 2026",
    readTimeOrPages: "16 pages",
    fileFormat: "PDF",
    fileSize: "1.2 MB",
    description: "Critical review methodologies for postgraduate candidates and academic faculty to verify empirical consistency, ethical boundaries, and citation compliance before formal peer review.",
    topics: ["Pre-Submission Audits", "Empirical Consistency", "Citation Integrity (APA/Harvard)"],
    subject: "Research",
    level: "Postgraduate",
    audience: "Researchers",
  },
  {
    id: "pub-advisory-bulletin-q3-2026",
    title: "Musembi S. Educational Advisory Bulletin — Q3 2026",
    category: "Newsletter",
    publishedDate: "August 2026",
    readTimeOrPages: "8 pages",
    fileFormat: "PDF",
    fileSize: "850 KB",
    description: "Quarterly institutional digest covering contemporary curriculum alignment, research methodology insights, bilingual translation standards, and mentorship updates.",
    topics: ["Quarterly Editorial Review", "Research Design Insights", "Institutional Capacity Updates"],
    subject: "General",
    audience: "All audiences",
  },
];
