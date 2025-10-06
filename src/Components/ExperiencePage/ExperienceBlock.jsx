import React from "react";

export default function ExperienceBlock({
  position,
  company,
  duration,
  description,
  experienceInfo,
}) {
  return (
    <div className="flex flex-col items-center m-20 text-white">
      <div className="bg-zinc-800 p-5 w-[80vh] rounded-lg transition ease-in-out hover:scale-102 z-50">
        <div>
          <h1 className="text-xl font-bold mb-2">{position}</h1>
        </div>
        <div>
          <h1 className="text-base text-sky-600">{company}</h1>
        </div>
        <div>
          <h1 className="text-sm opacity-70 font-medium">{duration}</h1>
        </div>
        <div className="mt-3 text-base leading-relaxed border-t pt-3 border-gray-400 ">
          <h1 className="">{description}</h1>
        </div>
        <div className="flex flex-row mt-5 gap-3">
          {experienceInfo &&
            experienceInfo.map((info, index) => {
              return (
                <h1 key={index} className="bg-sky-600 px-3 py-2 rounded-xl">
                  {info}
                </h1>
              );
            })}
        </div>
      </div>
    </div>
  );
}
