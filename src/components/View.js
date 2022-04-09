import React from "react";
import Posts from "./Posts";
import { RiCloseFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function View({ viewData, setShowView }) {
  let navigate = useNavigate();

  document.body.style.overflow = "hidden";

  return (
    <div className="h-[100vh] w-[100vw] flex flex-row pl-[68px] overflow-hidden">
      <div className="flex h-[100vh] w-[70vw] bg-black relative border-r-[1px] border-neutral-300 bg-center text-center">
        <div className="w-full bg-neutral-600 ml-auto mr-auto mt-auto mb-auto">
          <img
            src={viewData.data.content}
            alt="photo"
            className="ml-auto mr-auto mt-auto mb-auto"
          ></img>
        </div>

        <div className="flex flex-row font-semibold text-sm tracking-wide absolute top-5 left-4">
          <div
            className="border-[1px] border-neutral-300 self-center p-2  bg-[#E4E6E9] rounded-full flex flex-row items-center hover:bg-neutral-300"
            onClick={() => {
              document.body.style.overflow = "auto";
              setShowView(false);
            }}
          >
            <RiCloseFill className="h-7 w-7" />
          </div>
        </div>
      </div>
      <div className="h-[100vh] w-auto">
        <Posts post={viewData.data.post} notView={false} />
      </div>
    </div>
  );
}
