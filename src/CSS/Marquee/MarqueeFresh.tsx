import React from 'react';
import styles from './fresh.styles.module.less';

export default function MarqueeFresh({ debug }: { debug?: boolean }) {
  return (
    <div className={[styles.marqueeWrap, debug ? styles.debug : ''].join(' ')}>
      <div className={styles.marquee}>
        <ul className={styles.group}>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        {/* Mirrors the content above */}
        <ul className={styles.group} aria-hidden="true">
          <li>Item 1（副本）</li>
          <li>Item 2（副本）</li>
          <li>Item 3（副本）</li>
        </ul>
      </div>
    </div>
  );
}
