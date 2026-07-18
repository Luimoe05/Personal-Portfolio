import React from "react";
import PostLayout from "./PostLayout.jsx";

export default function AboutSF({ isDark }) {
  return (
    <PostLayout
      isDark={isDark}
      meta={["Aug 2025", "San Francisco", "3 min read"]}
      title="Summer 2025 in San Francisco"
      dek="My first internship at Salesforce through the FTL program — the highs, the nerves, and building something from zero."
    >
      <p>
        This past summer, I had the pleasure of interning at Salesforce in San
        Francisco. I participated in the Salesforce Future Force Tech Launchpad
        (FTL) program, an intensive collaboration with Codepath that provided a
        deep dive into full-stack development.
      </p>

      <p>
        The experience was transformative. Beyond the technical skills, I grew
        immensely on a personal level. Experiencing a new city across the
        country and immersing myself in SF's vibrant tech culture, surrounded by
        such talented individuals, gave me a new perspective on the industry's
        pace and collaborative energy.
      </p>

      <p>
        The first couple weeks I was really nervous, not knowing what to expect
        or how to act. As a first-generation college student, the corporate
        world seemed foreign. However, as time passed and I adapted to the work
        I was doing, I learned that almost everyone around me felt the same way.
        You shouldn't see the people around you as your competition, but as
        friends who are there to help.
      </p>

      <h2>My Work</h2>

      <p>
        I collaborated with two other interns to design, develop, and deploy a
        full-stack application from its initial concept. Our mission was to
        build a tool that aids non-English speakers in learning to code in a
        language they understand.
      </p>

      <p>
        Taking a project from ideation to deployment underscored a critical
        lesson: the importance of clear and efficient communication. I learned
        that the ability to ask insightful questions and articulate complex
        ideas — both with teammates and managers — is what truly drives a
        project forward and ensures the team is aligned on its goals.
      </p>
    </PostLayout>
  );
}
