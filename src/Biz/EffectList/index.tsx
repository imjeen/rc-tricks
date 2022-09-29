import React, { useState } from 'react';

import MockData from './MockData';

import styles from './styles.module.less';

export default function EffectList() {
  return (
    <section className={styles.materialList}>
      {MockData.map(({ before, after }, index) => (
        <MaterialSection
          {...{ url: before, thumbnail: after, index, length: MockData.length }}
          key={index}
        />
      ))}
    </section>
  );
}

function MaterialSection({
  url,
  thumbnail,
  index,
  length,
}: {
  url: string;
  thumbnail: string;
  index: number;
  length: number;
}) {
  const [touching, setTouching] = useState(false);

  const getHandlers = () => {
    return {
      onPointerDown: () => setTouching(true),
      onPointerOut: () => setTouching(false),
      onPointerUp: () => setTouching(false),
    };
  };

  return (
    <div className={styles.material}>
      {/* 原图 */}
      <div
        className={styles.origin}
        style={{ backgroundImage: `url(${url})` }}
      />
      {/* 效果图 */}
      <div
        className={styles.preview}
        style={{
          backgroundImage: `url(${thumbnail})`,
          visibility: touching ? 'hidden' : 'visible',
        }}
      />
      <div className={styles.layer}>
        <div
          className={styles.inner}
          style={
            touching
              ? {}
              : {
                  animationDelay: `${index * 3}s`,
                  animationDuration: `${length * 3}s`,
                }
          }
        >
          <div
            className={styles.image}
            style={
              touching
                ? {}
                : {
                    backgroundImage: `url(${url})`,
                    animationDelay: `${index * 3}s`,
                    animationDuration: `${length * 3}s`,
                  }
            }
          />
        </div>
      </div>
      <span className={styles.diffIcon} {...getHandlers()}>
        <i />
      </span>
    </div>
  );
}
