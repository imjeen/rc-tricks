import React, { useState } from 'react';
import styles from './styles.module.less';

export default function DiffEffect() {
  const [position, setPosition] = useState({
    width: '50%',
    left: `calc(50% - 18px)`,
  });

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setPosition((preState) => ({
      ...preState,
      width: `${value}%`,
      left: `calc(${value}% - 18px)`,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={[styles.img, styles.backgroundImg].join(' ')} />
      <div
        className={[styles.img, styles.foregroundImg].join(' ')}
        style={{ width: position.width }}
      />
      <input
        type="range"
        min={1}
        max={100}
        defaultValue={50}
        className={styles.slider}
        onInput={handleInput}
      />
      <div className={styles.sliderButton} style={{ left: position.left }} />
    </div>
  );
}
