import React from 'react';

import styles from './styles.module.less';

const TABS = ['a', 'b', 'C', 'D', 'F', 'G'];
// TODO
export default function ScrollSnap() {
  return (
    <>
      <div>
        <header className={[styles.header, styles.scrollSnapX].join(' ')}>
          <nav className={[styles.nav].join(' ')}>
            {TABS.map((k) => (
              <a href={`#${k}`}>TAB {k}</a>
            ))}
          </nav>
          <span className={styles.indicator} />
        </header>
      </div>
    </>
  );
}
