import React, { ChangeEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { auth } from '../../services/AuthentificationService';

type TopbarProps = {
  setSearchValue: (value: string) => void;
};

const Topbar: React.FC<TopbarProps> = ({ setSearchValue }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div
      className="h-16 pl-28 lg:pl-24 fixed bg-gradient-to-r from-sky-700
        to-sky-700 w-full flex items-center justify-between pr-14 lg:pr-10 z-10">
      <div className="flex px-1 items-center">
        <MagnifyingGlassIcon className="w-5 h-5 text-white" />
        <input
          type="text"
          placeholder="Search tasks ..."
          className=" bg-transparent border-0 text-white placeholder-gray-200
                outline-none focus:ring-0 text-lg"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex space-x-6">
        <div className="flex items-center text-white">
          <h3 className="font-bold mr-3">{auth.currentUser?.displayName}</h3>
          <img
            src={auth.currentUser?.photoURL || ''}
            width="36"
            height="36"
            className="object-cover rounded-full"
            alt="John Doe"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
