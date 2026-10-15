export const site = {
  name: "Farha Ghallab",
  role: "Full-Stack Software Developer",
  location: "Alexandria, Egypt",
  email: "farhagalab74@gmail.com",
  github: "https://github.com/farhaghallab3",
  linkedin: "https://www.linkedin.com/in/farhaghallab/",
  cv: "/Farha_Ghallab_CV.pdf",
  url: "https://farhaghallab.dev",
};

export const nav = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type Project = {
  slug: string;
  index: string;
  name: string;
  title: string;
  kind: string;
  summary: string;
  role: string;
  year?: string;
  live: string;
  github?: string;
  tags: string[];
  highlights: string[];
  /** Drop a file in /public/projects and set this to e.g. "/projects/struct.png". */
  image?: string;
  imageHint: string;
  rtl?: boolean;
  /** Extra detail strip rendered under the visual. */
  strip?: { label: string; items: string[] };
};

export const projects: Project[] = [
  {
    slug: "real-estate-crm",
    index: "01",
    name: "Real Estate Sales CRM",
    title: "Sales CRM for property teams",
    kind: "Full-stack · CRM",
    summary:
      "A production-oriented CRM for real-estate teams to run their daily sales workflow, from first lead to closed deal and commission.",
    role: "Full-stack engineering & deployment",
    live: "https://real-estate-sales-crm-beta.vercel.app",
    tags: ["Next.js", "Django", "PostgreSQL", "Docker", "CRM"],
    highlights: [
      "Leads, properties and viewings feeding a deal pipeline",
      "Tasks, notifications and commission tracking for day-to-day sales ops",
      "Documents, media storage and analytics",
      "Authentication and a Django / DRF API behind a Next.js + TypeScript client",
    ],
    image: "/projects/real-estate-crm.png",
    imageHint: "real-estate-crm.png",
    strip: {
      label: "Architecture",
      items: ["Next.js + TypeScript", "Django / DRF", "PostgreSQL", "Docker", "Cloud"],
    },
  },
  {
    slug: "muzakkir",
    index: "02",
    name: "Muzakkir",
    title: "AI-assisted Quran memorization",
    kind: "AI · EdTech",
    summary:
      "A memorization platform built around one guided loop: continue, understand, memorize, recite, review. Arabic-first from the first pixel.",
    role: "Frontend & AI experimentation",
    live: "https://modaker.vercel.app",
    tags: ["Next.js", "TypeScript", "AI", "Speech-to-Text", "Arabic UX"],
    highlights: [
      "Responsive Arabic-first interface with RTL-aware layouts",
      "Memorization and review workflows with progress tracking",
      "Recitation workflow, with speech-to-text evaluation of Arabic/Quran recognition models",
      "AI-assisted learning features",
    ],
    image: "/projects/muzakkir.png",
    imageHint: "muzakkir.png",
    rtl: true,
    strip: {
      label: "The loop",
      items: ["Continue", "Understand", "Memorize", "Recite", "Review"],
    },
  },
  {
    slug: "nabta",
    index: "03",
    name: "Nabta",
    title: "Full-stack web application",
    kind: "Full-stack",
    summary:
      "A Django backend and Vite frontend with Arabic internationalization, backed by a PostgreSQL production database.",
    role: "Frontend, APIs & deployment",
    live: "https://nabta-sigma.vercel.app",
    tags: ["React", "Vite", "Django", "PostgreSQL", "i18n"],
    highlights: [
      "Frontend implementation and backend APIs",
      "Arabic internationalization",
      "Clean backend / frontend separation",
      "Environment configuration and production deployment",
    ],
    image: "/projects/nabta.webp",
    imageHint: "nabta.webp",
  },
  // STRUCT (hidden for now) - paste back into the array to show it again:
  // {
  //   slug: "struct",
  //   index: "04",
  //   name: "STRUCT",
  //   title: "AI Business Agent Workspace",
  //   kind: "AI Agents · SaaS",
  //   summary:
  //     "An operations workspace where an intelligent agent helps teams run customer conversations, bookings and follow-ups from one interface. Not a chatbot bolted onto a dashboard, but an agent designed around real business workflows.",
  //   role: "Product, UI & frontend engineering",
  //   live: "https://snow-viper-177118.hostingersite.com",
  //   tags: ["React", "AI Agents", "SaaS", "Business Automation", "Responsive UX"],
  //   highlights: [
  //     "Agent workspace where users instruct the agent directly and review its action requests",
  //     "Dashboard with bookings, conversations, follow-ups and activity in one glance",
  //     "Customer management, bookings and a knowledge base the agent works from",
  //     "Responsive mobile navigation designed for people away from a desk",
  //   ],
  //   image: "/projects/struct.png",
  //   imageHint: "struct.png",
  //   strip: {
  //     label: "Inside the workspace",
  //     items: [
  //       "Agent",
  //       "Conversations",
  //       "Customers",
  //       "Bookings",
  //       "Follow-ups",
  //       "Knowledge",
  //       "Activity",
  //     ],
  //   },
  // },
];

