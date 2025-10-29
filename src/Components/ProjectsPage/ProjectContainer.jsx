import React from "react";
import AnimateIn from "../AnimateIn.jsx";

export default function ProjectContainer({ imgURL, ProjectName, Stack }) {
  return (
    <div>
      <AnimateIn delay={0.2}>
        <div className="m-10 flex flex-row gap-20 justify-center">
          <div className="rounded-lg">
            <img
              src={imgURL}
              alt="Codifica-IMG"
              className="w-[70vh] rounded-lg drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] border-solid border-4 border-sky-500 transition ease-in-out hover:scale-101"
            />
          </div>
          <div className="w-[70vh]">
            <h1 className="font-bold text-5xl">{ProjectName}</h1>
            <h1 className="mt-5 text-lg ">
              Made with: <span className="text-sky-600">{Stack}</span>
            </h1>
            <div className=" mt-5">
              <h2>hello</h2>
            </div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
