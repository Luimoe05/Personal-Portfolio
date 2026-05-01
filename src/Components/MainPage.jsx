import React from "react";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import {
  SiReact,
  SiPrisma,
  SiVite,
  SiPostgresql,
  SiExpress,
  SiTailwindcss,
} from "react-icons/si";
import { IoLogoNodejs } from "react-icons/io";
import { FaJava } from "react-icons/fa";
import AnimateIn from "./AnimateIn";
import { useNavigate } from "react-router-dom";
import codeyTheBearPicture from "../assets/image.jpg";
import CodificaImg from "../assets/Codifica.png";
import CreatorsFIUImg from "../assets/creatorsFIU.png";
import RepoAI from "../assets/RepoAI.png";

const techs = [
  { Icon: SiReact, label: "React" },
  { Icon: SiTailwindcss, label: "Tailwind" },
  { Icon: SiVite, label: "Vite" },
  { Icon: IoLogoNodejs, label: "Node.js" },
  { Icon: SiExpress, label: "Express" },
  { Icon: SiPostgresql, label: "PostgreSQL" },
  { Icon: SiPrisma, label: "Prisma" },
  { Icon: FaJava, label: "Java" },
];

const experiences = [
  {
    position: "Software Engineering Intern",
    company: "Salesforce",
    duration: "Jun 2025 – Aug 2025",
    description:
      "As a Full Stack Intern at Salesforce and part of the FTL program, I developed Codifica, an AI-powered in-browser code editor designed to enhance learning accessibility by explaining coding concepts in users' native language.",
    tags: ["React", "Node.js", "Express", "Prisma", "PostgreSQL"],
  },
  {
    position: "Director of Digital Media",
    company: "INIT",
    duration: "Dec 2025 – Present",
    description:
      "In charge of photography and videography for the largest tech organization at Florida International University.",
    tags: [],
  },
  {
    position: "INIT Build",
    company: "INIT",
    duration: "Feb 2025 – Apr 2025",
    description:
      "Collaborated on a 7-person team to build CreatorsFIU, a full-stack student marketplace. Led user authentication with Firebase and developed the responsive front-end with React and Tailwind CSS.",
    tags: ["React", "Firebase", "Tailwind"],
  },
  {
    position: "STARS Tutor",
    company: "Florida International University",
    duration: "Aug 2025 – Present",
    description:
      "Provided tutoring for undergraduate CS students covering Data Structures & Algorithms, Systems Programming, Computer Architecture, and Programming 2 (Java).",
    tags: [],
  },
];

const projects = [
  {
    name: "RepoAI",
    stack: "React · TypeScript · Vite · FastAPI · OpenAI · Pinecone · Tree-sitter",
    description:
      "Built a RAG pipeline that retrieves context-aware information from any GitHub repository. Paste a URL and RepoAI clones, parses, and indexes the codebase so you can query it in plain English — no grepping, no reading walls of code.",
    keypoints: [
      "Clones and parses repos with Tree-sitter for language-aware, chunk-level code analysis.",
      "Embeds codebase chunks via OpenAI and stores vectors in Pinecone for semantic retrieval.",
      "FastAPI backend with /ingest and /query endpoints; React 19 + TypeScript frontend.",
    ],
    img: RepoAI,
    github: "https://github.com/Luimoe05/repo-ai",
  },
  {
    name: "Codifica",
    stack: "React · Express · Node · Prisma · PostgreSQL · Tailwind",
    description:
      "Co-developed a full-stack in-browser IDE aimed at making programming accessible to non-native English speakers, with AI-powered multilingual support.",
    keypoints: [
      "In-browser IDE using Judge0 and Codemirror APIs, supporting 3+ languages.",
      "Gemini-powered AI assistant for personalized, multilingual explanations.",
      "35% AI response time improvement based on feedback from 30+ users.",
    ],
    img: CodificaImg,
    github: "https://github.com/FTLSunstack/FTLCapstone",
  },
  {
    name: "CreatorsFIU",
    stack: "React · TailwindCSS · Firebase · MongoDB",
    description:
      "Built a full-stack student marketplace for university students to buy and sell school-related items as part of a 7-person team.",
    keypoints: [
      "15+ reusable React components for product listings and user profiles.",
      "Firebase authentication with 30% login speed improvement.",
      "Authored 20+ user stories to guide development sprints.",
    ],
    img: CreatorsFIUImg,
    github: "https://github.com/CreatorsFIU-initBuild/demoDAY",
  },
];

