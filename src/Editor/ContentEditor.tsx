import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.less';

import { getCaretCoordinates } from './utils';

/**
 * 基本的简易编辑器 （Basic Editor）
 *
 * @param {object} - props
 * @param {string} props.value - 值
 * @param {(v: string) => void} props.onChange - 变化时的回调方法
 *
 */
export default function ContentEditor({
  value = '',
  onChange,
}: {
  value: string;
  onChange?: (v: string) => void;
}) {
  const [content, setContent] = useState(value);
  const contentRef = useRef(value); // 缓存正在编辑内容，重新渲染时不会被改变

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    setContent(text);
    onChange && onChange(text);
  };

  return (
    <>
      <div className={styles.editorWrap}>
        <div className={styles.placeholder}>
          {content ? '' : '请输入文字......'}
        </div>
        <div
          className={styles.editor}
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: contentRef.current }}
          onInput={handleChange}
        />
      </div>
    </>
  );
}

/**
 * 较复杂的编辑器 （Advanced Editor）
 *
 * @param {{}} props
 * @param {string} props.value - 值
 * @param {(v: string) => void} props.onChange - 变化时的回调方法
 *
 */
export function AdvancedEditor({
  value = '',
  onChange,
  tooltips,
}: {
  value: string;
  onChange?: (v: string) => void;
  tooltips?: React.ReactNode;
}) {
  const nodeRef = useRef<HTMLDivElement>(null); // 可编辑元素的引用
  const [tooltipVisible, setTooltipVisible] = useState(false); // 是否展示 tooltips
  const [position, setPosition] = useState(getCaretCoordinates()); // tooltips 的（x,y）坐标

  const [content, setContent] = useState(value); // 编辑的实时文本内容
  const contentRef = useRef(value); // 正在编辑内容，重新渲染时不会被改变

  // 点击元素之外，隐藏 tooltips，之内时更新其实时坐标
  useOutside(nodeRef.current, (outside) => {
    !outside && setPosition(getCaretCoordinates());
    setTooltipVisible(!outside);
  });

  // 输入内容变化，实时更新 tooltips 坐标
  useLayoutEffect(() => {
    tooltipVisible && setPosition(getCaretCoordinates());
  }, [content, tooltipVisible]);

  // 方向键：更新 tooltips 坐标
  useHandleArrow(nodeRef.current, () => {
    setPosition(getCaretCoordinates());
  });

  const handleChange = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    setContent(text);
    onChange && onChange(text);
  }, []);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    const timer = window.setTimeout(() => {
      setTooltipVisible(true);
      clearTimeout(timer);
    }, 0);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    setTooltipVisible(false);
  }, []);

  const isDebug = false; // 调试使用

  return (
    <>
      <div className={styles.editorWrap}>
        <div className={styles.placeholder}>
          {content ? '' : '请输入文字......'}
        </div>
        <div
          ref={nodeRef}
          className={styles.editor}
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: contentRef.current }}
          onInput={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      {(isDebug || tooltipVisible) &&
        tooltips &&
        createPortal(
          <>
            <span
              className={styles.tooltip}
              style={{
                left: `${position.x + window.scrollX}px`,
                top: `${position.y + window.scrollY}px`,
              }}
            >
              {tooltips}
            </span>
          </>,
          document.body,
        )}
    </>
  );
}

/**
 * (hook) 处理方向按键钩子
 *
 * @param {(HTMLElement | null)} el - 所作用的目标元素
 * @param {() => void} handler - 处理的回调函数
 */
function useHandleArrow(el: HTMLElement | null, handler: () => void) {
  const handleArrow = useDebounce((e: KeyboardEvent) => {
    if (!el?.contains(e.target as HTMLElement | null)) return;
    // console.log(e);
    const isArrowKey = [
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown',
    ].includes(e.code);

    if (!isArrowKey) return;
    // core
    handler();
  }, 80);

  useLayoutEffect(() => {
    document.addEventListener('keydown', handleArrow);
    return () => {
      document.removeEventListener('keydown', handleArrow);
    };
  }, [el]);
}

/**
 * （hook）节流钩子
 *
 * @param {(v: any) => void} handler - 处理函数
 * @param {number} [delay=200] - 延迟的毫秒
 */
function useDebounce(handler: (v: any) => void, delay = 200) {
  const debounce = useRef(0);

  const memoizedCallback = useCallback(
    function (this: void, ...args: Parameters<typeof handler>) {
      clearTimeout(debounce.current);
      debounce.current = window.setTimeout(() => {
        handler.apply(this, args);
      }, delay);
    },
    [handler],
  );

  return memoizedCallback;
}

/**
 *  （hook）点击元素之外
 *
 * @param {(HTMLElement | null)} el
 * @param {(outside: boolean) => void} [callback]
 */
function useOutside(
  el: HTMLElement | null,
  callback?: (outside: boolean) => void,
) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const outside = !el?.contains(e.target as HTMLElement | null);
      callback && callback(outside);
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [el]);
}
