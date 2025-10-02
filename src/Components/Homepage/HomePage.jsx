import React from "react";
import Education from "./Education";
import MainScreen from "./MainScreen";
import Personal from "./Personal";
import TopNavbar from "../TopNavbar.jsx";
export default function HomePage() {
  return (
    <div>
      <div className="flex justify-center m-5 relative z-10">
        <TopNavbar />
      </div>
      <div className="relative z-10">
        <Personal />
      </div>
      <div className="mt-10 relative z-10">
        <Education />
      </div>
    </div>
  );
}
