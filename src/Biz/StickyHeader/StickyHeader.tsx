import React, { useEffect, useMemo, useRef, useState } from 'react';

import styles from './styles.module.less';

import { debounce, hasSupportSticky } from './utils';

export default function StickyHeader({
  rangeColor = ['#9483FC', '#9483FC'],
  backgroundStyle = {},
  header,
  children,
  className,
}: {
  rangeColor?: [string, string];
  backgroundStyle?: Record<string, any>;
  className?: string;
  header?: (options: {
    offsetY: number;
    unfold: {
      transform: string;
      opacity: number;
      transformOrigin: string;
      transition: string;
    };
    fold: {
      transform: string;
      opacity: number;
      transformOrigin: string;
      transition: string;
    };
  }) => React.ReactNode;
  children?: (options: {
    offsetY: number;
    unfold: {
      transform: string;
      opacity: number;
      transformOrigin: string;
      transition: string;
    };
    fold: {
      transform: string;
      opacity: number;
      transformOrigin: string;
      transition: string;
    };
  }) => React.ReactNode;
}) {
  const isSticky = hasSupportSticky();

  const [config, setConfig] = useState({
    fixedOffsetTop: 0,
    offsetY: 0.0, // 顶部偏移出去的比例:  top / (最大高度 - 最小高度)
    result: {
      maxHeight: 0, // 最大高度
      minHeight: 0, // 最小高度
      viewHeight: 0, // 可视高度
      restHeight: 0, // 可视高度 - 最小高度
    },
    folded: false,
    debounceHandler: null,
    refNav: null,
    interacted: false, // 初始化后是否有交互操作
    scrollY: window.scrollY,
  });

  const navRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const _handlerScroll = (e: Event) => {
      const resultConfig = { ...config };

      // 用户滚动操作
      if (e && e.isTrusted && window.scrollY !== config.scrollY) {
        // !this.interacted && console.log(`not scrolling by user`, e);
        resultConfig.interacted = true;
      }
      // console.log(this.$el, this.refNav);
      if (!headerRef.current && !navRef.current) return;
      const { height: maxHeight, top } =
        headerRef.current?.getBoundingClientRect()!;
      const { height: minHeight, top: NavTop } =
        navRef.current?.getBoundingClientRect()!;

      const viewHeight = top >= 0 ? maxHeight : maxHeight - Math.abs(top);
      const restHeight = viewHeight - minHeight;

      resultConfig.result = Object.assign(config.result, {
        maxHeight,
        minHeight,
        viewHeight,
        restHeight,
      });

      const rangeHeight = maxHeight - minHeight;

      // this.offsetY = top >= 0 ? 0 : Number((Math.abs(top) / rangeHeight).toFixed(2));

      if (top <= -rangeHeight) {
        resultConfig.fixedOffsetTop = -rangeHeight;
        resultConfig.offsetY = 1;
      } else {
        config.fixedOffsetTop = 0;
        resultConfig.offsetY =
          top >= 0 ? 0 : Number((Math.abs(top) / rangeHeight).toFixed(2));
      }

      resultConfig.folded = NavTop <= 0;

      setConfig(() => resultConfig);
    };

    const handlerScroll = debounce(_handlerScroll, 10);

    const handleAction = () => {
      setConfig((preState) => ({ ...preState, interacted: true }));
    };

    window.addEventListener('scroll', handlerScroll, false);
    document.addEventListener('pointerdown', handleAction, false);

    // mounted: 自动触发事件，完成初始化
    window.dispatchEvent(new CustomEvent('scroll'));
    return () => {
      window.removeEventListener('scroll', handlerScroll, false);
      document.removeEventListener('pointerdown', handleAction, false);
    };
  }, []);

  // 背景色
  const background = useMemo(() => {
    const [startColor, endColor] = rangeColor;

    if (!startColor || !endColor) return '';

    if (startColor === endColor) return startColor;

    const { maxHeight, minHeight } = config.result;
    const innerPercent =
      (1 - 0.2 - Number((minHeight / maxHeight).toFixed(4))) * 100;

    return `
    linear-gradient(to bottom,
      ${startColor} 0%,
      ${startColor} ${innerPercent}%,
      ${startColor} ${innerPercent + (1 - config.offsetY) * 0}%,
      ${endColor} ${innerPercent + (1 - config.offsetY) * 100}%,
      ${endColor} 100%
    )
    `;
  }, [config, rangeColor]);

  //
  const top = useMemo(() => {
    const { minHeight, maxHeight } = config.result;
    return `${Math.round(minHeight - maxHeight)}px`;
  }, [config]);

  const slotStyle = useMemo(() => {
    const offsetY = config.offsetY;
    return {
      // 趋于展开的样式
      unfold: {
        transform: `translateY(${0 + 100 * offsetY}%)`,
        opacity: offsetY >= 0.5 ? 0 : 1 - offsetY,
        transformOrigin: 'bottom',
        transition: 'all 0.2s linear',
      },
      // 趋于收缩的样式
      fold: {
        transform: `translateY(-${100 - 100 * offsetY}%)`,
        opacity: offsetY < 0.5 ? 0 : offsetY,
        transformOrigin: 'top',
        transition: 'all 0.2s linear',
      },
    };
  }, [config]);

  return (
    <header
      className={[isSticky ? styles.header : styles.noSticky]
        .concat(className ?? [])
        .join(' ')}
      style={Object.assign({}, isSticky ? { top } : {})}
      ref={headerRef}
    >
      {!isSticky && <div className={styles.holder}></div>}
      <div
        className={[styles.wrap]
          .concat(!isSticky && config.fixedOffsetTop < 0 ? styles.fixed : [])
          .join(' ')}
        style={
          !isSticky
            ? {}
            : {
                top: `${config.fixedOffsetTop}px`,
                height: `${config.result.maxHeight}px`,
              }
        }
      >
        <section className={styles.extra} style={{ background }}>
          <div
            className={styles.bg}
            style={{ opacity: 1 - config.offsetY, ...backgroundStyle }}
          ></div>
          <div
            className={styles.content}
            style={{
              height: `${config.result.maxHeight - config.result.minHeight}px`,
            }}
          >
            {/* 头 */}
            {header?.({ ...slotStyle, offsetY: config.offsetY })}
          </div>
        </section>
        <nav
          className={[styles.nav]
            .concat([
              isSticky ? styles.sticky : [],
              !isSticky && config.result.restHeight < 1 ? styles.fixed : [],
            ])
            .join(' ')}
          ref={navRef}
        >
          <section
            style={{
              width: ' 100%',
              height: '100%',
            }}
          >
            {children?.({ ...slotStyle, offsetY: config.offsetY })}
          </section>
        </nav>
      </div>
    </header>
  );
}
