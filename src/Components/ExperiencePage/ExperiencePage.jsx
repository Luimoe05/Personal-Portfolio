import React, { useState } from "react";
import ExperienceBlock from "./ExperienceBlock";
import AnimateIn from "../AnimateIn.jsx";
import DownloadResume from "./DownloadResume.jsx";
import { color } from "framer-motion";

export default function ExperiencePage({ colorMode }) {
  const salesForce2026Info = [
    "Kubernetes",
    "Helm",
    "Docker",
    "AWS (S3)",
    "Apache Spark",
    "MCP",
    "Envoy / mTLS",
  ];
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
          position={"Software Engineer Intern"}
          company={"Salesforce"}
          duration={"May 2026 - Aug 2026"}
          description={
            "Returning to Salesforce in San Francisco to work on the Spark platform team. Cut Spark logging costs by ~$300K/month by designing and shipping a log-search REST API that streams, decompresses, and greps gzipped application logs from AWS S3, replacing the team's Splunk pipeline. Exposed the API as a Model Context Protocol (MCP) tool over an Envoy service-mesh mTLS connection so an AI agent could autonomously diagnose Spark job failures. Root-caused a Kubernetes ambiguous-selector bug to restore 2-10 replica autoscaling on the Spark History Server extension service, and shipped a Claude Code plugin bundling 4 MCP servers and 7 skills to collapse Spark debugging into a single install."
          }
          experienceInfo={salesForce2026Info}
          divColor={colorMode}
        />
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <ExperienceBlock
          position={"Software Engineering Intern"}
          company={"Salesforce"}
          duration={"Jun 2025 - Aug 2025"}
          description={
            "As a Full Stack Intern at Salesforce and part of the FTL program, I developed Codifica, an innovative, AI-powered in-browser code editor. This application was designed to enhance learning accessibility by leveraging AI to explain complex coding concepts to users in their native language, significantly improving technical understanding and reducing language barriers in programming education."
          }
          experienceInfo={salesForceInfo}
          divColor={colorMode}
        />
      </AnimateIn>

      <AnimateIn delay={0.5}>
        <ExperienceBlock
          position={"Director of Digital Media"}
          company={"INIT"}
          duration={"Dec 2025 - Present"}
          description={
            "In charge of photography and videography for the largest tech organization at Florida International University."
          }
          divColor={colorMode}
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
          divColor={colorMode}
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
          divColor={colorMode}
        />
      </AnimateIn>

      {/* <AnimateIn>
        <DownloadResume />
      </AnimateIn> */}
    </div>
  );
}
