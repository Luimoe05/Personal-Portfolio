import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars -- `motion` is used via <motion.span> JSX tags below; this config lacks jsx-uses-vars
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import AnimateIn from "./AnimateIn";
import LocalClock from "./LocalClock";
import RepoAIShot from "../assets/RepoAI-current.webp";
import CodificaShot from "../assets/Codifica.webp";
import CreatorsShot from "../assets/creatorsFIU.webp";
import ResumePDF from "../assets/Luis_Resume_2026.pdf";

const CONTACT_ENDPOINT = "https://formspree.io/f/maqroyll";
const EMAIL = "lmoreno00528@gmail.com";

const toolkit = [
  { label: "Languages", items: ["TypeScript", "Java", "Python"] },
  { label: "Frontend", items: ["React", "Tailwind CSS", "Vite"] },
  { label: "Backend & data", items: ["Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB", "Prisma", "Firebase"] },
  { label: "AI & retrieval", items: ["OpenAI API", "Pinecone", "MCP"] },
  { label: "Platform & infrastructure", items: ["Kubernetes", "Helm", "Docker", "AWS", "Apache Spark", "Envoy"] },
];

// The latest role is featured on its own; the rest are listed newest first
// within each group.
const featured = {
  position: "Software Engineer Intern",
  company: "Salesforce, Spark Platform",
  duration: "May – Aug 2026",
  description:
    "Spark platform team within Hyperforce Platform Services Cloud, San Francisco. Second internship at Salesforce.",
  accomplishments: [
    "Contributed to a team effort that reduced Spark logging costs by ~$300K/month. Built a REST API to search gzipped logs in AWS S3 as part of the team's migration away from Splunk.",
    "Enabled AI agents to diagnose Spark job failures by exposing the API as an MCP tool over Envoy mTLS. Root-caused a Kubernetes selector bug to restore Spark History Server autoscaling.",
    "Shipped a Claude Code plugin bundling 4 MCP servers and 7 skills for developer workflows.",
  ],
  tags: ["Kubernetes", "Helm", "Docker", "AWS (S3)", "Apache Spark", "MCP", "Envoy / mTLS"],
};

const experienceGroups = [
  {
    label: "Engineering",
    entries: [
      {
        position: "Software Engineering Intern",
        company: "Salesforce, Future Force Tech Launchpad (FTL)",
        duration: "Jun – Aug 2025",
        description:
          "Built Codifica, a full-stack in-browser code editor that explains programming concepts in the user's native language (see Work).",
        tags: ["React", "Node.js", "Express", "Prisma", "PostgreSQL"],
      },
      {
        position: "Developer, INIT Build",
        company: "INIT, FIU",
        duration: "Feb – Apr 2025",
        description:
          "Built CreatorsFIU, a student marketplace, on a 7-person team. Led Firebase authentication and the responsive React and Tailwind front end.",
        tags: ["React", "Firebase", "Tailwind CSS"],
      },
    ],
  },
  {
    label: "Leadership & teaching",
    entries: [
      {
        position: "Director of Digital Media",
        company: "INIT, FIU's largest tech student organization",
        duration: "Dec 2025 – present",
        description: "Leads photography and videography for the organization's events and channels.",
      },
      {
        position: "STARS Tutor",
        company: "Florida International University",
        duration: "Aug 2025 – Apr 2026",
        description:
          "Tutored undergraduates in Data Structures & Algorithms, Systems Programming, Computer Architecture, and Java.",
      },
    ],
  },
];

