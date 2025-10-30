import React from "react";
import AnimateIn from "./AnimateIn.jsx";

export default function AboutSF({ sendCommand }) {
  return (
    <div className="flex justify-center">
      <AnimateIn delay={0.1}>
        <div className="flex flex-col p-5 rounded-lg mt-5 w-[800px]">
          <h1 className="text-2xl font-bold mb-3">Summer 2025 Recap</h1>
          <h1>
            This summer I had the pleasure of spending my time in San Francisco
            while interning at Salesforce.
          </h1>
          <br />
          <h1>
            I participated in Salesforce FTL program, a program in collaboration
            with Codepath that taught me the ins and outs of Full Stack
            Development
          </h1>
        </div>
      </AnimateIn>
    </div>
  );
}
