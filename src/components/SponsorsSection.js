import React from "react";
import Sponsors from "./Sponsors";
import github from "../assets/github.jpg";
import codes from "../assets/codes.jpg";

export default function SponsorsSection() {
  return (
    <div className="">
      <h1 className="ml-3 mt-5 font-bold text-sm text-neutral-500">Sponsored</h1>
      <Sponsors image={github}/>
      <Sponsors image={codes}/>
    </div>

  );
}
