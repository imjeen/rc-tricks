import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import styles from './styles.module.less';

export default function Editor({
  value = '',
  onChange,
}: {
  value: string;
  onChange?: (v: string) => void;
}) {
  const [content, setContent] = useState(value);

  const contentRef = useRef<HTMLDivElement>(null); // 引用目标元素
  const caretPos = useRef<number>(0); // 缓存光标位置

  useLayoutEffect(() => {
    setCaret(contentRef.current, caretPos.current);
    contentRef.current?.focus();
  }, [content]);

  const handleChange = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    caretPos.current = getCaret(contentRef.current) || 0; // 获取并保存光标

    const text = e.currentTarget.innerText;
    setContent(text);
    onChange && onChange(text);
  }, []);

  return (
    <>
      <div className={styles.editorWrap}>
        <div className={styles.placeholder}>{content ? '' : '占位字符'}</div>
        <div
          ref={contentRef}
          className={styles.editor}
          contentEditable
          suppressContentEditableWarning
          onInput={handleChange}
        >
          {content}
        </div>
      </div>
    </>
  );
}

/**
 * 获取光标位置
 *
 * @param {(HTMLDivElement | null)} el - 目标元素
 * @return {number}
 */
function getCaret(el: HTMLDivElement | null) {
  let caretAt = 0;
  const sel = window.getSelection();

  if (!el || !sel || sel.rangeCount == 0) {
    return caretAt;
  }

  const range = sel.getRangeAt(0);
  const preRange = range.cloneRange();
  preRange.selectNodeContents(el);
  preRange.setEnd(range.endContainer, range.endOffset);
  caretAt = preRange.toString().length;

  return caretAt;
}

/**
 * 设置光标位置
 *
 * @param {(HTMLDivElement | null)} el - 目标元素
 * @param {number} offset - 光标偏移量
 */
function setCaret(el: HTMLDivElement | null, offset: number) {
  let sel = window.getSelection();
  let range = document.createRange();

  if (!el || !sel) return;
  // 需考虑 el 值空的情况
  range.setStart(el.childNodes[0] || el, offset);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}
