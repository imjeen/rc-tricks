import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.less';

export default forwardRef(Modal2);

function Modal2(
  { children }: { children: React.ReactNode },
  ref: React.ForwardedRef<{ onToggle: () => void }>,
) {
  const [visible, setVisible] = useState(false);

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleEscape, false);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [visible]);

  useImperativeHandle(
    ref,
    () => ({
      onToggle: () => setVisible(!visible),
    }),
    [],
  );

  return !visible
    ? null
    : createPortal(
        <>
          <div className={styles.mask}></div>
          <div className={styles.modal}>
            <div className={styles.modalBox}>
              <span
                className={styles.close}
                aria-hidden="true"
                onClick={onClose}
              >
                &times;
              </span>
              {children}
            </div>
          </div>
        </>,
        document.body,
      );
}
