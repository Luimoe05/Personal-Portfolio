import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";

export default function Personal() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] px-6 text-center gap-5">
      <p className="text-xs uppercase tracking-widest opacity-40 font-medium">
        Software Developer
      </p>
      <h1 className="text-hero">
        Luis-Angel <br className="hidden sm:block" />
        Moreno
      </h1>
      <p className="max-w-sm opacity-55 text-sm sm:text-base leading-relaxed">
        Junior CS student at FIU, passionate about building impactful
        applications that serve communities.
      </p>
      <div className="flex gap-6 mt-1">
        <a
          href="https://github.com/Luimoe05"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5 hover:opacity-40 transition-opacity" />
        </a>
        <a
          href="https://www.linkedin.com/in/luisanm/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5 hover:opacity-40 transition-opacity" />
        </a>
        <a
          href="mailto:lmoreno00528@gmail.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Email"
        >
          <Mail className="w-5 h-5 hover:opacity-40 transition-opacity" />
        </a>
      </div>
    </div>
  );
}