const projects = [
  {
    name: "RepoAI",
    stack: ["React", "TypeScript", "Vite", "FastAPI", "OpenAI", "Pinecone", "Tree-sitter"],
    description:
      "Ask questions about any GitHub repository in plain English. Paste a URL and RepoAI clones, parses, and indexes the codebase for retrieval-augmented answers.",
    keypoints: [
      "Parses repos with Tree-sitter for language-aware, chunk-level analysis.",
      "Embeds chunks with OpenAI and stores vectors in Pinecone for semantic retrieval.",
      "FastAPI backend with /ingest and /query endpoints; React 19 and TypeScript frontend.",
    ],
    github: "https://github.com/Luimoe05/repo-ai",
    deployed: "https://repo-ai-six.vercel.app/",
    image: RepoAIShot,
    imageWidth: 1600,
    imageHeight: 1190,
  },
  {
    name: "Codifica",
    stack: ["React", "Express", "Node.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    description:
      "An in-browser IDE that makes programming accessible to non-native English speakers, with AI explanations in the learner's language.",
    keypoints: [
      "Runs code in 3+ languages on Judge0 and CodeMirror.",
      "Gemini-powered assistant for personalized, multilingual explanations.",
      "Cut AI response time 35% after feedback from 30+ users.",
    ],
    github: "https://github.com/FTLSunstack/FTLCapstone",
    image: CodificaShot,
    imageHeight: 837,
  },
  {
    name: "CreatorsFIU",
    stack: ["React", "Tailwind CSS", "Firebase", "MongoDB"],
    description:
      "A marketplace for FIU students to buy and sell school-related items, built with a 7-person team.",
    keypoints: [
      "15+ reusable React components for listings and profiles.",
      "Firebase authentication with a 30% faster login.",
      "Authored 20+ user stories to guide development sprints.",
    ],
    github: "https://github.com/CreatorsFIU-initBuild/demoDAY",
    image: CreatorsShot,
    imageHeight: 781,
  },
];

// Titles match the posts' own headlines and the command palette.
const posts = [
  {
    title: "Summer 2026 at Salesforce",
    blurb:
      "Returning to San Francisco a second time, and finding that AI agents had quietly rewritten the craft.",
    date: "Jul 2026",
    to: "/summer-2026",
  },
  {
    title: "Summer 2025 in San Francisco",
    blurb:
      "My first Salesforce internship through the FTL program: the highs, the nerves, and building from zero.",
    date: "Aug 2025",
    to: "/summer",
  },
];

const facts = [
  { label: "Degree", value: "B.S. Computer Science, FIU" },
  { label: "GPA", value: "3.61" },
  { label: "Graduating", value: "May 2027" },
  { label: "Based in", value: "Miami, FL" },
];

/* ── Building blocks ─────────────────────────────────────────────────────
   One 1120px column with a 24/40px gutter (matching the global nav).
   Sections are separated by hairline rules rather than alternating bands. */

const column = "mx-auto max-w-[1120px] px-6 md:px-10";

function Section({ id, title, sub, minor = false, children }) {
  // Major sections stack a large title over full-width content; minor ones
  // put a smaller title in a narrow left column, spec-sheet style.
  if (!minor) {
    return (
      <section id={id} className={`${column} py-16 md:py-24`}>
        <AnimateIn className="flex flex-col gap-3 border-t border-line pt-8 md:flex-row md:items-end md:justify-between md:pt-10">
          <h2 className="text-h2 font-bold tracking-[-0.025em]">{title}</h2>
          {sub && <p className="max-w-[44ch] text-small text-ink-2 md:text-right">{sub}</p>}
        </AnimateIn>
        <div className="mt-10 md:mt-12">{children}</div>
      </section>
    );
  }
  return (
    <section id={id} className={`${column} py-14 md:py-20`}>
      <div className="grid gap-8 border-t border-line pt-8 md:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] md:gap-10 md:pt-10">
        <AnimateIn>
          <h2 className="text-h3 font-bold tracking-[-0.02em]">{title}</h2>
          {sub && <p className="mt-3 max-w-[32ch] text-small text-ink-2">{sub}</p>}
        </AnimateIn>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function TextLink({ href, to, children, external = true }) {
  const cls =
    "group inline-flex items-center gap-1 font-medium text-accent underline decoration-accent/35 decoration-1 underline-offset-4 transition-colors hover:decoration-accent";
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
        <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
      {external && <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />}
    </a>
  );
}

const buttonCls =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold transition-colors disabled:cursor-default disabled:opacity-60";

function GroupLabel({ children }) {
  return (
    <h3 className="text-caption font-semibold tracking-[0.08em] text-ink-2 uppercase">{children}</h3>
  );
}

function Tags({ items }) {
  return <p className="mt-3 text-small text-ink-2">{items.join(" · ")}</p>;
}

function ContactForm() {
  const [status, setStatus] = useState("idle");
  const nameRef = useRef(null);
  const successButtonRef = useRef(null);
  useEffect(() => {
    if (status === "success") successButtonRef.current?.focus();
  }, [status]);
  const inputCls =
    "contact-field w-full rounded-lg border border-on-band/60 bg-canvas px-4 py-3.5 text-body text-ink outline-none transition placeholder:text-ink-2 focus:ring-4 focus:ring-on-band/40";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
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

  return (
    <div>
      <p role="status" aria-live="polite" aria-atomic="true" className={status === "success" ? "text-lead font-medium" : "sr-only"}>
        {status === "success" ? "Message received. I'll be in touch soon." : status === "sending" ? "Sending your message." : ""}
      </p>
      {status === "success" ? (
        <button
          ref={successButtonRef}
          type="button"
          className="mt-4 cursor-pointer font-medium underline underline-offset-4"
          onClick={() => {
            setStatus("idle");
            requestAnimationFrame(() => nameRef.current?.focus());
          }}
        >
          Send another message
        </button>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-small font-semibold">Name</label>
              <input ref={nameRef} id="contact-name" name="name" autoComplete="name" placeholder="Your name" required className={inputCls} />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-small font-semibold">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required className={inputCls} />
            </div>
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-2 block text-small font-semibold">Message</label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="The role or project you have in mind"
              className={`${inputCls} resize-none`}
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <button type="submit" disabled={status === "sending"} className={`${buttonCls} cursor-pointer bg-on-band text-band hover:bg-on-band/90`}>
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> Sending
                </>
              ) : (
                "Send message"
              )}
            </button>
            {status === "error" && (
              <p role="alert" className="rounded-lg bg-canvas px-3 py-2 text-small text-danger">
                That didn't go through. Try again or <a href={`mailto:${EMAIL}`} className="underline">email me directly</a>.
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

// The hero's live diagram: the request path from the 2026 Salesforce work.
// A packet steps down the line and lights each hop in turn, then loops.
// Reduced motion shows the diagram still, with no packet.
const flowSteps = [
  { title: "AI agent", detail: "Asks why a Spark job failed" },
  { title: "MCP tool", detail: "Served over Envoy mTLS" },
  { title: "Log search API", detail: "REST search over gzipped logs" },
  { title: "AWS S3", detail: "Team move off Splunk, ~$300K/month saved" },
];
const ROW = 72; // px per step; the packet's y offset is index × ROW

function RequestFlow({ reduce }) {
  // -1 is the pause between loops, with the packet hidden back at the top.
  const [step, setStep] = useState(-1);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setStep((s) => (s >= flowSteps.length - 1 ? -1 : s + 1)), 1100);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <figure aria-label="Diagram: an AI agent calls an MCP tool over Envoy mTLS, which queries a log search API backed by AWS S3.">
      <figcaption className="text-caption font-semibold tracking-[0.08em] text-ink-2 uppercase">
        Built at Salesforce, 2026
      </figcaption>
      <div className="relative mt-4">
        <span className="absolute top-9 bottom-9 left-[11px] w-px bg-line" aria-hidden="true" />
        {!reduce && (
          <motion.span
            className="absolute top-[31px] left-[7px] h-[9px] w-[9px] rounded-full bg-accent ring-4 ring-accent/20"
            animate={{ y: Math.max(step, 0) * ROW, opacity: step < 0 ? 0 : 1 }}
            transition={step <= 0 ? { duration: 0.25 } : { duration: 0.6, ease: EASE }}
            aria-hidden="true"
          />
        )}
        <ol>
          {flowSteps.map(({ title, detail }, i) => {
            const on = step === i;
            return (
              <li key={title} className="flex h-[72px] items-center gap-4">
                <span
                  className={`relative h-[9px] w-[9px] shrink-0 translate-x-[7px] rounded-full border transition-colors duration-300 ${
                    on ? "border-accent bg-accent" : "border-field bg-canvas"
                  }`}
                  aria-hidden="true"
                />
                <div
                  className={`ml-2 flex-1 rounded-full border px-5 py-2.5 transition-colors duration-300 ${
                    on ? "border-accent/40 bg-mist" : "border-line"
                  }`}
                >
                  <p className={`text-small font-semibold transition-colors duration-300 ${on ? "text-ink" : "text-ink-2"}`}>{title}</p>
                  <p className="text-caption text-ink-2">{detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}

// The landing animation, about one second end to end: the name rises out of
// a mask line by line, the copy and links follow, and the fact sheet draws
// its rule left to right before its rows settle in. Transforms and opacity
// only; reduced motion shows everything in place.
const EASE = [0.16, 1, 0.3, 1];

function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section id="top" className={`${column} pt-12 pb-6 md:pt-20 md:pb-10`}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end lg:gap-16">
        <div>
          <motion.p {...rise(0)} className="flex items-center gap-2.5 text-small font-semibold text-accent">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              {/* Three soft pings, then still: "available" without nagging. */}
              <span className="absolute inset-0 rounded-full bg-accent opacity-60 motion-safe:animate-ping motion-safe:[animation-iteration-count:3]" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to new-grad software engineering roles starting summer 2027
          </motion.p>
          <h1 className="mt-6 text-hero font-bold tracking-[-0.035em]">
            {["Luis-Angel", "Moreno"].map((line, i) => (
              // The padding keeps descenders inside the mask; the negative
              // margin gives the space back to the line below.
              <span key={line} className="-mb-[0.2em] block overflow-hidden pb-[0.2em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.08 + i * 0.09 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p {...rise(0.32)} className="mt-7 max-w-[40ch] text-lead text-ink-2">
            Two-time software engineering intern at Salesforce, most recently
            on the Spark platform team. I build platform tooling and AI-agent
            integrations that make hard systems easy to operate.
          </motion.p>
          <motion.div {...rise(0.42)} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a id="hero-resume" href={ResumePDF} target="_blank" rel="noreferrer" className={`${buttonCls} bg-accent text-on-accent hover:bg-accent-hover`}>
              View resume (PDF)
            </a>
            <TextLink href="https://github.com/Luimoe05">GitHub</TextLink>
            <TextLink href="https://www.linkedin.com/in/luisanm/">LinkedIn</TextLink>
          </motion.div>
        </div>

        <div className="flex flex-col gap-12">
          <motion.div {...rise(0.6)} className="hidden md:block">
            <RequestFlow reduce={reduce} />
          </motion.div>
          <div>
          <motion.div
            className="h-0.5 origin-left bg-ink"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
            aria-hidden="true"
          />
          <dl>
            {facts.map(({ label, value }, i) => (
              <motion.div
                key={label}
                {...rise(0.5 + i * 0.07)}
                className="flex items-baseline justify-between gap-6 border-b border-line py-3"
              >
                <dt className="text-caption font-semibold tracking-[0.08em] text-ink-2 uppercase">{label}</dt>
                <dd className="text-right text-small font-medium tabular-nums">{value}</dd>
              </motion.div>
            ))}
          </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function MainPage() {
  return (
    <main id="content" tabIndex={-1} className="outline-none">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Hero />

      {/* ── Experience ───────────────────────────────────────────────── */}
      <Section
        id="experience"
        title="Experience"
        sub="Platform engineering at Salesforce, plus teaching and leadership at FIU."
      >
        <AnimateIn>
          <article className="rounded-2xl bg-mist p-6 sm:p-8 md:p-10">
            <p className="text-small font-semibold text-accent">Latest</p>
            <h3 className="mt-2 text-h3 font-bold tracking-[-0.02em]">
              {featured.position}
            </h3>
            <p className="mt-2 text-ink-2">
              {featured.company} · <span className="tabular-nums">{featured.duration}</span>
            </p>
            <p className="mt-5 max-w-[68ch]">{featured.description}</p>
            <ul className="mt-4 max-w-[68ch] list-disc space-y-3 pl-5 marker:text-accent">
              {featured.accomplishments.map((accomplishment) => (
                <li key={accomplishment}>{accomplishment}</li>
              ))}
            </ul>
            <Tags items={featured.tags} />
          </article>
        </AnimateIn>

        {experienceGroups.map((group) => (
          <div key={group.label} className="mt-12">
            <GroupLabel>{group.label}</GroupLabel>
            <div className="mt-3 divide-y divide-line border-t border-line">
              {group.entries.map((exp) => (
                <article key={exp.position} className="grid gap-2 py-6 sm:grid-cols-[150px_1fr] sm:gap-8">
                  <p className="text-small text-ink-2 tabular-nums">{exp.duration}</p>
                  <div>
                    <h4 className="text-h4 font-semibold tracking-[-0.01em]">{exp.position}</h4>
                    <p className="mt-1 text-ink-2">{exp.company}</p>
                    <p className="mt-3 max-w-[65ch]">{exp.description}</p>
                    {exp.tags && <Tags items={exp.tags} />}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12">
          <GroupLabel>Education</GroupLabel>
          <article className="mt-3 grid gap-2 border-t border-line py-6 sm:grid-cols-[150px_1fr] sm:gap-8">
            <p className="text-small text-ink-2 tabular-nums">Graduating May 2027</p>
            <div>
              <h4 className="text-h4 font-semibold tracking-[-0.01em]">Florida International University</h4>
              <p className="mt-1 text-ink-2">B.S. Computer Science · GPA 3.61</p>
              <p className="mt-3 max-w-[65ch]">
                Coursework: Data Structures & Algorithms, Systems Programming,
                Artificial Intelligence Algorithms.
              </p>
            </div>
          </article>
        </div>
      </Section>

      {/* ── Work ─────────────────────────────────────────────────────── */}
      <Section id="work" title="Work" sub="Selected projects, from an AI code-search tool to full-stack apps.">
        <div className="flex flex-col gap-12 md:gap-16">
          {projects.map((proj, i) => (
            <AnimateIn key={proj.name}>
              <article className={i === 0
                ? "grid items-center gap-8 rounded-2xl bg-mist p-6 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:p-12"
                : "grid items-start gap-6 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-10"}>
                <div className={i === 0 ? "min-w-0" : "min-w-0 md:order-2"}>
                  {i === 0 && <p className="mb-2 text-small font-semibold text-accent">Featured project</p>}
                  <h3 className={i === 0
                    ? "text-h2 font-bold tracking-[-0.025em]"
                    : "text-h3 font-bold tracking-[-0.02em]"}>
                    {proj.name}
                  </h3>
                  <p className="mt-3 max-w-[60ch]">{proj.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                    {proj.deployed && <TextLink href={proj.deployed}>Live site</TextLink>}
                    <TextLink href={proj.github}>Source code</TextLink>
                  </div>
                  <ul className="mt-6 list-disc space-y-2 pl-5 text-small text-ink-2 marker:text-ink-2">
                    {proj.keypoints.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                  <Tags items={proj.stack} />
                </div>
                <img
                  src={proj.image}
                  width={proj.imageWidth ?? 1400}
                  height={proj.imageHeight}
                  alt={`${proj.name} application screenshot`}
                  loading="lazy"
                  decoding="async"
                  className={`block h-auto w-full rounded-xl border border-line ${i === 0 ? "" : "md:order-1"}`}
                />
              </article>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* ── Toolkit ──────────────────────────────────────────────────── */}
      <Section id="toolkit" title="Toolkit" sub="Languages and tools from my internships and projects." minor>
        <AnimateIn>
          <dl className="border-t border-line">
            {toolkit.map((group) => (
              <div key={group.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_1fr] sm:gap-8">
                <dt className="text-small font-semibold">{group.label}</dt>
                <dd className="text-ink-2">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </AnimateIn>
      </Section>

      {/* ── Writing ──────────────────────────────────────────────────── */}
      <Section id="writing" title="Writing" sub="Notes from two summers in San Francisco." minor>
        <AnimateIn>
          <ul className="border-t border-line">
            {posts.map((post) => (
              <li key={post.title} className="border-b border-line">
                <Link
                  to={post.to}
                  className="group grid gap-2 py-6 sm:grid-cols-[150px_1fr_auto] sm:gap-8"
                >
                  <p className="text-small text-ink-2 tabular-nums">{post.date}</p>
                  <div>
                    <h3 className="text-h4 font-semibold tracking-[-0.01em] decoration-accent decoration-2 underline-offset-4 group-hover:underline">
                      {post.title}
                    </h3>
                    <p className="mt-2 max-w-[60ch] text-ink-2">{post.blurb}</p>
                  </div>
                  <ArrowRight
                    className="hidden h-5 w-5 self-center text-accent transition-transform motion-safe:group-hover:translate-x-1 sm:block"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </AnimateIn>
      </Section>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section id="contact" className="bg-band text-on-band">
        <div className={`${column} grid gap-10 py-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:py-24`}>
          <AnimateIn>
            <h2 className="text-h2 font-bold tracking-[-0.025em]">Let's talk.</h2>
            <p className="mt-4 max-w-[36ch] text-lead text-on-band/85">
              Hiring for a 2027 new-grad role, or have a project in mind? Send a
              note here or email{" "}
              <a href={`mailto:${EMAIL}`} className="font-medium text-on-band underline underline-offset-4">
                {EMAIL}
              </a>
              .
            </p>
          </AnimateIn>
          <AnimateIn>
            <ContactForm />
          </AnimateIn>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className={`${column} py-8 text-caption text-ink-2`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Luis-Angel Moreno</p>
          <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-5 gap-y-1">
            <a href="https://github.com/Luimoe05" target="_blank" rel="noreferrer" className="hover:text-ink hover:underline">GitHub</a>
            <a href="https://www.linkedin.com/in/luisanm/" target="_blank" rel="noreferrer" className="hover:text-ink hover:underline">LinkedIn</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-ink hover:underline">Email</a>
            <a href={ResumePDF} target="_blank" rel="noreferrer" className="hover:text-ink hover:underline">Resume</a>
          </nav>
          <LocalClock />
        </div>
      </footer>
    </main>
  );
}
