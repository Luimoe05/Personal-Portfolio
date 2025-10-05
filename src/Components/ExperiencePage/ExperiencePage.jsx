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
  const initBuildInfo = ["React", "Firebase", "Tailwindcss"];
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
          position={"INIT Build"}
          company={"INIT"}
          duration={"Feb 2025 - April 2025"}
          description={
            "Collaborated on a 7-person team during the INIT Build program to construct CreatorsFIU, a full-stack student marketplace for trading used books and college supplies. My primary focus areas were establishing robust user security and authentication using Firebase and developing the responsive front-end homepage utilizing React and Tailwind CSS."
          }
          experienceInfo={initBuildInfo}
        />
      </AnimateIn>
      <AnimateIn delay={0.5}>
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
