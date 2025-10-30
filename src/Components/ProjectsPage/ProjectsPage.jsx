import React from "react";
import ProjectContainer from "./ProjectContainer";
import CodificaImg from "../../assets/Codifica.png";
import CreatorsFIU from "../../assets/creatorsFIU.png";

export default function ProjectsPage({ colorMode }) {
  const codifica = [
    "Engineered an in-browser IDE using Judge0 (code execution) and Codemirror (editor) APIs, supporting 3+ languages.",
    "Integrated a Gemini-powered AI assistant to provide personalized, multilingual support based on user preferences.",
    "Optimized AI response time by 35% and enhanced accessibility based on direct feedback from over 30 users.",
  ];

  const creatorsFIU = [
    "Engineered a scalable frontend with React and TailwindCSS, building 15+ reusable components for product listings and user profiles.",
    "Built the user authentication system using Firebase, which stored customer data and synced devices, increasing login speeds by 30%.",
    "Authored 20+ user stories to guide the team's development sprints and define application features.",
  ];
  return (
    <div className="mt-20 flex flex-col gap-10">
      <ProjectContainer
        imgURL={CodificaImg}
        ProjectName={"Codifica"}
        Stack={"React, Express, Node, Prisma, Postgresql, Tailwindcss"}
        description={
          "As part of a three-intern team, I co-developed a full-stack application on the PERN stack aimed at making programming accessible to non-native English speakers. The project's goal was to create a supportive, in-browser learning environment that could adapt to the user."
        }
        keypoints={codifica}
        githubURL="https://github.com/FTLSunstack/FTLCapstone"
      />
      <ProjectContainer
        imgURL={CreatorsFIU}
        ProjectName={"CreatorsFIU"}
        Stack={"React, TailwindCSS, Firebase, MongoDB, JavaScript"}
        description={
          "Built 'CreatorsFIU' as part of a 7-person team, a full-stack marketplace for university students to buy and sell school-related items."
        }
        keypoints={creatorsFIU}
        githubURL="https://github.com/CreatorsFIU-initBuild/demoDAY"
      />
    </div>
  );
}
