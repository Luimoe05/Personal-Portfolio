import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  X,
  ArrowUpRight,
  Send,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence, animate, useInView } from "framer-motion";
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
import salesforceOfferImg from "../assets/salesforce-offer.webp";
import ResumePDF from "../assets/Luis_Resume_2026.pdf";

const CONTACT_ENDPOINT = "https://formspree.io/f/maqroyll";

const NAV = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Selected Work" },
  { id: "toolkit", label: "Toolkit" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

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
    duration: "May 2026 – Aug 2026",
    description:
      "Returning to Salesforce in San Francisco on the Spark platform team. Cut Spark logging costs by ~$300K/month by shipping a log-search REST API that streams, decompresses, and greps gzipped logs from AWS S3, replacing the team's Splunk pipeline. Exposed it as an MCP tool over an Envoy service-mesh mTLS connection so an AI agent could autonomously diagnose Spark job failures, root-caused a Kubernetes ambiguous-selector bug to restore autoscaling on the Spark History Server, and shipped a Claude Code plugin bundling 4 MCP servers and 7 skills.",
    tags: ["Kubernetes", "Helm", "Docker", "AWS (S3)", "Apache Spark", "MCP", "Envoy / mTLS"],
  },
  {
    position: "Software Engineering Intern",
    company: "Salesforce — FTL Program",
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

/* Vertical section nav with an animated leading rule (desktop identity panel) */
function SideNav() {
  const [active, setActive] = useState("experience");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.5, 1] }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="flex flex-col gap-3.5">
      {NAV.map(({ id, label }) => {
        const on = active === id;
        return (
          <button
            key={id}
            onClick={() =>
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-4 cursor-pointer"
          >
            <span
              className="h-px bg-current transition-all duration-300 ease-out"
              style={{
                width: on ? "2.75rem" : "1.25rem",
                color: on ? "var(--accent)" : "var(--faint)",
                opacity: on ? 1 : 0.6,
              }}
            />
            <span
              className={`text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                on ? "txt-accent" : "txt-faint group-hover:txt-muted"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
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
    { label: "Repositories", value: stats.repos },
    { label: "Contributions", value: stats.contributions },
    { label: "Stars", value: stats.stars },
  ];
  return (
    <div className="grid grid-cols-3 border-y rule-c">
      {items.map((it, i) => (
        <div
          key={it.label}
          className={`flex flex-col gap-1 py-5 ${i > 0 ? "border-l rule-c pl-5" : ""}`}
        >
          <span className="font-display text-3xl">
            <CountUp value={it.value} />
          </span>
          <span className="eyebrow text-[10px]">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const inputCls =
    "w-full rounded-lg border rule-c px-3.5 py-2.5 text-sm bg-transparent outline-none transition-colors placeholder:txt-faint focus:border-[color:var(--accent-line)]";

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
      <p className="txt-muted">
        Thank you for reaching out. I'll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-lg">
      <div className="flex flex-col sm:flex-row gap-3">
        <input name="name" required placeholder="Name" className={inputCls} />
        <input name="email" type="email" required placeholder="Email" className={inputCls} />
      </div>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="What's on your mind?"
        className={`${inputCls} resize-none`}
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-accent inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full cursor-pointer disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send message
            </>
          )}
        </button>
        {status === "error" && (
          <span className="text-xs text-red-400">
            Something went wrong, email me directly instead.
          </span>
        )}
      </div>
    </form>
  );
}

/* Quiet label that sits above each content section */
function Label({ children }) {
  return <p className="eyebrow mb-7">{children}</p>;
}

export default function MainPage() {
  const [resumeOpen, setResumeOpen] = useState(false);

  const socials = (
    <div className="flex items-center gap-5">
      <a href="https://github.com/Luimoe05" target="_blank" rel="noreferrer" aria-label="GitHub" className="icon-link">
        <Github className="w-5 h-5" />
      </a>
      <a href="https://www.linkedin.com/in/luisanm/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="icon-link">
        <Linkedin className="w-5 h-5" />
      </a>
      <a href="mailto:lmoreno00528@gmail.com" aria-label="Email" className="icon-link">
        <Mail className="w-5 h-5" />
      </a>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-10 lg:grid lg:grid-cols-[18rem_1fr] lg:gap-16 xl:gap-24">
      {/* ── Identity panel (sticky on desktop) ───────────────────────── */}
      <header className="pt-20 pb-10 lg:pt-0 lg:pb-0 lg:h-screen lg:sticky lg:top-0 lg:flex lg:flex-col lg:justify-between lg:py-24">
        <AnimateIn>
          <div>
            <p className="eyebrow flex items-center gap-2.5">
              <span className="dot-live" />
              Salesforce · Summer 2026
            </p>
            <h1
              className="font-display mt-6 leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 4vw + 1rem, 3.25rem)", letterSpacing: "-0.015em" }}
            >
              Luis-Angel
              <br />
              Moreno
            </h1>
            <p className="mt-4 text-lg txt-muted">Software Engineer</p>
            <p className="mt-4 txt-muted leading-relaxed max-w-[17rem]">
              I build tools that make hard systems legible, and applications
              that serve communities.
            </p>

            <div className="hidden lg:block mt-12">
              <SideNav />
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div className="mt-10 lg:mt-0 flex items-center gap-6">
            {socials}
            <button
              onClick={() => setResumeOpen(true)}
              className="text-sm txt-muted hover:txt-accent transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              Résumé <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </AnimateIn>
      </header>

      {/* ── Content column ───────────────────────────────────────────── */}
      <main className="pb-24 lg:py-24">
        {/* Experience */}
        <section id="experience" className="scroll-mt-24">
          <Label>Experience</Label>
          <div className="flex flex-col">
            {experiences.map((exp, i) => (
              <AnimateIn key={i} delay={0.03 * i}>
                <div
                  className={`grid sm:grid-cols-[1fr_auto] gap-x-8 gap-y-1 py-7 first:pt-0 ${
                    i < experiences.length - 1 ? "border-b rule-c" : ""
                  }`}
                >
                  <div className="order-2 sm:order-1">
                    <h3 className="font-display text-xl sm:text-2xl">
                      {exp.position}
                    </h3>
                    <p className="text-sm txt-faint mt-1">{exp.company}</p>
                    <p className="txt-muted leading-relaxed mt-3">
                      {exp.description}
                    </p>
                    {exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="chip text-[11px] px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="order-1 sm:order-2 text-xs txt-faint tabular-nums sm:text-right sm:pt-2">
                    {exp.duration}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </section>

        {/* Selected Work */}
        <section id="projects" className="scroll-mt-24 mt-20 lg:mt-28">
          <Label>Selected Work</Label>
          <div className="flex flex-col">
            {projects.map((proj, i) => (
              <AnimateIn key={i} delay={0.03 * i}>
                <article
                  className={`py-10 first:pt-0 ${
                    i < projects.length - 1 ? "border-b rule-c" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl sm:text-3xl">
                      {proj.name}
                    </h3>
                    <div className="flex items-center gap-4 shrink-0 pt-1.5 text-sm">
                      <a href={proj.github} target="_blank" rel="noreferrer" className="icon-link inline-flex items-center gap-1">
                        Code <ExternalLink size={13} />
                      </a>
                      {proj.deployed && (
                        <a href={proj.deployed} target="_blank" rel="noreferrer" className="icon-link inline-flex items-center gap-1">
                          Live <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs txt-faint mt-2 tracking-wide">{proj.stack}</p>
                  <a
                    href={proj.deployed ?? proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-5 overflow-hidden rounded-xl border rule-c"
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
                        <span className="txt-accent mt-2.5 h-px w-3 shrink-0 bg-current" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </AnimateIn>
            ))}
          </div>
        </section>

        {/* Toolkit */}
        <section id="toolkit" className="scroll-mt-24 mt-20 lg:mt-28">
          <Label>Toolkit</Label>
          <AnimateIn>
            <div className="flex flex-wrap gap-2">
              {techs.map(({ Icon, label }) => (
                <span key={label} className="chip inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg">
                  <Icon size={15} className="txt-faint" />
                  {label}
                </span>
              ))}
            </div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="mt-9">
              <GitHubStats />
            </div>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div className="mt-10">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-xl">Florida International University</h3>
                <span className="text-xs txt-faint tabular-nums">2023 – Present</span>
              </div>
              <p className="txt-muted mt-2">B.S. Computer Science · GPA 3.61</p>
              <p className="text-sm txt-faint mt-2 leading-relaxed">
                Data Structures & Algorithms · Systems Programming · Artificial
                Intelligence Algorithms
              </p>
            </div>
          </AnimateIn>
        </section>

        {/* Writing */}
        <section id="writing" className="scroll-mt-24 mt-20 lg:mt-28">
          <Label>Writing</Label>
          <div className="flex flex-col">
            {posts.map((post, i) => (
              <AnimateIn key={post.title} delay={0.03 * i}>
                <Link
                  to={post.to}
                  className="group flex items-baseline justify-between gap-4 py-5 border-b rule-c first:pt-0"
                >
                  <div>
                    <h3 className="font-display text-xl group-hover:txt-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="txt-muted text-sm mt-1.5 leading-relaxed max-w-md">
                      {post.blurb}
                    </p>
                  </div>
                  <span className="text-xs txt-faint tabular-nums whitespace-nowrap shrink-0">
                    {post.date}
                  </span>
                </Link>
              </AnimateIn>
            ))}
            <p className="text-sm txt-faint mt-5">More writing to come.</p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 mt-20 lg:mt-28">
          <Label>Get in Touch</Label>
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

        {/* Footer */}
        <footer className="border-t rule-c pt-8 mt-20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <LocalClock subtle="txt-faint" />
          <p className="text-xs txt-faint">
            © {new Date().getFullYear()} Luis-Angel Moreno
          </p>
        </footer>
      </main>

      {/* ── Résumé modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setResumeOpen(false)}
          >
            <motion.div
              className="elevated relative w-full max-w-3xl h-[85vh] rounded-2xl overflow-hidden flex flex-col"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b rule-c shrink-0">
                <span className="eyebrow text-[11px]">Résumé</span>
                <div className="flex items-center gap-4">
                  <a
                    href={ResumePDF}
                    download="Luis_Resume_2026.pdf"
                    className="text-xs txt-muted hover:txt-accent transition-colors"
                  >
                    Download
                  </a>
                  <button onClick={() => setResumeOpen(false)} aria-label="Close" className="icon-link cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <iframe
                src={ResumePDF}
                title="Luis-Angel Moreno's Résumé"
                className="w-full grow bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
