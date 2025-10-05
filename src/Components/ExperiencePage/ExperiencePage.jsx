import React from "react";
import ExperienceBlock from "./ExperienceBlock";
import AnimateIn from "../AnimateIn.jsx";

export default function ExperiencePage() {
  const salesForceInfo = [
    "React",
    "Node.js",
    "Express",
    "Prisma",
    "Postgresql",
  ];
  return (
    <div>
      <AnimateIn delay={0.1}>
        <ExperienceBlock
          position={"Software Engineering Intern"}
          company={"Salesforce"}
          duration={"Jun 2025 - Aug 2025"}
          description={
            "As a Full Stack Intern at Salesforce and part of the FTL program, I developed Codifica, an innovative, AI-powered in-browser code editor. This application was designed to enhance learning accessibility by leveraging AI to explain complex coding concepts to users in their native language, significantly improving technical understanding and reducing language barriers in programming education."
          }
          experienceInfo={salesForceInfo}
        />
      </AnimateIn>
      <AnimateIn delay={0.3}>
        <ExperienceBlock
          position={"STARS Tutor"}
          company={"Florida International University"}
          duration={"Aug 2025 - Present"}
          description={
            "Provided individualized and group tutoring for undergraduate students across core computer science curricula. Covered advanced topics including Data Structures and Algorithms, Systems Programming, and Computer Architecture. Specialized in deep-dive sessions for Programming 2 (Java), helping students grasp object-oriented principles and complex problem-solving techniques."
          }
        />
      </AnimateIn>
    </div>
  );
}
