import React from "react";
import Education from "./Education";
import Personal from "./Personal";
import TopNavbar from "../TopNavbar.jsx";
import AnimateIn from "../AnimateIn.jsx";
export default function HomePage({ colorMode }) {
  return (
    <div>
      <AnimateIn delay={0.1}>
        <div className="relative z-10">
          <Personal />
        </div>
      </AnimateIn>

      <AnimateIn delay={0.3}>
        <div className="relative z-10">
          <Education color={colorMode} />
        </div>
      </AnimateIn>
    </div>
  );
}
