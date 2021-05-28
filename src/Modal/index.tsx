import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
}: {
  visible?: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) {
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
  const onToggle = () => {
    setVisible(!visible);
  };
  return {
    visible,
    onClose: onToggle,
    onToggle,
  };
}
