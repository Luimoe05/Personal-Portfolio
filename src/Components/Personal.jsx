import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import profile from "../assets/profile.jpg";

export default function Personal() {
  return (
    <>
      <div className="flex flex-row justify-center mt-20 gap-30">
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

          <div></div>
        </div>
        <div className="">
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
