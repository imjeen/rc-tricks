import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import styles from './styles.module.less';

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
        <div className={styles.placeholder}>{content ? '' : '占位字符'}</div>
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