export type ArchiveItem = {
  title: string;
  note: string;
  category: "Client work" | "SaaS" | "Integrations" | "Automation";
  stack: string;
  year: string;
  href?: string;
};

/** Add entries here; the archive picks up new categories automatically. */
export const archive: ArchiveItem[] = [
  {
    title: "WordPress client websites",
    note: "Custom builds for local and international clients.",
    category: "Client work",
    stack: "WordPress",
    year: "2025",
  },
  {
    title: "Gmail & WhatsApp assistants",
    note: "OpenAI-powered replies wired through webhooks.",
    category: "Integrations",
    stack: "OpenAI · Webhooks",
    year: "2025",
  },
  {
    title: "Multi-domain VPS deployments",
    note: "Linux, Nginx, Gunicorn, PostgreSQL and SSL/TLS in production.",
    category: "Automation",
    stack: "Nginx · Gunicorn",
    year: "2025",
  },
  {
    title: "Site automation for clients",
    note: "Removing repetitive operational work from small business sites.",
    category: "Automation",
    stack: "Python · APIs",
    year: "2025",
  },
  {
    title: "Home-services marketplace",
    note: "Graduation project: technicians, booking and AI-assisted issue diagnosis.",
    category: "SaaS",
    stack: "Django · React",
    year: "2024",
  },
];

export const capabilities = [
  {
    layer: "01",
    title: "Frontend",
    blurb: "Interfaces that are fast, accessible and considered.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Vite",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Responsive Design",
    ],
  },
  {
    layer: "02",
    title: "Backend",
    blurb: "APIs and data models that stay maintainable.",
    items: [
      "Python",
      "Django",
      "Django REST Framework",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "OOP",
    ],
  },
  {
    layer: "03",
    title: "Infrastructure",
    blurb: "Shipped, secured and kept running.",
    items: ["Linux VPS", "Nginx", "Gunicorn", "Docker", "SSL/TLS", "CI/CD", "Jenkins"],
  },
  {
    layer: "04",
    title: "Integrations",
    blurb: "Products that talk to the tools people already use.",
    items: [
      "OpenAI APIs",
      "Webhooks",
      "Gmail integrations",
      "WhatsApp integrations",
      "Git",
      "GitHub",
    ],
  },
];

export const experience = [
  {
    role: "Freelance Full-Stack Web Developer",
    org: "Independent",
    period: "August 2025 — Present",
    summary:
      "Design, build and maintain production web applications across frontend, backend, APIs, infrastructure and deployment.",
    points: [
      "Django/DRF and React applications",
      "VPS deployments on Linux, Nginx and Gunicorn",
      "PostgreSQL and SSL/TLS, multi-domain setups",
      "OpenAI APIs, Gmail / WhatsApp and webhooks",
      "WordPress client projects",
    ],
  },
  {
    role: "Full-Stack Web Developer, ITI Intensive Training",
    org: "Information Technology Institute (ITI), MCIT",
    period: "July 2025 — January 2026",
    summary:
      "Intensive Python full-stack training covering backend APIs, databases, frontend development, Git and practical team projects.",
    points: [],
  },
];

export const education = {
  degree: "Bachelor of Software Industry and Multimedia",
  school: "Faculty of Science, Alexandria University",
  year: "Graduated 2024",
  project:
    "A digital marketplace connecting customers with trusted technicians for home maintenance and repair, featuring AI-assisted issue diagnosis, booking, service management and an admin dashboard.",
};

export const certifications = [
  {
    title: "Samsung Innovation Campus",
    note: "Python, Data Analysis, OOP & Algorithms",
    period: "Jul 2024 — Sep 2024",
  },
  { title: "Ubuntu Course, Maharat Tech", note: "Linux", period: "Aug 2025" },
  {
    title: "Volunteer Frontend Mentor",
    note: "Homa-Volve",
    period: "May 2025 — Sep 2025",
  },
];
