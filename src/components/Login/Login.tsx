import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { firebaseAuth } from '../../services/AuthentificationService';
import { signInWithEmailAndPassword } from 'firebase/auth';

import Alert from '../Alert/Alert';
import { updateUser } from '../../services/UserService';

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await signInWithEmailAndPassword(
      firebaseAuth,
      emailRef.current?.value || '',
      passwordRef.current?.value || ''
    )
      .then(() => {
        updateUser({
          lastLogin: Math.floor(Date.now() / 1000)
        });
        navigate('/board');
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          setError('User not found');
        }
        if (error.code === 'auth/wrong-password') {
          setError('Wrong password');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-white shadow dark:border w-full rounded-lg dark:bg-gray-800 dark:border-gray-700 mt:mt-0 sm:max-w-md xl:p-0">
          <div className="space-y-4 p-6 md:space-y-6 sm:p-8">
            <h1 className="leading-tight tracking-tight font-bold text-xl text-gray-900 md:text-2xl dark:text-white">
              Sign in
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required={true}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  ref={passwordRef}
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={loading}>
                Sign in
              </button>
            </form>
          </div>
        </div>
        {error && (
          <div className="sm:max-w-md w-full">
            <Alert alertType="error" alertTitle="Error" alertMessage={error} />
          </div>
        )}
      </div>
    </section>
  );
};

export { Login };
