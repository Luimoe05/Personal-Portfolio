import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimateIn from "./AnimateIn";

export default function NotFound() {
  return (
    <main
      id="content"
      tabIndex={-1}
      className="mx-auto flex min-h-[80vh] max-w-[1120px] flex-col justify-center bg-canvas px-6 outline-none md:px-10"
    >
      <AnimateIn>
        <h1 className="text-h2 font-bold tracking-[-0.025em]">
          This page can't be found.
        </h1>
        <p className="mt-4 text-lead text-ink-2">
          It may have moved, or the link might be mistyped.
        </p>
        <Link
          to="/"
          className="group mt-8 inline-flex items-center gap-1 font-medium text-accent underline decoration-accent/35 underline-offset-4 hover:decoration-accent"
        >
          Back to home
          <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </Link>
      </AnimateIn>
    </main>
  );
}
