import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import profile from "../../assets/profile.jpg";

export default function Personal() {
  return (
    <>
      <div className="flex flex-row justify-center mt-20 gap-30 h-[50vh]">
        <div className="text-white flex flex-col gap-10 justify-center w-[50vh]">
          <div className="gap-1">
            <h1 className="text-5xl font-bold">Hello, My name is</h1>
            <h1 className="text-5xl font-bold text-sky-600">
              Luis-Angel Moreno
            </h1>
          </div>

          <div>
            <h1 className="text-lg font-medium opacity-60">
              Junior Computer Science student at Florida International
              University, passionate about developing impactful applications
              that serve communities and contribute to a better world.
            </h1>
          </div>
          <div className="flex flex-row gap-5">
            <a href="https://github.com/Luimoe05" target="_blank">
              <Github className="cursor-pointer hover:opacity-50 transition ease" />
            </a>
            <a href="https://www.linkedin.com/in/luisanm/" target="_blank">
              <Linkedin className="cursor-pointer hover:opacity-50 transition ease" />
            </a>
            <a href="mailto:lmoreno00528@gmail.com" target="_blank">
              <Mail className="cursor-pointer hover:opacity-50 transition ease" />
            </a>
          </div>

          <div></div>
        </div>
        <div className=" flex flex-col justify-center">
          <img
            src={profile}
            alt="profile picture"
            className="w-[350px] rounded-4xl"
          />
        </div>
      </div>
    </>
  );
}
