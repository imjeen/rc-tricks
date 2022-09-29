import React from 'react';
import styles from './styles.module.less';

export default function Button3D({
  size = 'middle',
  type = 'normal',
  disabled = false,
  animation = true,
  children,
}: {
  size?: 'middle' | 'large' | 'small';
  type?: 'normal' | 'warn';
  disabled?: boolean;
  animation?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <>
      <button
        className={[styles.button3D]
          .concat(
            disabled ? styles.disabled : [],
            animation ? styles.animation : [],
            styles[size],
            styles[type],
          )
          .join(' ')}
      >
        <span className={styles.bottomLayer} />
        <span className={styles.topLayer}>{children}</span>
      </button>
    </>
  );
}
