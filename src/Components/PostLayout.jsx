import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// A raised, accent-barred extract — the one visual climax of a post.
export function PullQuote({ children }) {
  return (
    <figure className="post-rise my-9">
      <blockquote
        className="border-l-2 pl-5 font-display text-xl sm:text-2xl leading-snug tracking-tight"
        style={{ borderColor: "var(--accent)" }}
      >
        {children}
      </blockquote>
    </figure>
  );
}

// Shared "dispatch" layout for every blog post: a monospace dateline, a display
// title, a dek, a hairline, and a roomy long-form body. Content renders with a
// CSS entrance that always ends visible, so a post can never be left blank.
export default function PostLayout({
  meta = [],
  title,
  dek,
  children,
  backTo = "/",
}) {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-[680px] px-6 pb-24">
      <button
        onClick={() => navigate(backTo)}
        className="btn-quiet group mt-2 mb-10 inline-flex items-center gap-1.5 px-3 py-1.5 -ml-3"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Back to home
      </button>

      <header className="flex flex-col gap-5">
        {meta.length > 0 && (
          <p className="post-meta post-rise">
            {meta.join("   ·   ")}
          </p>
        )}
        <h1
          className="post-rise font-display text-4xl sm:text-5xl font-black tracking-tight"
          style={{ animationDelay: "0.05s" }}
        >
          {title}
        </h1>
        {dek && (
          <p
            className="post-rise text-lg sm:text-xl leading-relaxed txt-muted"
            style={{ animationDelay: "0.1s" }}
          >
            {dek}
          </p>
        )}
      </header>

      <hr className="my-8 rule-c" />

      <div
        className="post-body post-rise flex flex-col gap-6"
        style={{ animationDelay: "0.15s" }}
      >
        {children}
      </div>

      <hr className="mt-14 mb-6 rule-c" />
      <p className="post-meta" style={{ opacity: 0.55 }}>
        — Luis-Angel Moreno
      </p>
    </main>
  );
}
