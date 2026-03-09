import React from "react";

export default function DownloadResume() {
  return (
    <>
      <div className="flex flex-row m-10 justify-center">
        <a
          href="../../assets/Luis_Resume_2025.pdf"
          download={"Luis_Resume_2025.pdf"}
        >
          <button className="border px-6 py-3 rounded-md cursor-pointer border-gray-800 hover:border-gray-400 transition ease-in-out">
            Download Resume
          </button>
        </a>
      </div>
    </>
  );
}