export default function MainPage({ isDark }) {
  const navigate = useNavigate();
  const divider = isDark ? "border-zinc-800" : "border-zinc-200";
  const subtle = isDark ? "text-zinc-400" : "text-zinc-500";
  const cardBg = isDark
    ? "bg-zinc-900 border border-zinc-800"
    : "bg-zinc-50 border border-zinc-200";

  return (
    <main className="max-w-2xl mx-auto px-6 pb-24">
      {/* Hero */}
      <section
        id="about"
        className="flex flex-col items-center justify-center min-h-[60vh] py-16 text-center gap-4"
      >
        <AnimateIn delay={0.1}>
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--accent)' }}>
            Software Developer
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight mt-2">
            Luis-Angel <br className="hidden sm:block" />
            Moreno
          </h1>
          <p
            className={`max-w-sm mx-auto mt-3 text-sm sm:text-base leading-relaxed ${subtle}`}
          >
            Junior CS student at FIU, passionate about building impactful
            applications that serve communities.
          </p>
          <div className="flex gap-6 mt-4 justify-center">
            <a
              href="https://github.com/Luimoe05"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="icon-link"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/luisanm/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="icon-link"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:lmoreno00528@gmail.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Email"
              className="icon-link"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </AnimateIn>
      </section>

      <hr className={divider} />

      {/* About */}
      <section className="py-12 flex flex-col gap-10">
        <AnimateIn delay={0.1}>
          <div className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest opacity-40 font-medium">
              About
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${subtle}`}>
              Hello! I'm Luis-Angel Moreno, a junior at Florida International
              University pursuing a BS in Computer Science. I'm incoming this
              summer as a Software Engineer Intern at Salesfore.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div className="flex flex-col gap-4">
            <h2 className="text-xs uppercase tracking-widest opacity-40 font-medium">
              Technologies
            </h2>
            <style>{`
              .tech-item {
                position: relative;
                overflow: hidden;
                border-radius: 8px;
                padding: 8px 10px;
                cursor: default;
                transition: transform 0.2s ease;
              }
              .tech-item::after {
                content: '';
                position: absolute;
                top: 0;
                left: -75%;
                width: 50%;
                height: 100%;
                background: linear-gradient(
                  120deg,
                  transparent 0%,
                  ${
                    isDark ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.25)"
                  } 50%,
                  transparent 100%
                );
                transform: skewX(-20deg);
                transition: none;
                opacity: 0;
              }
              .tech-item:hover {
                transform: translateY(-2px);
              }
              .tech-item:hover::after {
                opacity: 1;
                left: 125%;
                transition: left 0.50s ease, opacity 0.1s ease;
              }
            `}</style>
            <div className="flex flex-wrap gap-2">
              {techs.map(({ Icon, label }) => (
                <div
                  key={label}
                  className={`tech-item flex flex-col items-center gap-1 ${
                    isDark ? "hover:bg-zinc-800/40" : "hover:bg-zinc-100/60"
                  }`}
                >
                  <Icon size={22} className={subtle} />
                  <span className={`text-xs ${subtle}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest opacity-40 font-medium">
              Education
            </h2>
            <div className="flex items-baseline justify-between">
              <span className="text-sm sm:text-base font-medium">
                Florida International University
              </span>
              <span className={`text-xs ${subtle}`}>2023 – Present</span>
            </div>
            <p className={`text-sm ${subtle}`}>BS in Computer Science</p>
            <p className={`text-xs ${subtle} leading-relaxed`}>
              Data Structures & Algorithms · Systems Programming · Artificial
              Intelligence Algorithms
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.25}>
          <div className="flex flex-col gap-3">
            <h2 className="text-xs uppercase tracking-widest opacity-40 font-medium">
              Highlight
            </h2>
            <button
              onClick={() => navigate("/summer")}
              className={`group flex items-center gap-4 text-left rounded-xl p-4 transition-all cursor-pointer ${
                isDark ? "hover:bg-zinc-900" : "hover:bg-zinc-100"
              }`}
            >
              <img
                src={codeyTheBearPicture}
                alt="Me with Codey the bear at Salesforce SF"
                className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">Summer 2025</span>
                <span className={`text-xs ${subtle}`}>
                  A dive into my time in San Francisco →
                </span>
              </div>
            </button>
          </div>
        </AnimateIn>
      </section>

      <hr className={divider} />

      {/* Experience */}
      <section id="experience" className="py-12 flex flex-col gap-8">
        <h2 className="text-xs uppercase tracking-widest opacity-40 font-medium">
          Experience
        </h2>
        {experiences.map((exp, i) => (
          <AnimateIn key={i} delay={0.1 + i * 0.05}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold">{exp.position}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--accent)' }}>{exp.company}</span>
                </div>
                <span className={`text-xs ${subtle} whitespace-nowrap`}>
                  {exp.duration}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${subtle}`}>
                {exp.description}
              </p>
              {exp.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: 'color-mix(in oklch, var(--accent) 10%, transparent)',
                        color: 'var(--accent)',
                        border: '1px solid color-mix(in oklch, var(--accent) 25%, transparent)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {i < experiences.length - 1 && <hr className={`mt-8 ${divider}`} />}
          </AnimateIn>
        ))}
      </section>

      <hr className={divider} />

      {/* Projects */}
      <section id="projects" className="py-12 flex flex-col gap-8">
        <h2 className="text-xs uppercase tracking-widest opacity-40 font-medium">
          Projects
        </h2>
        {projects.map((proj, i) => (
          <AnimateIn key={i} delay={0.1 + i * 0.05}>
            <div className={`rounded-xl p-5 flex flex-col gap-3 ${cardBg}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-xl">{proj.name}</h3>
                  <p className={`text-xs mt-0.5 ${subtle}`}>{proj.stack}</p>
                </div>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-1 text-xs shrink-0 transition-opacity hover:opacity-60 ${subtle}`}
                >
                  GitHub <ExternalLink size={12} />
                </a>
              </div>
              {proj.img && (
                <a href={proj.github} target="_blank" rel="noreferrer">
                  <img
                    src={proj.img}
                    alt={proj.name}
                    className="w-full rounded-lg border border-zinc-200/30 hover:opacity-90 transition-opacity"
                  />
                </a>
              )}
              <p className={`text-sm leading-relaxed ${subtle}`}>
                {proj.description}
              </p>
              <ul
                className={`text-xs leading-relaxed flex flex-col gap-1.5 list-disc list-inside ${subtle}`}
              >
                {proj.keypoints.map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>
            </div>
            {i < projects.length - 1 && <div />}
          </AnimateIn>
        ))}
      </section>
    </main>
  );
}
