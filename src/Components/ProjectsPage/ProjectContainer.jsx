import React from "react";
import AnimateIn from "../AnimateIn.jsx";

export default function ProjectContainer({
  imgURL,
  ProjectName,
  Stack,
  description,
  keypoints,
  githubURL,
}) {
  return (
    <div className="relative z-10">
      <AnimateIn delay={0.2}>
        <div className="mx-4 my-0 sm:m-10 flex flex-col lg:flex-row gap-6 sm:gap-10 lg:gap-20 justify-center items-center lg:items-start">
          <div className="rounded-lg w-full sm:w-auto">
            <a href={githubURL} target="_blank">
              <img
                src={imgURL}
                alt="Codifica-IMG"
                className="w-full sm:w-[60vh] lg:w-[70vh] rounded-lg border-solid border-2 border-gray-400/30 transition ease-in-out hover:scale-101 hover:opacity-80"
              />
            </a>
          </div>
          <div className="w-full sm:w-[60vh] lg:w-[70vh]">
            <h2 className="text-project-title">
              {ProjectName}
            </h2>
            <p className="mt-2 text-base">
              Made with: <span className="text-sky-600">{Stack}</span>
            </p>
            <div className="mt-3 w-full flex flex-col gap-3">
              <p className="text-base">{description}</p>
              <h3 className="font-semibold text-lg">
                Key Features & Impact:
              </h3>
              <ul className="list-disc list-inside flex flex-col gap-2 text-base">
                {keypoints &&
                  keypoints.map((info, index) => (
                    <li key={index}>{info}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
