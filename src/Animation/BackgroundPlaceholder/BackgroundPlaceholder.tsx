import React from 'react';
import styles from './styles.module.less';

export default function BackgroundPlaceholder() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.bg}></div>
      </div>
      <h2>动画：background-position-y</h2>
      <div className={styles.loading2}></div>
    </>
  );
}
