import React from 'react';
import styles from './styles.module.less';

export default function ScrollIndicator() {
  return (
    <div className={styles.scrollIndicator}>
      <div className={styles.mouse}>
        <div className={styles.wheel}></div>
      </div>
      <div className={styles.text}>Scroll</div>
    </div>
  );
}
