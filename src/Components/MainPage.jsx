import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  Send,
  Loader2,
} from "lucide-react";
import { animate, useInView } from "framer-motion";
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
import CodificaImg from "../assets/Codifica.webp";
import CreatorsFIUImg from "../assets/creatorsFIU.webp";
import RepoAI from "../assets/RepoAI.webp";
import ResumePDF from "../assets/Luis_Resume_2026.pdf";

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
    duration: "MAY 2026 — AUG 2026",
    description:
      "Returning to Salesforce in San Francisco on the Spark platform team. Cut Spark logging costs by ~$300K/month by shipping a log-search REST API that streams, decompresses, and greps gzipped logs from AWS S3, replacing the team's Splunk pipeline. Exposed it as an MCP tool over an Envoy service-mesh mTLS connection so an AI agent could autonomously diagnose Spark job failures, root-caused a Kubernetes ambiguous-selector bug to restore autoscaling on the Spark History Server, and shipped a Claude Code plugin bundling 4 MCP servers and 7 skills.",
    tags: ["Kubernetes", "Helm", "Docker", "AWS (S3)", "Apache Spark", "MCP", "Envoy / mTLS"],
  },
  {
    position: "Software Engineering Intern",
    company: "Salesforce — FTL Program",
    duration: "JUN 2025 — AUG 2025",
    description:
      "As a Full Stack Intern at Salesforce and part of the FTL program, I developed Codifica, an AI-powered in-browser code editor designed to enhance learning accessibility by explaining coding concepts in users' native language.",
    tags: ["React", "Node.js", "Express", "Prisma", "PostgreSQL"],
  },
  {
    position: "Director of Digital Media",
    company: "INIT",
    duration: "DEC 2025 — PRESENT",
    description:
      "In charge of photography and videography for the largest tech organization at Florida International University.",
    tags: [],
  },
  {
    position: "INIT Build",
    company: "INIT",
    duration: "FEB 2025 — APR 2025",
    description:
      "Collaborated on a 7-person team to build CreatorsFIU, a full-stack student marketplace. Led user authentication with Firebase and developed the responsive front-end with React and Tailwind CSS.",
    tags: ["React", "Firebase", "Tailwind"],
  },
  {
    position: "STARS Tutor",
    company: "Florida International University",
    duration: "AUG 2025 — PRESENT",
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
    img: RepoAI,
    github: "https://github.com/Luimoe05/repo-ai",
    deployed: "https://repo-ai-six.vercel.app/",
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
    img: CodificaImg,
    github: "https://github.com/FTLSunstack/FTLCapstone",
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
    img: CreatorsFIUImg,
    github: "https://github.com/CreatorsFIU-initBuild/demoDAY",
  },
];

const posts = [
  {
    title: "Summer 2026 at Salesforce",
    blurb:
      "Returning to San Francisco a second time, and finding that AI agents had quietly rewritten the craft.",
    date: "2026.07",
    to: "/summer-2026",
  },
  {
    title: "Summer 2025 in San Francisco",
    blurb:
      "My time interning at Salesforce through the FTL program: the highs, the nerves, and building from zero.",
    date: "2025.08",
    to: "/summer",
  },
];

/* Monospace text-scramble reveal — small terminal-flavored hero motion */
const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#0123456789";
function Scramble({ text, className = "", duration = 900, delay = 150 }) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(text);
      return;
    }
    let raf;
    let start = null;
    const step = (now) => {
      if (start === null) start = now;
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(step);
        return;
      }
      const p = Math.min(1, elapsed / duration);
      const revealed = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " " || i < revealed) out += ch;
        else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setDisplay(out);
      if (p < 1) raf = requestAnimationFrame(step);
      else setDisplay(text);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, duration, delay]);
  return (
    <span className={className}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/* Corner registration marks around a bordered box (the "lab" framing) */
function Framed({ children, className = "", pad = "p-6 sm:p-8" }) {
  const marks = [
    "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  ];
  return (
    <div className={`relative border rule-c ${className}`}>
      {marks.map((m) => (
        <span
          key={m}
          aria-hidden
          className={`absolute ${m} txt-faint text-[11px] leading-none select-none opacity-60`}
        >
          +
        </span>
      ))}
      <div className={pad}>{children}</div>
    </div>
  );
}

/* Mono section header: LABEL ———————— INDEX */
function SectionHead({ label, index }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <h2 className="eyebrow whitespace-nowrap">{label}</h2>
      <span className="h-px flex-1" style={{ background: "var(--line)" }} aria-hidden="true" />
      <span className="eyebrow txt-faint opacity-70" aria-hidden="true">
        {index}
      </span>
    </div>
  );
}

function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
    </span>
  );
}

function GitHubStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    let active = true;
    const CACHE_KEY = "gh-stats";
    let cached = null;
    try {
      cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    } catch {
      cached = null;
    }
    if (cached) setStats(cached);
    (async () => {
      try {
        const [user, repos, contrib] = await Promise.all([
          fetch("https://api.github.com/users/Luimoe05").then((r) => r.json()),
          fetch("https://api.github.com/users/Luimoe05/repos?per_page=100")
            .then((r) => r.json())
            .catch(() => []),
          fetch("https://github-contributions-api.jogruber.de/v4/Luimoe05?y=last")
            .then((r) => r.json())
            .catch(() => null),
        ]);
        if (!active) return;
        if (user.public_repos == null) return;
        const stars = Array.isArray(repos)
          ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
          : cached?.stars ?? 0;
        const fresh = {
          repos: user.public_repos,
          stars,
          contributions: contrib?.total?.lastYear ?? cached?.contributions ?? 0,
        };
        setStats(fresh);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(fresh));
        } catch {
          /* non-fatal */
        }
      } catch {
        /* keep cached */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (!stats) return null;
  const items = [
    { label: "REPOSITORIES", value: stats.repos },
    { label: "CONTRIBUTIONS · 1Y", value: stats.contributions },
    { label: "STARS", value: stats.stars },
  ];
  return (
    <div className="grid grid-cols-3 border rule-c">
      {items.map((it, i) => (
        <div key={it.label} className={`px-4 py-5 ${i > 0 ? "border-l rule-c" : ""}`}>
          <div className="font-display text-2xl sm:text-3xl">
            <CountUp value={it.value} />
          </div>
          <div className="eyebrow text-[9px] mt-1.5">{it.label}</div>
        </div>
      ))}
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const inputCls =
    "w-full rounded-[3px] border rule-c px-3.5 py-2.5 text-sm bg-transparent outline-none transition-colors placeholder:txt-faint focus:border-[color:var(--accent-line)]";

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
    return <p className="txt-muted">Message received. I'll be in touch soon.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-lg">
      <div className="flex flex-col sm:flex-row gap-3">
        <input name="name" required aria-label="Your name" placeholder="Name" className={inputCls} />
        <input name="email" type="email" required aria-label="Your email" placeholder="Email" className={inputCls} />
      </div>
      <textarea
        name="message"
        required
        rows={4}
        aria-label="Your message"
        placeholder="What's on your mind?"
        className={`${inputCls} resize-none`}
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-[3px] cursor-pointer disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" /> Send message
            </>
          )}
        </button>
        {status === "error" && (
          <span className="mono text-[11px] text-red-400">
            ERROR — EMAIL ME DIRECTLY
          </span>
        )}
      </div>
    </form>
  );
}

