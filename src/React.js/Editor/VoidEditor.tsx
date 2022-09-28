import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import styles from './styles.module.less';

import { setCaret, getCaret } from './utils';

export function CaretEditor({
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

export function CaretDemo({
  value = '',
  onChange,
}: {
  value: string;
  onChange?: (v: string) => void;
}) {
  const [content, setContent] = useState(value);
  const contentRef = useRef('');
  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    setContent(text);
    onChange && onChange(text);
  };
  return (
    <>
      <div className={styles.editorWrap}>
        <div className={styles.placeholder}>{content ? '' : '占位字符'}</div>
        <div
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

export function CaretTest({
  value = '',
  onChange,
}: {
  value: string;
  onChange?: (v: string) => void;
}) {
  const contentRef = useRef(value);
  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    contentRef.current = text;
    onChange && onChange(text); //
  };
  return (
    <>
      <div className={styles.editorWrap}>
        {/* <div className={styles.placeholder}>
          {contentRef.current ? '' : '占位字符'}
        </div> */}
        <div
          className={styles.editor}
          contentEditable
          suppressContentEditableWarning
          onInput={handleChange}
        >
          {contentRef.current}
        </div>
      </div>
    </>
  );
}

export const CaretForwardRef = forwardRef(function CaretForwardRef(
  { value = '' }: { value: string },
  ref: React.ForwardedRef<{ getValue: () => string }>,
) {
  const contentRef = useRef(value);
  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.innerText;
    contentRef.current = text;
  };

  useImperativeHandle(
    ref,
    () => ({
      getValue: () => contentRef.current,
    }),
    [],
  );
  return (
    <>
      <div className={styles.editorWrap}>
        {/* <div className={styles.placeholder}>
          {contentRef.current ? '' : '占位字符'}
        </div> */}
        <div
          className={styles.editor}
          contentEditable
          suppressContentEditableWarning
          onInput={handleChange}
        >
          {contentRef.current}
        </div>
      </div>
    </>
  );
});
