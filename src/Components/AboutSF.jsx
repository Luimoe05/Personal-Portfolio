import React from "react";
import AnimateIn from "./AnimateIn.jsx";
import { useNavigate } from "react-router-dom";

export default function AboutSF({ isDark }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center px-4 sm:px-0 ">
      <AnimateIn delay={0.1}>
        <div className="flex flex-col p-4 sm:p-5 rounded-lg mt-5 w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px]">
          <button
            onClick={() => navigate(-1)}
            className="self-start mb-4 flex items-center gap-1 text-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-extrabold tracking-tight mb-3">
            Summer 2025 Recap
          </h1>
          <p className="text-base leading-relaxed">
            This past summer, I had the pleasure of interning at Salesforce in
            San Francisco. I participated in the Salesforce Future Force Tech
            Launchpad (FTL) program, an intensive collaboration with Codepath
            that provided a deep dive into full-stack development.
          </p>
          <br />
          <p className="text-base leading-relaxed">
            The experience was transformative. Beyond the technical skills, I
            grew immensely on a personal level. Experiencing a new city across
            the country and immersing myself in SF's vibrant tech culture,
            surrounded by such talented individuals, gave me a new perspective
            on the industry's pace and collaborative energy.
          </p>
          <br />
          <p className="text-base leading-relaxed">
            The first couple weeks I was really nervous, not knowing what to
            expect or how to act. As a first-generation college student, the
            corporate world seemed foreign. However as time passed and I adapted
            to the work I was doing, I learned that almost everyone around me
            felt the same way. You shouldn't see the people around you as your
            competition but as friends that are there to help.
          </p>
          <br />

          <h2 className="font-bold text-xl mb-3">My Work</h2>
          <p className="text-base leading-relaxed">
            I collaborated with two other interns to design, develop, and deploy
            a full-stack application from its initial concept. Our mission was
            to build a tool that aids non-English speakers in learning to code
            in a language they understand.
          </p>
          <br />
          <p className="text-base leading-relaxed">
            Taking a project from ideation to deployment underscored a critical
            lesson: the importance of clear and efficient communication. I
            learned that the ability to ask insightful questions and articulate
            complex ideas both with teammates and managers, is what truly drives
            a project forward and ensures the team is aligned on its goals.
          </p>
        </div>
      </AnimateIn>
    </div>
  );
}
