import React from "react";
import ProjectContainer from "./ProjectContainer";
import CodificaImg from "../../assets/Codifica.png";

export default function ProjectsPage({ colorMode }) {
  return (
    <div className=" mt-20">
      <ProjectContainer
        imgURL={CodificaImg}
        ProjectName={"Codifica"}
        Stack={"React, Express, Node, Prisma, Postgresql, Tailwindcss"}
      />
    </div>
  );
}
