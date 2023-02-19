import React from "react";
import { ClipboardIcon, CogIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 bg-white w-16 opacity-7s0">
      <h1
        className="flex items-center justify-center text-2xl
    h-16 bg-sky-700 text-white font-bold"
      ></h1>

      <ul className="flex flex-col text-lg h-full">
        <li
          className="flex justify-center items-center flex-col
        py-7 text-sky-800"
        >
          <ClipboardIcon
            className="w-8 h-8 text-sky-800"
            title="Kanban Board"
          />
        </li>
        <li
          className="flex justify-center items-center flex-col
        py-7 text-gray-500 mt-auto mb-16"
        >
          <CogIcon className="w-6 h-6" title="Settings" />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
