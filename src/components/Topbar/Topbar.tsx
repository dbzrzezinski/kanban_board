import React, { ChangeEvent, useState, useContext, useCallback } from 'react';
import { logout } from '../../services/AuthentificationService';
import { MagnifyingGlassIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { Modal } from '../Modal/Modal';
import { AuthContext } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

type TopbarProps = {
  setSearchValue: (value: string) => void;
};

const Topbar: React.FC<TopbarProps> = ({ setSearchValue }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleLogout = useCallback(async () => {
    await logout()
      .then(() => navigate('/'))
      .catch((error) => console.log(error));
  }, []);

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
      <div
        className="flex space-x-6 cursor-pointer"
        onClick={() => setIsLogoutModalOpen(!isLogoutModalOpen)}>
        <div className="flex items-center text-white">
          <h3 className="font-bold mr-3">{user?.displayName}</h3>
          <img
            src={user?.photoURL || ''}
            width="36"
            height="36"
            className="object-cover rounded-full"
            alt={user?.displayName || ''}
            title={`${'Logged in as'} ${user?.displayName || ''}`}
          />
        </div>
      </div>
      <Modal
        isModalOpen={isLogoutModalOpen}
        setIsModalOpen={setIsLogoutModalOpen}
        headline={<h2>User {user?.displayName || ''}</h2>}>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg w-full"
          onClick={handleLogout}>
          <ArrowLeftOnRectangleIcon className="w-5 h-5 inline-block mr-2" />
          Log me out
        </button>
      </Modal>
    </div>
  );
};

export default Topbar;
