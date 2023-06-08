import { useCallback, useEffect } from 'react';
import { KEY_NAME_ESC, KEY_EVENT_TYPE } from '../../Constants/Constants';

const useEscapeKey = (handleClose: () => void): void => {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
};

export { useEscapeKey };
