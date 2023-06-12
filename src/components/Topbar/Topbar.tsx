import React, {
  ChangeEvent,
  useState,
  useContext,
  useCallback,
  useRef,
  SyntheticEvent
} from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { Modal } from '../Modal/Modal';

import { logout, updateUserName } from '../../services/AuthentificationService';
import { AuthContext } from '../../Contexts/AuthContext';

type TopbarProps = {
  setSearchValue: (value: string) => void;
};

const Topbar: React.FC<TopbarProps> = ({ setSearchValue }) => {
  const { user } = useContext(AuthContext);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(user?.displayName || '');
  const navigate = useNavigate();

  const userNameInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = useCallback(async () => {
    await logout()
      .then(() => navigate('/'))
      .catch((error) => console.log(error));
  }, []);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmitUsername = (event: SyntheticEvent) => {
    event.preventDefault();
    updateUserName(userNameInputRef.current?.value || '');
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
          onChange={handleSearchInputChange}
        />
      </div>
      <div
        className="flex space-x-6 cursor-pointer"
        onClick={() => setIsLogoutModalOpen(!isLogoutModalOpen)}>
        <div className="flex items-center text-white">
          <h3 className="font-bold mr-3">{username}</h3>
          <img
            src={user?.photoURL || ''}
            width="36"
            height="36"
            className="object-cover rounded-full"
            alt={username}
            title={`${'Logged in as'} ${username}`}
          />
        </div>
      </div>
      <Modal
        isModalOpen={isLogoutModalOpen}
        setIsModalOpen={setIsLogoutModalOpen}
        headline={<h2>User {username}</h2>}>
        <form onSubmit={handleSubmitUsername}>
          <div className="grid gap-6 mb-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="display_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                id="display_name"
                ref={userNameInputRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                defaultValue={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>
        </form>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-500" />
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
