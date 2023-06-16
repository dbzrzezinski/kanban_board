import React, { useState, useContext, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { AuthContext } from '../../Contexts/AuthContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Alert from '../Alert/Alert';
import { updateProfile } from 'firebase/auth';
import { MINIMAL_IMAGE_HEIGHT, MINIMAL_IMAGE_WIDTH } from '../../Constants/Constants';

const ImageUpload: React.FC = () => {
  const [error, setError] = useState<string | null>('');
  const [userImage, setUserImage] = useState<string | null>(null);

  const { user } = useContext(AuthContext);

  const handleFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    const storage = getStorage();
    const storageRef = ref(storage, user?.uid);

    if (!file) return;

    // validate image file type
    if (!file.type.includes('image')) {
      setError('File must be an image');
      return;
    }

    const imageObject = new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        if (image.width < MINIMAL_IMAGE_WIDTH || image.height < MINIMAL_IMAGE_HEIGHT) {
          setError(`Image must be at least ${MINIMAL_IMAGE_WIDTH}x${MINIMAL_IMAGE_HEIGHT} pixels`);
          setUserImage(null);
          reject(`Image must be at least ${MINIMAL_IMAGE_WIDTH}x${MINIMAL_IMAGE_HEIGHT} pixels`);
        }

        resolve();
      };
      image.onerror = (error) => reject(error);
    });

    // check image dimensions
    imageObject.then(() => {
      // upload image to firebase storage
      uploadBytes(storageRef, file, { contentType: file?.type })
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            if (user) {
              // update user profile with image url
              updateProfile(user, {
                photoURL: url
              });
            }
          });
          setError(null);
          setUserImage(URL.createObjectURL(file));
        })
        .catch((error) => {
          setError(error.messsage);
        });
    });
  };

  const handleRemoveImage = () => {
    setUserImage(null);
    if (user) {
      updateProfile(user, {
        photoURL: ''
      });
      const storage = getStorage();
      const imageRef = ref(storage, user.uid);
      deleteObject(imageRef);
    }
  };

  useEffect(() => {
    const imageRef = ref(getStorage(), user?.uid || '');

    getDownloadURL(imageRef)
      .then((url) => {
        setUserImage(url);
        return Promise.resolve(true);
      })
      .catch(() => {
        return Promise.resolve(false);
      });
  }, []);

  return (
    <div>
      <label
        htmlFor="display_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        User Image
      </label>
      {!userImage && (
        <div className="w-full h-full flex">
          <div className="extraOutline p-4 bg-white w-full bg-whtie m-auto rounded-lg">
            <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg">
              <svg
                className="text-blue-500 w-24 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="input_field flex flex-col w-max mx-auto text-center">
                <label>
                  <input
                    className="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    onChange={handleFileInput}
                  />
                  <div className="text bg-blue-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500">
                    Select
                  </div>
                </label>

                <div className="title text-blue-500 uppercase">or drop files here</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="w-full content-center">
          <Alert alertType="error" alertTitle="Error" alertMessage={error} />
        </div>
      )}
      {userImage && (
        <div className="relative inline-block">
          <img
            className="w-32 h-32 rounded-full object-cover"
            src={userImage ? userImage : ''}
            alt=""
            width="72"
            height="72"
          />
          <button onClick={handleRemoveImage}>
            <XMarkIcon className="w-8 h-8 p-1 bg-red-500 text-white rounded-full absolute top-0 right-0" />
          </button>
        </div>
      )}
    </div>
  );
};

export { ImageUpload };