export default function MainPage() {
  return (
    <main id="content" tabIndex={-1} className="max-w-5xl mx-auto px-5 sm:px-8 pb-24 outline-none">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section id="top" className="pt-10 sm:pt-16 pb-16 sm:pb-24">
        <AnimateIn>
          <Framed pad="p-7 sm:p-12">
            <p className="eyebrow flex items-center gap-2.5">
              <span className="dot-live" />
              <Scramble text="Returning to Salesforce / Summer 2026" />
            </p>
            <h1 className="text-hero mt-6">
              Luis-Angel
              <br />
              Moreno
            </h1>
            <p className="mt-6 text-lg sm:text-xl txt-muted leading-relaxed max-w-2xl">
              Software engineer. I build platform tooling at Salesforce and
              applications that serve communities, the kind of work that makes
              hard systems legible.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={ResumePDF}
                target="_blank"
                rel="noreferrer"
                className="btn-accent inline-flex items-center gap-2 px-5 py-3 rounded-[3px]"
              >
                View résumé
              </a>
              <a
                href="https://github.com/Luimoe05"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost inline-flex items-center gap-2 px-4 py-3 rounded-[3px]"
              >
                GitHub <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center gap-4 pl-2">
                <a href="https://www.linkedin.com/in/luisanm/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-link">
                  <Linkedin className="w-[18px] h-[18px]" />
                </a>
                <a href="mailto:lmoreno00528@gmail.com" aria-label="Email" className="icon-link">
                  <Mail className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>
          </Framed>
        </AnimateIn>
        <div className="flex items-center justify-between mt-5 px-1">
          <p className="eyebrow">CS · Florida Int'l University</p>
          <LocalClock subtle="txt-faint" />
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────────────── */}
      <section id="experience" className="py-16 sm:py-24">
        <SectionHead label="Experience" index="01 / 05" />
        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <AnimateIn key={i} delay={0.03 * i}>
              <div className="grid sm:grid-cols-[9rem_1fr] gap-x-8 gap-y-2 py-8 first:pt-0">
                <p className="mono text-[11px] txt-faint tracking-[0.08em] sm:pt-1.5">
                  {exp.duration}
                </p>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl">
                    {exp.position}
                  </h3>
                  <p className="mono text-[11px] txt-accent tracking-wide mt-1.5">
                    {exp.company}
                  </p>
                  <p className="txt-muted leading-relaxed mt-3">{exp.description}</p>
                  {exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="chip px-2 py-0.5 rounded-[3px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── Selected Work ────────────────────────────────────────────── */}
      <section id="work" className="py-16 sm:py-24">
        <SectionHead label="Selected Work" index="02 / 05" />
        <div className="flex flex-col gap-8">
          {projects.map((proj, i) => (
            <AnimateIn key={i} delay={0.03 * i}>
              <Framed pad="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-[10px] mb-1.5">
                      PROJECT {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display text-2xl sm:text-3xl">{proj.name}</h3>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 pt-1">
                    <a href={proj.github} target="_blank" rel="noreferrer" className="mono-link">
                      Code
                    </a>
                    {proj.deployed && (
                      <a href={proj.deployed} target="_blank" rel="noreferrer" className="mono-link" data-on="true">
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>
                <p className="mono text-[11px] txt-faint mt-2 tracking-wide">{proj.stack}</p>
                <a
                  href={proj.deployed ?? proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-5 overflow-hidden border rule-c"
                >
                  <img
                    src={proj.img}
                    alt={`${proj.name} interface`}
                    className="w-full transition-transform duration-500 ease-out hover:scale-[1.02]"
                  />
                </a>
                <p className="txt-muted leading-relaxed mt-5 max-w-prose">
                  {proj.description}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {proj.keypoints.map((pt, j) => (
                    <li key={j} className="text-sm txt-muted leading-relaxed flex gap-3">
                      <span className="mono txt-accent text-[11px] mt-0.5 shrink-0">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Framed>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── Toolkit ──────────────────────────────────────────────────── */}
      <section id="toolkit" className="py-16 sm:py-24">
        <SectionHead label="Toolkit" index="03 / 05" />
        <AnimateIn>
          <div className="flex flex-wrap gap-2">
            {techs.map(({ Icon, label }) => (
              <span key={label} className="chip inline-flex items-center gap-2 px-3 py-1.5 rounded-[3px] text-[12px]">
                <Icon size={14} className="txt-faint" />
                {label}
              </span>
            ))}
          </div>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div className="mt-8">
            <GitHubStats />
          </div>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <div className="mt-8 grid sm:grid-cols-[9rem_1fr] gap-x-8 gap-y-2">
            <p className="mono text-[11px] txt-faint tracking-[0.08em] sm:pt-1">
              2023 — PRESENT
            </p>
            <div>
              <h3 className="font-display text-xl">Florida International University</h3>
              <p className="mono text-[11px] txt-accent mt-1.5">B.S. COMPUTER SCIENCE / GPA 3.61</p>
              <p className="txt-muted text-sm mt-2 leading-relaxed">
                Data Structures & Algorithms · Systems Programming · Artificial
                Intelligence Algorithms.
              </p>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ── Writing ──────────────────────────────────────────────────── */}
      <section id="writing" className="py-16 sm:py-24">
        <SectionHead label="Writing" index="04 / 05" />
        <div className="flex flex-col">
          {posts.map((post, i) => (
            <AnimateIn key={post.title} delay={0.03 * i}>
              <Link
                to={post.to}
                className="group grid sm:grid-cols-[9rem_1fr] gap-x-8 gap-y-2 py-7 first:pt-0"
              >
                <p className="mono text-[11px] txt-faint tracking-[0.08em] sm:pt-2 transition-colors duration-300 group-hover:txt-accent">
                  {post.date}
                </p>
                <div className="transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1.5">
                  <h3 className="font-display text-xl sm:text-2xl inline-flex items-center gap-2 transition-colors duration-300 group-hover:txt-accent">
                    {post.title}
                    <ArrowUpRight
                      className="w-5 h-5 shrink-0 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 motion-safe:-translate-x-2 motion-safe:group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </h3>
                  <p className="txt-muted text-sm mt-2.5 leading-relaxed max-w-md">
                    {post.blurb}
                  </p>
                </div>
              </Link>
            </AnimateIn>
          ))}
          <p className="mono text-[11px] txt-faint mt-8 tracking-wide">
            MORE ENTRIES SOON
          </p>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section id="contact" className="py-16 sm:py-24">
        <SectionHead label="Get in Touch" index="05 / 05" />
        <AnimateIn>
          <p className="txt-muted leading-relaxed max-w-prose mb-6">
            Have a question, an opportunity, or just want to say hello? Send a
            note, or email me at{" "}
            <a href="mailto:lmoreno00528@gmail.com" className="link">
              lmoreno00528@gmail.com
            </a>
            .
          </p>
          <ContactForm />
        </AnimateIn>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t rule-c pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <LocalClock subtle="txt-faint" />
        <p className="mono text-[11px] txt-faint tracking-wide">
          © {new Date().getFullYear()} LUIS-ANGEL MORENO
        </p>
      </footer>
    </main>
  );
}
