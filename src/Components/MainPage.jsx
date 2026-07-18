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
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence, animate, useInView } from "framer-motion";
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
import { useNavigate } from "react-router-dom";
import codeyTheBearPicture from "../assets/image.webp";
import CodificaImg from "../assets/Codifica.webp";
import CreatorsFIUImg from "../assets/creatorsFIU.webp";
import RepoAI from "../assets/RepoAI.webp";
import ResumePDF from "../assets/Luis_Resume_2026.pdf";

const CONTACT_ENDPOINT = "https://formspree.io/f/maqroyll";

const ROLES = [
  "Software Developer",
  "SWE Intern @ Salesforce",
  "CS Student @ FIU",
  "CS Tutor",
];

const techs = [
  { Icon: SiReact, label: "React" },
  { Icon: SiTailwindcss, label: "Tailwind" },
  { Icon: SiVite, label: "Vite" },
  { Icon: IoLogoNodejs, label: "Node.js" },
  { Icon: SiExpress, label: "Express" },
  { Icon: SiPostgresql, label: "PostgreSQL" },
  { Icon: SiPrisma, label: "Prisma" },
  { Icon: FaJava, label: "Java" },
  { Icon: SiPython, label: "Python" },
  { Icon: SiTypescript, label: "TypeScript" },
  { Icon: SiKubernetes, label: "Kubernetes" },
  { Icon: SiDocker, label: "Docker" },
  { Icon: SiAmazon, label: "AWS" },
  { Icon: SiApachespark, label: "Spark" },
];

