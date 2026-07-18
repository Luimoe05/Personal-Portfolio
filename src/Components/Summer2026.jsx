import React from "react";
import AnimateIn from "./AnimateIn.jsx";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Summer2026({ isDark }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center px-4 sm:px-0 ">
      <AnimateIn delay={0.1}>
        <div className="flex flex-col p-4 sm:p-5 rounded-lg mt-5 w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px]">
          <button
            onClick={() => navigate("/")}
            className={`group self-start mb-6 inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 -ml-3 rounded-full cursor-pointer transition-colors ${
              isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-100"
            }`}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </button>
          <h1 className="text-2xl font-extrabold tracking-tight mb-3">
            Summer 2026 at Salesforce
          </h1>

          <p className="text-base leading-relaxed">
            Coming to San Francisco for a second time was nerve-racking.
            Interning in the city last year taught me a lot — it showed me how
            fast the industry evolves, and the immense concentration of
            extremely intelligent people packed all over the city. Even so, I
            didn't expect to be surprised by just how much things had changed.
          </p>
          <br />
          <p className="text-base leading-relaxed">
            Driving into the city, I saw the huge influx of AI startups; almost
            every startup is now embracing this new phenomenon sweeping the tech
            industry. Before my first day, I was still in the limbo of the AI
            world — vaguely aware of things like Claude, Codex, and the rest, but
            not really living in it.
          </p>
          <br />
          <p className="text-base leading-relaxed">
            But coming into that first day, that first week, I realized how
            deeply integrated AI agents have become in the average software
            engineer's workflow. Nearly every line of code is being written by AI
            agents, with you designing and orchestrating multiple agents to get
            the job done.
          </p>
        </div>
      </AnimateIn>
    </div>
  );
}
