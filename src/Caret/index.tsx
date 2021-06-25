import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import styles from './styles.module.less';

export default function Caret({
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

export const CaretTest1 = forwardRef(function Test(
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
