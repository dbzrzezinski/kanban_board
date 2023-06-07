import { Dispatch, SetStateAction, ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  headline?: ReactNode;
  footer?: ReactNode;
};

const Modal = ({ isModalOpen, setIsModalOpen, children, headline, footer }: ModalProps) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {isModalOpen && (
        <div>
          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex item-center justify-between p-4 text-xl font-semibold text-gray-900 dark:text-white w-full">
                  <div>{headline}</div>
                  <XMarkIcon
                    className="h-6 w-6 text-gray-400 hover:cursor-pointer hover:text-gray-600"
                    title="Close"
                    onClick={handleClose}
                  />
                </div>
                <div className="p-4 w-full">{children}</div>
                {footer && (
                  <>
                    <div className="flex items-center p-4 bg-gray-50 w-full">Modal Footer</div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="fixed z-10 inset-0 bg-opacity-75 bg-gray-500"></div>
        </div>
      )}
    </>
  );
};

export { Modal };
