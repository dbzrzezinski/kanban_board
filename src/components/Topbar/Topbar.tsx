import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Topbar = () => {
  return (
    <div
      className="h-16 pl-24 fixed bg-gradient-to-r from-sky-800
        to-blue-600 w-full flex items-center justify-between pr-5"
    >
      <div className="flex px-5 items-center">
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
        <input
          type="text"
          placeholder="Search tasks ..."
          className=" bg-transparent border-0 text-white placeholder-gray-200
                outline-none focus:ring-0 text-lg"
        />
      </div>
      <div className="flex space-x-6">
        <div className="flex items-center text-white">
          <h3 className="font-bold mr-3">M. John Doe</h3>
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            width="36"
            height="36"
            className="object-cover rounded-full "
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