const experiences = [
  {
    position: "Software Engineer Intern",
    company: "Salesforce",
    duration: "May 2026 – Aug 2026",
    description:
      "Returning to Salesforce in San Francisco on the Spark platform team. Cut Spark logging costs by ~$300K/month by shipping a log-search REST API that streams, decompresses, and greps gzipped logs from AWS S3, replacing the team's Splunk pipeline. Exposed it as an MCP tool over an Envoy service-mesh mTLS connection so an AI agent could autonomously diagnose Spark job failures, root-caused a Kubernetes ambiguous-selector bug to restore autoscaling on the Spark History Server, and shipped a Claude Code plugin bundling 4 MCP servers and 7 skills.",
    tags: ["Kubernetes", "Helm", "Docker", "AWS (S3)", "Apache Spark", "MCP", "Envoy / mTLS"],
  },
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
    deployed: "https://repo-ai-six.vercel.app/",
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

const posts = [
  {
    title: "Summer 2025 in San Francisco",
    blurb:
      "My time interning at Salesforce through the FTL program — the highs, the nerves, and what I learned building from zero.",
    date: "Aug 2025",
    to: "/summer",
  },
];

/* Rotating role text in the hero */
function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ROLES.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-flex justify-center overflow-hidden h-5">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* Animated count-up that fires when scrolled into view */
function CountUp({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* Live GitHub stats pulled from public APIs */
function GitHubStats({ subtle, divider }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        // GitHub REST API for repos + languages; jogruber API for contributions
        const [user, repos, contrib] = await Promise.all([
          fetch("https://api.github.com/users/Luimoe05").then((r) => r.json()),
          fetch("https://api.github.com/users/Luimoe05/repos?per_page=100")
            .then((r) => r.json())
            .catch(() => []),
          fetch(
            "https://github-contributions-api.jogruber.de/v4/Luimoe05?y=last"
          )
            .then((r) => r.json())
            .catch(() => null),
        ]);
        if (!active) return;
        const stars = Array.isArray(repos)
          ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
          : 0;
        setStats({
          repos: user.public_repos ?? 0,
          stars,
          contributions: contrib?.total?.lastYear ?? 0,
        });
      } catch {
        /* silently ignore — section just won't render */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (!stats) return null;

  const items = [
    { label: "Repositories", value: stats.repos },
    { label: "Contributions", sub: "past year", value: stats.contributions },
    { label: "Stars", value: stats.stars },
  ];

  return (
    <div className={`grid grid-cols-3 gap-4 rounded-xl border p-4 ${divider}`}>
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center gap-0.5">
          <span
            className="text-xl sm:text-2xl font-display font-bold"
            style={{ color: "var(--accent)" }}
          >
            <CountUp value={it.value} />
          </span>
          <span className={`text-[11px] text-center ${subtle}`}>
            {it.label}
          </span>
          {it.sub && (
            <span className={`text-[9px] uppercase tracking-wide opacity-50`}>
              {it.sub}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* Project card with subtle mouse-tracking 3D tilt */
function ProjectCard({ proj, cardBg, subtle }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("");

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) scale(1.01)`
    );
  };
  const onLeave = () => setTransform("");

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transform, transition: "transform 0.2s ease" }}
      className={`project-card rounded-xl p-5 flex flex-col gap-3 ${cardBg}`}
    >
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
        <a href={proj.deployed ?? proj.github} target="_blank" rel="noreferrer">
          <img
            src={proj.img}
            alt={proj.name}
            className="w-full rounded-lg border border-zinc-200/30 hover:opacity-90 transition-opacity"
          />
        </a>
      )}
      <p className={`text-sm leading-relaxed ${subtle}`}>{proj.description}</p>
      <ul
        className={`text-xs leading-relaxed flex flex-col gap-1.5 list-disc list-inside ${subtle}`}
      >
        {proj.keypoints.map((pt, j) => (
          <li key={j}>{pt}</li>
        ))}
      </ul>
    </div>
  );
}

/* Contact form wired to Formspree */
function ContactForm({ isDark, subtle, divider }) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const inputCls = `w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none transition-colors ${
    isDark
      ? "border-zinc-700 focus:border-zinc-500"
      : "border-zinc-300 focus:border-zinc-500"
  }`;

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
      <div
        className={`flex flex-col items-center gap-2 rounded-xl border p-8 text-center ${divider}`}
      >
        <CheckCircle2 className="w-7 h-7" style={{ color: "var(--accent)" }} />
        <p className="text-sm font-medium">Thanks for reaching out!</p>
        <p className={`text-xs ${subtle}`}>I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input name="name" required placeholder="Name" className={inputCls} />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className={inputCls}
        />
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
          className={`inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border cursor-pointer transition-colors disabled:opacity-60 ${
            isDark
              ? "border-zinc-700 hover:bg-zinc-800"
              : "border-zinc-300 hover:bg-zinc-100"
          }`}
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
          <span className="text-xs text-red-500">
            Something went wrong — email me directly instead.
          </span>
        )}
      </div>
    </form>
  );
}

export default function MainPage({ isDark }) {
  const navigate = useNavigate();
  const [resumeOpen, setResumeOpen] = useState(false);
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
        className="relative flex flex-col items-center justify-center min-h-[60vh] py-16 text-center gap-4"
      >
        {/* Animated backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 hero-grid opacity-70" />
          <motion.div
            className="absolute left-1/2 top-[38%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "var(--accent)" }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.16, 0.26, 0.16] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[30%] top-[55%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "var(--accent)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08], x: [0, 20, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <AnimateIn delay={0.1}>
          <p
            className="text-xs uppercase tracking-widest font-semibold"
            style={{ color: "var(--accent)" }}
          >
            <RotatingRole />
          </p>
          <h1 className="name-shimmer font-display text-5xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight mt-2">
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
              University pursuing a BS in Computer Science (GPA: 3.61). I'm
              returning to Salesforce in Summer 2026 as a Software Engineer
              Intern on the Spark platform team.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.12}>
          <GitHubStats subtle={subtle} divider={divider} />
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
                  <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                    {exp.company}
                  </span>
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
                        backgroundColor:
                          "color-mix(in oklch, var(--accent) 10%, transparent)",
                        color: "var(--accent)",
                        border:
                          "1px solid color-mix(in oklch, var(--accent) 25%, transparent)",
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
            <ProjectCard proj={proj} cardBg={cardBg} subtle={subtle} />
          </AnimateIn>
        ))}
      </section>

      <hr className={divider} />

      {/* Writing */}
      <section id="writing" className="py-12 flex flex-col gap-6">
        <h2 className="text-xs uppercase tracking-widest opacity-40 font-medium">
          Writing
        </h2>
        {posts.map((post) => (
          <AnimateIn key={post.title} delay={0.1}>
            <button
              onClick={() => navigate(post.to)}
              className={`group w-full text-left rounded-xl p-5 border transition-colors cursor-pointer ${
                isDark
                  ? "border-zinc-800 hover:bg-zinc-900"
                  : "border-zinc-200 hover:bg-zinc-100"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold transition-transform duration-200 group-hover:translate-x-1.5">
                  {post.title}
                </span>
                <span className={`text-xs ${subtle} whitespace-nowrap`}>
                  {post.date}
                </span>
              </div>
              <p className={`text-sm mt-1.5 leading-relaxed ${subtle}`}>
                {post.blurb}
              </p>
              <span
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium"
                style={{ color: "var(--accent)" }}
              >
                Read more
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </AnimateIn>
        ))}
        <p className={`text-xs ${subtle}`}>More posts coming soon.</p>
      </section>

      <hr className={divider} />

      {/* Contact */}
      <section id="contact" className="py-12 flex flex-col gap-6">
        <h2 className="text-xs uppercase tracking-widest opacity-40 font-medium">
          Get in touch
        </h2>
        <p className={`text-sm leading-relaxed ${subtle}`}>
          Have a question, an opportunity, or just want to say hi? Drop me a
          message and I'll get back to you.
        </p>
        <ContactForm isDark={isDark} subtle={subtle} divider={divider} />
      </section>

      <hr className={divider} />

      {/* Resume */}
      <section className="py-12 flex flex-col items-center gap-6">
        <AnimateIn delay={0.1}>
          <button
            onClick={() => setResumeOpen(true)}
            className={`text-sm font-medium px-6 py-3 rounded-full border cursor-pointer transition-colors ${
              isDark
                ? "border-zinc-700 hover:bg-zinc-800"
                : "border-zinc-300 hover:bg-zinc-100"
            }`}
          >
            View Resume
          </button>
        </AnimateIn>
      </section>

      <footer className="pt-4 pb-2 flex flex-col items-center gap-1.5 text-center">
        <LocalClock subtle={subtle} />
        <p className={`text-[11px] ${subtle} opacity-60`}>
          © {new Date().getFullYear()} Luis-Angel Moreno
        </p>
      </footer>

      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setResumeOpen(false)}
          >
            <motion.div
              className={`relative w-full max-w-3xl h-[85vh] rounded-xl overflow-hidden flex flex-col ${
                isDark
                  ? "bg-zinc-900 border border-zinc-800"
                  : "bg-white border border-zinc-200"
              }`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`flex items-center justify-between px-4 py-3 border-b shrink-0 ${divider}`}
              >
                <span className="text-sm font-semibold">Resume</span>
                <div className="flex items-center gap-4">
                  <a
                    href={ResumePDF}
                    download="Luis_Resume_2026.pdf"
                    className={`text-xs ${subtle} hover:opacity-70 transition-opacity`}
                  >
                    Download
                  </a>
                  <button
                    onClick={() => setResumeOpen(false)}
                    aria-label="Close"
                    className="icon-link cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <iframe
                src={ResumePDF}
                title="Luis-Angel Moreno's Resume"
                className="w-full grow"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
