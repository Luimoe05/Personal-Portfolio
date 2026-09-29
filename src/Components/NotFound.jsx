import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import AnimateIn from "./AnimateIn";

export default function NotFound() {
  return (
    <main
      id="content"
      tabIndex={-1}
      className="flex min-h-[80vh] flex-col items-center justify-center bg-canvas px-6 text-center outline-none"
    >
      <AnimateIn>
        <h1 className="text-[40px] leading-[1.1] font-semibold tracking-[-0.015em] md:text-[56px]">
          This page can't be found.
        </h1>
        <p className="mt-4 text-[21px] text-ink-2">
          It may have moved, or the link might be mistyped.
        </p>
        <Link
          to="/"
          className="group mt-8 inline-flex items-center gap-0.5 text-[17px] text-link hover:underline"
        >
          Back to home
          <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </Link>
      </AnimateIn>
    </main>
  );
}
