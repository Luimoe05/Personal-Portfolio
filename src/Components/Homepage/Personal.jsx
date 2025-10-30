import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import profile from "../../assets/profile.jpg";

export default function Personal() {
  return (
    <>
      <div className="flex flex-row justify-center mt-10 sm:mt-20 gap-10 sm:gap-30 min-h-[40vh] sm:min-h-[50vh] px-4 sm:px-0">
        <div className="flex flex-col gap-6 sm:gap-10 justify-center w-full sm:w-[80vh] max-w-[90vw] items-center">
          <div className="gap-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Hello, My name is
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-600">
              Luis-Angel Moreno
            </h1>
          </div>

          <div className="text-center">
            <h1 className="text-base sm:text-lg font-medium opacity-60">
              Junior Computer Science student at Florida International
              University, passionate about developing impactful applications
              that serve communities and contribute to a better world.
            </h1>
          </div>
          <div className="flex flex-row gap-4 sm:gap-5">
            <a href="https://github.com/Luimoe05" target="_blank">
              <Github className="cursor-pointer hover:opacity-50 transition ease w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://www.linkedin.com/in/luisanm/" target="_blank">
              <Linkedin className="cursor-pointer hover:opacity-50 transition ease w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="mailto:lmoreno00528@gmail.com" target="_blank">
              <Mail className="cursor-pointer hover:opacity-50 transition ease w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
