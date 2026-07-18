import React from "react";
import PostLayout, { PullQuote } from "./PostLayout.jsx";

export default function Summer2026({ isDark }) {
  return (
    <PostLayout
      isDark={isDark}
      meta={["Jul 18, 2026", "San Francisco", "2 min read"]}
      title="Summer 2026 at Salesforce"
      dek="Returning to the city a second time — and finding the craft rewritten."
    >
      <p>
        Coming to San Francisco for a second time was nerve-racking. Interning
        in the city last year taught me a lot — it showed me how fast the
        industry evolves, and the immense concentration of extremely intelligent
        people packed all over the city. Even so, I didn't expect to be
        surprised by just how much things had changed.
      </p>

      <p>
        Driving into the city, I saw the huge influx of AI startups; almost
        every startup is now embracing this new phenomenon sweeping the tech
        industry. Before my first day, I was still in the limbo of the AI world
        — vaguely aware of things like Claude, Codex, and the rest, but not
        really living in it.
      </p>

      <p>
        But coming into that first day, that first week, I realized how deeply
        integrated AI agents have become in the average software engineer's
        workflow.
      </p>

      <PullQuote>
        Nearly every line of code is being written by AI agents — with you
        designing and orchestrating them to get the job done.
      </PullQuote>
    </PostLayout>
  );
}
