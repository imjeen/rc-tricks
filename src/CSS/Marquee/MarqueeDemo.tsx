import React from 'react';
import styles from './demo.styles.module.less';

import { boys, girls } from './MockData';

export default function MarqueeDemo() {
  return (
    <article className={[styles.marqueeDemo].join(' ')}>
      <Marquee list={boys} />
      <br />
      <Marquee list={girls} reversed />
    </article>
  );
}

function Marquee({ list, reversed }: { list: string[]; reversed?: boolean }) {
  return (
    <>
      <div
        className={[styles.marquee, reversed ? styles.reversed : ''].join(' ')}
      >
        <div className={styles.group}>
          {list.map((url) => (
            <figure>
              <img src={url} alt="" />
            </figure>
          ))}
        </div>
        {/* Mirrors the content above */}
        <div className={styles.group} aria-hidden="true">
          {list.map((url) => (
            <figure>
              <img src={url} alt="" />
            </figure>
          ))}
        </div>
      </div>
    </>
  );
}
