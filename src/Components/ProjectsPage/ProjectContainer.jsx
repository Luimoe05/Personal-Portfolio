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
        <div className="m-10 flex flex-row gap-20 justify-center">
          <div className="rounded-lg">
            <a href={githubURL} target="_blank">
              <img
                src={imgURL}
                alt="Codifica-IMG"
                className="w-[70vh] rounded-lg  border-solid border-2 border-gray-400/30 transition ease-in-out hover:scale-101 hover:opacity-80"
              />
            </a>
          </div>
          <div className="w-[70vh]">
            <h1 className="font-bold text-5xl">{ProjectName}</h1>
            <h1 className="mt-2 text-lg ">
              Made with: <span className="text-sky-600">{Stack}</span>
            </h1>
            <div className="mt-3 w-[60vh] flex flex-col gap-3">
              <h1>{description}</h1>
              <h1 className="font-bold text-xl">Key Features & Impact:</h1>
              <ul className="list-disc list-inside flex flex-col gap-2">
                {keypoints &&
                  keypoints.map((info, index) => {
                    return <li key={index}>{info}</li>;
                  })}
              </ul>
            </div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
