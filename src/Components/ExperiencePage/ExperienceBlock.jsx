import React, { useEffect, useState } from "react";

export default function ExperienceBlock({
  position,
  company,
  duration,
  description,
  experienceInfo,
  divColor,
}) {
  return (
    <div className="flex flex-col items-center m-20">
      <div
        className={`${
          divColor === "Moon"
            ? "bg-zinc-800 border-1 border-gray-300/20 hover:border-gray-300/40"
            : "bg-zinc-100 border-1 border-gray-600/30 hover:border-gray-500"
        } p-5 w-[80vh] rounded-lg transition ease-in-out hover:scale-101 z-50`}
      >
        <div>
          <h1
            className={`text-xl font-bold mb-2 ${
              divColor === "Moon" ? "text-white" : "text-black"
            }`}
          >
            {position}
          </h1>
        </div>
        <div>
          <h1 className="text-base text-sky-600">{company}</h1>
        </div>
        <div>
          <h1
            className={`text-sm opacity-70 font-medium ${
              divColor === "Moon" ? "text-white" : "text-black"
            }`}
          >
            {duration}
          </h1>
        </div>
        <div
          className={`mt-3 text-base leading-relaxed border-t pt-3 border-gray-400 ${
            divColor === "Moon" ? "text-white" : "text-black"
          }`}
        >
          <h1>{description}</h1>
        </div>
        <div className="flex flex-row mt-5 gap-3">
          {experienceInfo &&
            experienceInfo.map((info, index) => {
              return (
                <h1
                  key={index}
                  className="bg-sky-600 px-3 py-2 rounded-xl text-white"
                >
                  {info}
                </h1>
              );
            })}
        </div>
      </div>
    </div>
  );
}
