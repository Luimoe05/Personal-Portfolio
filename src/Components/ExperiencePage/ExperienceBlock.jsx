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
    <div className="flex flex-col items-center mx-4 my-10 sm:m-20">
      <div
        className={`${
          divColor === "Moon"
            ? "bg-zinc-800 border-1 border-gray-300/20 hover:border-gray-300/40"
            : "bg-zinc-100 border-1 border-gray-600/30 hover:border-gray-500"
        } p-4 sm:p-5 w-full max-w-[90vw] sm:w-[80vh] rounded-lg transition ease-in-out hover:scale-101 z-50`}
      >
        <h2
          className={`text-lg font-semibold mb-1 ${
            divColor === "Moon" ? "text-white" : "text-black"
          }`}
        >
          {position}
        </h2>
        <p className="text-sm text-sky-400">{company}</p>
        <p
          className={`text-xs opacity-60 font-medium mt-0.5 ${
            divColor === "Moon" ? "text-white" : "text-black"
          }`}
        >
          {duration}
        </p>
        <p
          className={`mt-3 text-base leading-relaxed border-t pt-3 border-gray-400 ${
            divColor === "Moon" ? "text-white" : "text-black"
          }`}
        >
          {description}
        </p>
        <div className="flex flex-row flex-wrap mt-5 gap-2 sm:gap-3">
          {experienceInfo &&
            experienceInfo.map((info, index) => (
              <span
                key={index}
                className="bg-sky-600 px-2 py-1 sm:px-3 sm:py-2 rounded-xl text-white text-sm"
              >
                {info}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
