import React from "react";
import AnimateIn from "../AnimateIn.jsx";

export default function ProjectContainer({ imgURL, ProjectName, Stack }) {
  return (
    <div className="relative z-10">
      <AnimateIn delay={0.2}>
        <div className="m-10 flex flex-row gap-20 justify-center">
          <div className="rounded-lg">
            <img
              src={imgURL}
              alt="Codifica-IMG"
              className="w-[70vh] rounded-lg  border-solid border-2 border-gray-400/30 transition ease-in-out hover:scale-101"
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
