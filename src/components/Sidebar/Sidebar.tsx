import React from "react";
import { ClipboardIcon, CogIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 bg-white w-16 opacity-75">
      <h1
        className="flex items-center justify-center text-2xl
    h-16 bg-sky-800 text-white font-bold"
      ></h1>

      <ul className="flex flex-col text-lg h-full">
        <li
          className="flex justify-center items-center flex-col
        py-7 text-gray-500 text-purple-50s0"
        >
          <ClipboardIcon className="w-8 h-8 text-purple-500" />
        </li>
        <li
          className="flex justify-center items-center flex-col
        py-7 text-gray-500 mt-auto mb-16"
        >
          <CogIcon className="w-6 h-6" />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
