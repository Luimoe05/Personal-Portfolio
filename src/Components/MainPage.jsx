import React, { useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SiReact,
  SiPrisma,
  SiVite,
  SiPostgresql,
  SiExpress,
  SiTailwindcss,
  SiKubernetes,
  SiDocker,
  SiAmazon,
  SiApachespark,
  SiPython,
  SiTypescript,
} from "react-icons/si";
import { IoLogoNodejs } from "react-icons/io";
import { FaJava } from "react-icons/fa";
import AnimateIn from "./AnimateIn";
import LocalClock from "./LocalClock";
import RepoAIShot from "../assets/RepoAI.webp";
import CodificaShot from "../assets/Codifica.webp";
import CreatorsShot from "../assets/creatorsFIU.webp";
import ResumePDF from "../assets/Luis_Resume_2026.pdf";

// Temporarily hiding project screenshots to compare the layout without them.
const SHOW_PROJECT_IMAGES = false;

const CONTACT_ENDPOINT = "https://formspree.io/f/maqroyll";

const techs = [
  { Icon: SiReact, label: "React" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: IoLogoNodejs, label: "Node.js" },
  { Icon: SiExpress, label: "Express" },
  { Icon: SiPostgresql, label: "PostgreSQL" },
  { Icon: SiPrisma, label: "Prisma" },
  { Icon: FaJava, label: "Java" },
  { Icon: SiPython, label: "Python" },
  { Icon: SiKubernetes, label: "Kubernetes" },
  { Icon: SiDocker, label: "Docker" },
  { Icon: SiAmazon, label: "AWS" },
  { Icon: SiApachespark, label: "Spark" },
  { Icon: SiTailwindcss, label: "Tailwind" },
  { Icon: SiVite, label: "Vite" },
];

const experiences = [
  {
    position: "Software Engineer Intern",
    company: "Salesforce — Spark Platform",
    duration: "May – Aug 2026",
    description:
      "Returned to Salesforce in San Francisco on the Spark platform team within Hyperforce Platform Services Cloud. Cut Spark logging costs by ~$300K/month by shipping a log-search REST API that streams, decompresses, and greps gzipped logs from AWS S3, replacing the team's Splunk pipeline. Exposed it as an MCP tool over an Envoy service-mesh mTLS connection so an AI agent could autonomously diagnose Spark job failures, root-caused a Kubernetes ambiguous-selector bug to restore autoscaling on the Spark History Server, and shipped a Claude Code plugin bundling 4 MCP servers and 7 skills.",
    tags: ["Kubernetes", "Helm", "Docker", "AWS (S3)", "Apache Spark", "MCP", "Envoy / mTLS"],
  },
  {
    position: "Software Engineering Intern",
    company: "Salesforce — FTL Program",
    duration: "Jun – Aug 2025",
    description:
      "As a Full Stack Intern at Salesforce and part of the FTL program, I developed Codifica, an AI-powered in-browser code editor designed to enhance learning accessibility by explaining coding concepts in users' native language.",
    tags: ["React", "Node.js", "Express", "Prisma", "PostgreSQL"],
  },
  {
    position: "Director of Digital Media",
    company: "INIT",
    duration: "Dec 2025 – present",
    description:
      "In charge of photography and videography for the largest tech organization at Florida International University.",
    tags: [],
  },
  {
    position: "INIT Build",
    company: "INIT",
    duration: "Feb – Apr 2025",
    description:
      "Collaborated on a 7-person team to build CreatorsFIU, a full-stack student marketplace. Led user authentication with Firebase and developed the responsive front-end with React and Tailwind CSS.",
    tags: ["React", "Firebase", "Tailwind"],
  },
  {
    position: "STARS Tutor",
    company: "Florida International University",
    duration: "Aug 2025 – present",
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
      "A RAG pipeline that retrieves context-aware information from any GitHub repository. Paste a URL and RepoAI clones, parses, and indexes the codebase so you can query it in plain English, no grepping, no reading walls of code.",
    keypoints: [
      "Clones and parses repos with Tree-sitter for language-aware, chunk-level analysis.",
      "Embeds chunks via OpenAI and stores vectors in Pinecone for semantic retrieval.",
      "FastAPI backend with /ingest and /query endpoints; a React 19 + TypeScript frontend.",
    ],
    github: "https://github.com/Luimoe05/repo-ai",
    deployed: "https://repo-ai-six.vercel.app/",
    image: RepoAIShot,
  },
  {
    name: "Codifica",
    stack: "React · Express · Node · Prisma · PostgreSQL · Tailwind",
    description:
      "A full-stack in-browser IDE aimed at making programming accessible to non-native English speakers, with AI-powered multilingual support.",
    keypoints: [
      "In-browser IDE built on Judge0 and CodeMirror, supporting 3+ languages.",
      "Gemini-powered assistant for personalized, multilingual explanations.",
      "35% improvement in AI response time from feedback across 30+ users.",
    ],
    github: "https://github.com/FTLSunstack/FTLCapstone",
    image: CodificaShot,
  },
  {
    name: "CreatorsFIU",
    stack: "React · TailwindCSS · Firebase · MongoDB",
    description:
      "A full-stack student marketplace for university students to buy and sell school-related items, built with a 7-person team.",
    keypoints: [
      "15+ reusable React components for listings and profiles.",
      "Firebase authentication with a 30% login-speed improvement.",
      "Authored 20+ user stories to guide development sprints.",
    ],
    github: "https://github.com/CreatorsFIU-initBuild/demoDAY",
    image: CreatorsShot,
  },
];

