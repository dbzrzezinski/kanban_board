import React, { useEffect, useState } from 'react';
import { AlertProps, AlertTypeClasses } from '../../Types/Alert';

const Alert: React.FC<AlertProps> = ({ alertType, alertTitle, alertMessage, hideTimeout }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (hideTimeout && !isNaN(Number(hideTimeout))) {
      setTimeout(() => {
        setShowAlert(false);
      }, Number(hideTimeout));
    }
  }, []);

  const alertTypeClasses: AlertTypeClasses = {
    success: {
      border: 'border-teal-500',
      text: 'text-teal-500',
      headlineText: 'text-teal-900',
      background: 'bg-teal-100'
    },
    error: {
      border: 'border-red-500',
      text: 'text-red-500',
      headlineText: 'text-red-900',
      background: 'bg-red-100'
    }
  };

  const alertClass = (type: keyof AlertTypeClasses) => {
    return alertTypeClasses[alertType][type];
  };

  return (
    <>
      {showAlert && (
        <div
          className={`${alertClass('background')} border-t-4 ${alertClass(
            'border'
          )} rounded-b ${alertClass(
            'headlineText'
          )} m-auto px-4 py-3 shadow-md mt-3 sm:max-w-md md:max-w-lg p-0 w-full rounded-md`}
          role="alert">
          <div className="flex">
            <div className="py-1">
              <svg
                className={`fill-current h-6 w-6 ${alertClass('text')} mr-4`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>

            <div>
              <p className="font-bold">{alertTitle}</p>
              <p className="text-sm">{alertMessage}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
