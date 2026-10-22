import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimateIn from "./AnimateIn";

// A large pulled line, set apart from the body by rules.
export function PullQuote({ children }) {
  return (
    <figure className="my-6 border-t-2 border-b border-t-ink border-b-line py-8">
      <blockquote className="text-h3 font-bold tracking-[-0.02em] text-ink">
        {children}
      </blockquote>
    </figure>
  );
}

// Shared long-form layout for every blog post: a small meta line, a big
// headline, a dek, then a narrow reading column.
// Paragraph and subhead styles are applied from here so the posts themselves
// stay plain JSX.
export default function PostLayout({ meta = [], title, dek, children, backTo = "/" }) {
  return (
    <main id="content" tabIndex={-1} className="bg-canvas px-6 pb-24 outline-none md:px-10">
      <div className="mx-auto max-w-[692px]">
        <Link
          to={backTo}
          className="group mt-10 inline-flex md:mt-14 items-center gap-1 text-small font-medium text-accent underline decoration-accent/35 underline-offset-4 hover:decoration-accent"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform motion-safe:group-hover:-translate-x-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
          Home
        </Link>

        <AnimateIn>
          <header className="pt-10 md:pt-14">
            {meta.length > 0 && (
              <p className="text-caption font-semibold tracking-[0.08em] text-ink-2 uppercase">
                {meta.join(" · ")}
              </p>
            )}
            <h1 className="mt-3 text-h2 font-bold tracking-[-0.025em]">
              {title}
            </h1>
            {dek && (
              <p className="mt-4 text-lead text-ink-2">{dek}</p>
            )}
          </header>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mt-12 flex flex-col gap-6 text-[1.1875rem] leading-[1.6] [&_h2]:mt-6 [&_h2]:text-h3 [&_h2]:font-bold [&_h2]:tracking-[-0.02em]">
            {children}
          </div>
        </AnimateIn>

        <p className="mt-14 border-t border-line pt-6 text-small text-ink-2">
          Luis-Angel Moreno
        </p>
      </div>
    </main>
  );
}
