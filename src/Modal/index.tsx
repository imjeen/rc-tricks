import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Assign } from 'utility-types';
import styles from './styles.module.less';

function Portal({
  children,
  rootId,
}: {
  children: React.ReactNode;
  rootId?: string;
}) {
  const findElem = rootId && document.getElementById(rootId);
  const root = findElem || document.body;
  return createPortal(children, root);
}

export default function Modal({
  visible,
  children,
  onClose,
}: Assign<
  {
    children: React.ReactNode;
  },
  ReturnType<typeof useModal>
>) {
  return !visible ? null : (
    <Portal>
      <div className={styles.mask}></div>
      <div className={styles.modal}>
        <div className={styles.modalBox}>
          <span className={styles.close} aria-hidden="true" onClick={onClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    </Portal>
  );
}

export function useModal() {
  const [visible, setVisible] = useState(false);

  const onToggle = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') onToggle();
    },
    [onToggle],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleEscape, false);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [visible]);

  return {
    visible,
    onClose: onToggle,
    onToggle,
  };
}
