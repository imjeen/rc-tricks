import React from 'react';
import styles from './styles.module.less';

export default function ScrollDown() {
  return (
    <div className={styles.scrollDown}>
      <div className={styles.container}>
        <div className={styles.chevron}></div>
        <div className={styles.chevron}></div>
        <div className={styles.chevron}></div>
        <span className={styles.text}>Scroll down</span>
      </div>
    </div>
  );
}
