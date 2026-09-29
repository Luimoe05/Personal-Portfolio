import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import AnimateIn from "./AnimateIn";

// A large pulled line, set like the quotes in an Apple Newsroom story.
export function PullQuote({ children }) {
  return (
    <figure className="my-6 border-y border-line py-8">
      <blockquote className="text-[28px] leading-[1.2] font-semibold tracking-[-0.01em] text-ink">
        {children}
      </blockquote>
    </figure>
  );
}

// Shared long-form layout for every blog post, modelled on Apple Newsroom:
// a small category line, a big headline, a dek, then a narrow reading column.
// Paragraph and subhead styles are applied from here so the posts themselves
// stay plain JSX.
export default function PostLayout({ meta = [], title, dek, children, backTo = "/" }) {
  return (
    <main id="content" tabIndex={-1} className="bg-canvas px-6 pb-24 outline-none">
      <div className="mx-auto max-w-[692px]">
        <Link
          to={backTo}
          className="group mt-6 inline-flex items-center gap-0.5 text-[15px] text-link hover:underline"
        >
          <ChevronLeft
            className="h-4 w-4 transition-transform motion-safe:group-hover:-translate-x-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
          Home
        </Link>

        <AnimateIn>
          <header className="pt-10 md:pt-14">
            {meta.length > 0 && (
              <p className="text-xs font-semibold tracking-[0.06em] text-ink-2 uppercase">
                {meta.join(" · ")}
              </p>
            )}
            <h1 className="mt-3 text-[40px] leading-[1.1] font-bold tracking-[-0.015em] md:text-[48px] md:leading-[1.08]">
              {title}
            </h1>
            {dek && (
              <p className="mt-4 text-[21px] leading-[1.38] text-ink-2">{dek}</p>
            )}
          </header>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mt-12 flex flex-col gap-6 text-[19px] leading-[1.58] [&_h2]:mt-6 [&_h2]:text-[28px] [&_h2]:leading-tight [&_h2]:font-semibold [&_h2]:tracking-[-0.01em]">
            {children}
          </div>
        </AnimateIn>

        <p className="mt-14 border-t border-line pt-6 text-sm text-ink-2">
          Luis-Angel Moreno
        </p>
      </div>
    </main>
  );
}