const posts = [
  {
    title: "Summer 2026 at Salesforce",
    blurb:
      "Returning to San Francisco a second time, and finding that AI agents had quietly rewritten the craft.",
    date: "July 2026",
    to: "/summer-2026",
  },
  {
    title: "Summer 2025 in San Francisco",
    blurb:
      "My time interning at Salesforce through the FTL program: the highs, the nerves, and building from zero.",
    date: "August 2025",
    to: "/summer",
  },
];

/* ── Building blocks ─────────────────────────────────────────────────────
   Full-bleed bands alternating white and grey (black and near-black in dark
   mode), a 980px content column, and Apple's "Learn more ›" text link.
   Cards take the opposite tone of their band: `bg-card` on grey bands,
   `bg-card-2` on white ones. */

const bandTone = {
  white: "bg-canvas text-ink",
  mist: "bg-mist text-ink",
};

function Band({ id, tone = "white", className = "", children }) {
  return (
    <section id={id} className={`${bandTone[tone]} px-6 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-[980px]">{children}</div>
    </section>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <AnimateIn className="mb-10 md:mb-14">
      <h2 className="text-[40px] leading-[1.1] font-semibold tracking-[-0.015em] md:text-[56px] md:leading-[1.07]">
        {children}
      </h2>
      {sub && (
        <p className="mt-3 max-w-[620px] text-[19px] leading-snug text-ink-2 md:text-[21px]">
          {sub}
        </p>
      )}
    </AnimateIn>
  );
}

function MoreLink({ href, to, children, external = true }) {
  const cls = "group inline-flex items-center gap-0.5 text-[17px] text-link hover:underline";
  const inner = (
    <>
      {children}
      <ChevronRight
        className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5"
        strokeWidth={2}
        aria-hidden="true"
      />
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {inner}
    </a>
  );
}

const pillCls =
  "inline-flex items-center justify-center gap-2 rounded-full bg-blue px-[22px] py-3 text-[17px] text-white transition-colors hover:bg-blue-hover disabled:cursor-default disabled:opacity-60";

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const inputCls =
    "w-full rounded-xl border border-field bg-canvas px-4 py-3.5 text-[17px] text-ink outline-none transition placeholder:text-ink-2 focus:border-blue focus:ring-4 focus:ring-blue/15";

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="text-center text-[21px] text-ink">
        Message received. I'll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-[560px] flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input name="name" required aria-label="Your name" placeholder="Name" className={inputCls} />
        <input name="email" type="email" required aria-label="Your email" placeholder="Email" className={inputCls} />
      </div>
      <textarea
        name="message"
        required
        rows={5}
        aria-label="Your message"
        placeholder="What's on your mind?"
        className={`${inputCls} resize-none`}
      />
      <div className="mt-3 flex flex-col items-center gap-3">
        <button type="submit" disabled={status === "sending"} className={`${pillCls} cursor-pointer`}>
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending
            </>
          ) : (
            "Send message"
          )}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-danger">
            That didn't go through. Email me directly instead.
          </p>
        )}
      </div>
    </form>
  );
}

const highlights = [
  { value: "2×", label: "software engineering internships at Salesforce, San Francisco" },
  { value: "3.61", label: "GPA, B.S. Computer Science at Florida International University" },
  { value: "2027", label: "graduating in May with a B.S. in Computer Science" },
];

export default function MainPage() {
  const [featured, ...rest] = experiences;

  return (
    <main id="content" tabIndex={-1} className="outline-none">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section id="top" className="bg-canvas px-6 pt-16 pb-20 text-center md:pt-28 md:pb-28">
        <AnimateIn>
          <p className="text-[17px] font-semibold text-flag md:text-[21px]">
            Previously Software Engineer Intern at Salesforce
          </p>
          <h1 className="mt-2 text-[48px] leading-[1.05] font-semibold tracking-[-0.015em] sm:text-[64px] md:text-[80px]">
            Luis-Angel Moreno
          </h1>
          <p className="mx-auto mt-4 max-w-[680px] text-[21px] leading-[1.19] text-ink-2 md:text-[28px] md:leading-[1.14]">
            I built platform tooling at Salesforce. Now I build apps that make
            hard systems easy to use.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a href={ResumePDF} target="_blank" rel="noreferrer" className={pillCls}>
              View résumé
            </a>
            <MoreLink href="https://github.com/Luimoe05">GitHub</MoreLink>
            <MoreLink href="https://www.linkedin.com/in/luisanm/">LinkedIn</MoreLink>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <dl className="mx-auto mt-20 grid max-w-[980px] gap-10 border-t border-line pt-12 sm:grid-cols-3 sm:gap-6 md:mt-24">
            {highlights.map(({ value, label }) => (
              // Label first in the DOM so a screen reader hears the label, then
              // the figure; flex-col-reverse puts the figure on top visually.
              <div key={value} className="flex flex-col-reverse">
                <dt className="mx-auto mt-3 max-w-[240px] text-[15px] leading-snug text-ink-2">
                  {label}
                </dt>
                <dd className="text-[48px] leading-none font-semibold tracking-[-0.015em] md:text-[56px]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </AnimateIn>
      </section>

      {/* ── Experience ───────────────────────────────────────────────── */}
      <Band id="experience" tone="mist">
        <SectionTitle sub="Platform engineering at Salesforce, plus the communities I help run at FIU.">
          Experience.
        </SectionTitle>

        <AnimateIn>
          <article className="rounded-[28px] bg-card p-8 md:p-12">
            <p className="text-[15px] font-semibold text-flag">Latest</p>
            <h3 className="mt-1 text-[28px] leading-tight font-semibold tracking-[-0.01em] md:text-[40px]">
              {featured.position}
            </h3>
            <p className="mt-2 text-[17px] text-ink-2">
              {featured.company} · {featured.duration}
            </p>
            <p className="mt-6 max-w-[760px] text-[17px] leading-relaxed">{featured.description}</p>
            <p className="mt-6 text-sm text-ink-2">{featured.tags.join(" · ")}</p>
          </article>
        </AnimateIn>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((exp, i) => (
            <AnimateIn key={exp.position} delay={0.06 * (i % 2)}>
              <article className="flex h-full flex-col rounded-[28px] bg-card p-8">
                <p className="text-sm text-ink-2">{exp.duration}</p>
                <h3 className="mt-1 text-[24px] leading-tight font-semibold tracking-[-0.01em]">
                  {exp.position}
                </h3>
                <p className="mt-1 text-[17px] text-ink-2">{exp.company}</p>
                <p className="mt-4 text-[15px] leading-relaxed">{exp.description}</p>
                {exp.tags.length > 0 && (
                  <p className="mt-auto pt-5 text-sm text-ink-2">{exp.tags.join(" · ")}</p>
                )}
              </article>
            </AnimateIn>
          ))}
        </div>
      </Band>

      {/* ── Selected Work ────────────────────────────────────────────── */}
      <Band id="work" tone="white">
        <SectionTitle sub="Things I've designed, built, and shipped end to end.">
          Selected work.
        </SectionTitle>

        <div className="flex flex-col gap-5">
          {projects.map((proj) => (
            <AnimateIn key={proj.name}>
              <article className="overflow-hidden rounded-[28px] bg-card-2 text-center">
                <div className="px-8 pt-12 pb-12 md:px-16 md:pt-16 md:pb-16">
                  <h3 className="text-[40px] leading-tight font-semibold tracking-[-0.015em] md:text-[48px]">
                    {proj.name}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[640px] text-[19px] leading-snug md:text-[21px]">
                    {proj.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                    {proj.deployed && (
                      <MoreLink href={proj.deployed}>
                        Visit site
                      </MoreLink>
                    )}
                    <MoreLink href={proj.github}>
                      View code
                    </MoreLink>
                  </div>

                  <ul className="mx-auto mt-10 grid max-w-[820px] gap-6 text-left sm:grid-cols-3">
                    {proj.keypoints.map((pt) => (
                      <li key={pt} className="border-t border-line pt-4 text-sm leading-relaxed text-ink-2">
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-xs text-ink-2">{proj.stack}</p>
                </div>

                {SHOW_PROJECT_IMAGES && (
                  <img
                    src={proj.image}
                    alt={`${proj.name} screenshot`}
                    loading="lazy"
                    className="mx-auto mb-10 block w-[88%] rounded-2xl md:mb-12"
                  />
                )}
              </article>
            </AnimateIn>
          ))}
        </div>
      </Band>

      {/* ── Toolkit ──────────────────────────────────────────────────── */}
      <Band id="toolkit" tone="mist">
        <SectionTitle sub="The languages, frameworks, and infrastructure I reach for.">
          Toolkit.
        </SectionTitle>

        <AnimateIn>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {techs.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-card px-2 py-6"
              >
                <Icon size={28} aria-hidden="true" />
                <span className="text-[13px]">{label}</span>
              </li>
            ))}
          </ul>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <article className="mt-5 rounded-[28px] bg-card p-8 md:p-12">
            <p className="text-[15px] font-semibold text-flag">Education</p>
            <h3 className="mt-1 text-[28px] leading-tight font-semibold tracking-[-0.01em] md:text-[32px]">
              Florida International University
            </h3>
            <p className="mt-2 text-[17px] text-ink-2">
              B.S. Computer Science · GPA 3.61 · Graduating May 2027
            </p>
            <p className="mt-4 text-[17px]">
              Data Structures & Algorithms · Systems Programming · Artificial
              Intelligence Algorithms
            </p>
          </article>
        </AnimateIn>
      </Band>

      {/* ── Writing ──────────────────────────────────────────────────── */}
      <Band id="writing" tone="white">
        <SectionTitle sub="Notes from two summers in San Francisco.">Writing.</SectionTitle>

        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post, i) => (
            <AnimateIn key={post.title} delay={0.06 * i}>
              <Link
                to={post.to}
                className="group flex h-full flex-col rounded-[28px] bg-card-2 p-8 transition duration-500 ease-apple hover:shadow-[0_8px_30px_rgb(0_0_0/0.08)] motion-safe:hover:scale-[1.015] md:p-10"
              >
                <p className="text-sm text-ink-2">{post.date}</p>
                <h3 className="mt-2 text-[28px] leading-tight font-semibold tracking-[-0.01em]">
                  {post.title}
                </h3>
                <p className="mt-3 text-[17px] leading-relaxed text-ink-2">{post.blurb}</p>
                <span className="mt-auto inline-flex items-center gap-0.5 pt-6 text-[17px] text-link group-hover:underline">
                  Read more
                  <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-2">More entries soon.</p>
      </Band>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <Band id="contact" tone="mist" className="text-center">
        <AnimateIn>
          <h2 className="text-[40px] leading-[1.1] font-semibold tracking-[-0.015em] md:text-[56px] md:leading-[1.07]">
            Let's talk.
          </h2>
          <p className="mx-auto mt-3 mb-10 max-w-[560px] text-[19px] leading-snug text-ink-2 md:text-[21px]">
            A question, an opportunity, or just hello. Send a note, or email{" "}
            <a href="mailto:lmoreno00528@gmail.com" className="text-link hover:underline">
              lmoreno00528@gmail.com
            </a>
            .
          </p>
          <ContactForm />
        </AnimateIn>
      </Band>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="bg-canvas px-6 py-8 text-xs text-ink-2">
        <div className="mx-auto flex max-w-[980px] flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} Luis-Angel Moreno. All rights reserved.</p>
          <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-4 gap-y-1">
            <a href="https://github.com/Luimoe05" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
            <a href="https://www.linkedin.com/in/luisanm/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
            <a href="mailto:lmoreno00528@gmail.com" className="hover:underline">Email</a>
            <a href={ResumePDF} target="_blank" rel="noreferrer" className="hover:underline">Résumé</a>
          </nav>
          <LocalClock />
        </div>
      </footer>
    </main>
  );
}
