import React from "react";
import {
  SiReact,
  SiPrisma,
  SiVite,
  SiPostgresql,
  SiExpress,
  SiTailwindcss,
} from "react-icons/si";
import { IoLogoNodejs } from "react-icons/io";
import { FaJava } from "react-icons/fa";
import codeyTheBearPicture from "../../assets/image.jpg";
import { useNavigate } from "react-router-dom";

const techs = [
  { Icon: SiReact, label: "React" },
  { Icon: SiTailwindcss, label: "Tailwind" },
  { Icon: SiVite, label: "Vite" },
  { Icon: IoLogoNodejs, label: "Node.js" },
  { Icon: SiExpress, label: "Express" },
  { Icon: SiPostgresql, label: "PostgreSQL" },
  { Icon: SiPrisma, label: "Prisma" },
  { Icon: FaJava, label: "Java" },
];

export default function Education({ color }) {
  const navigate = useNavigate();
  const isDark = color === "Moon";
  const divider = isDark ? "border-zinc-800" : "border-zinc-200";
  const subtle = isDark ? "text-zinc-400" : "text-zinc-500";

  return (
    <div className="flex justify-center px-6 pb-20">
      <div className="w-full max-w-xl flex flex-col gap-12">
        {/* About */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs uppercase tracking-widest opacity-40 font-medium">
            About
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${subtle}`}>
            Hello! I'm Luis-Angel Moreno, a junior at Florida International
            University pursuing a BS in Computer Science. During the summer of
            2025 I had the pleasure of interning at Salesforce in San Francisco
            through their FTL program.
          </p>
        </div>

        <div className={`border-t ${divider}`} />

        {/* Technologies */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest opacity-40 font-medium">
            Technologies
          </h2>
          <div className="flex flex-wrap gap-4">
            {techs.map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon size={24} className={`${subtle}`} />
                <span className={`text-xs ${subtle}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`border-t ${divider}`} />

        {/* Education */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs uppercase tracking-widest opacity-40 font-medium">
            Education
          </h2>
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <span className="text-sm sm:text-base font-medium">
                Florida International University
              </span>
              <span className={`text-xs ${subtle}`}>2023 – Present</span>
            </div>
            <p className={`text-sm ${subtle}`}>BS in Computer Science</p>
          </div>
          <p className={`text-xs ${subtle} leading-relaxed`}>
            Data Structures &amp; Algorithms · Systems Programming · Artificial
            Intelligence Algorithms
          </p>
        </div>

        <div className={`border-t ${divider}`} />

        {/* Summer 2025 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xs uppercase tracking-widest opacity-40 font-medium">
            Highlight
          </h2>
          <button
            onClick={() => navigate("/summer")}
            className={`group flex items-center gap-4 text-left rounded-xl p-4 transition-all cursor-pointer ${
              isDark ? "hover:bg-zinc-900" : "hover:bg-zinc-100"
            }`}
          >
            <img
              src={codeyTheBearPicture}
              alt="Me with Codey the bear at Salesforce SF"
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Summer 2025</span>
              <span className={`text-xs ${subtle}`}>
                A dive into my time in San Francisco →
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
