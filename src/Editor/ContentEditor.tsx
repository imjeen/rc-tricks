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
 * @param {object} - props
 * @param {string} props.value - 值
 * @param {(v: string) => void} props.onChange - 变化时的回调方法
 *
 */
export function AdvancedEditor({
  value = '',
  onChange,
  tips,
}: {
  value: string;
  onChange?: (v: string) => void;
  tips?: React.ReactNode;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [position, setPosition] = useState(getCaretCoordinates());
  // const position = getCaretCoordinates();
  const [content, setContent] = useState(value);
  const contentRef = useRef(value); // 缓存正在编辑内容，重新渲染时不会被改变

  useOutside(nodeRef.current, (outside) => {
    !outside && setPosition(getCaretCoordinates());
    setTooltipVisible(!outside);
  });

  useLayoutEffect(() => {
    tooltipVisible && setPosition(getCaretCoordinates());
  }, [content, tooltipVisible]);

  // TODO
  useLayoutEffect(() => {
    function handler(e: KeyboardEvent) {
      // console.log(e);
      if (!nodeRef.current?.contains(e.target as HTMLElement | null)) return;
      const isArrowKey = [
        'ArrowRight',
        'ArrowLeft',
        'ArrowUp',
        'ArrowDown',
      ].includes(e.code);

      if (!isArrowKey) return;
      setPosition(getCaretCoordinates());
    }
    document.addEventListener('keyup', handler);
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keyup', handler);
      document.removeEventListener('keydown', handler);
    };
  }, []);

  const handleChange = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    setContent(text);
    onChange && onChange(text);
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
          onFocus={() => setTooltipVisible(true)}
          onBlur={() => setTooltipVisible(false)}
        />
      </div>

      {(isDebug || tooltipVisible) &&
        createPortal(
          <>
            <span
              className={styles.tooltip}
              style={{
                left: `${position.x + window.scrollX}px`,
                top: `${position.y + window.scrollY}px`,
              }}
            >
              {tips}
            </span>
          </>,
          document.body,
        )}
    </>
  );
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
