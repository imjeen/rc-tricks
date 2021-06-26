# Void （错误示范）

### 🚧 可编辑文本的组件 （无法输入中文等非拉丁文字符）

```tsx
import React, { useState } from 'react';
import { CaretEditor } from './VoidEditor';
export default function App() {
  const [text, setText] = useState('');
  return (
    <>
      <h5>
        简易的编辑器：组件重新渲染，控制光标，使其恢复期望位置，但导致无非输入中文等字符
      </h5>
      <CaretEditor
        value={text}
        onChange={(v) => {
          setText(v);
        }}
      />
      <p>
        <i>实时编辑的内容：</i>
        {text}
      </p>
    </>
  );
}
```

```tsx
import React, { useState } from 'react';
import { CaretDemo } from './VoidEditor';
export default function App() {
  const [text, setText] = useState('');
  const [testText, setTestText] = useState('编辑文案～');
  return (
    <>
      <h2></h2>
      <CaretDemo
        value={text}
        onChange={(v) => {
          setText(v);
        }}
      />
    </>
  );
}
```

### 🚧 组件是否不重新渲染

```tsx
import React, { useState } from 'react';
import { CaretDemo, CaretTest } from './VoidEditor';
export default function App() {
  const [text, setText] = useState('');
  const [testText, setTestText] = useState('编辑文案～');
  return (
    <>
      <h5>组件重新渲染，光标被重置为行首</h5>
      <CaretDemo
        value={text}
        onChange={(v) => {
          setText(v);
        }}
      />

      <h5>组件不重新渲染 (实际场景中很少存在这样的组件)</h5>
      <CaretTest />
    </>
  );
}
```

### 🚧 点击按钮获取组件内的数据 （组件不重新渲染）

```tsx
import React, { useState, useRef } from 'react';
import { CaretForwardRef } from './VoidEditor';

export default function App() {
  const [text, setText] = useState('');
  const contentRef = useRef(null);
  const getText = () => {
    const value = contentRef.current?.getValue?.() || '';
    setText(value);
  };
  return (
    <>
      <h5>组件不重新渲染。实际中不存在这样的组件</h5>
      <CaretForwardRef value={'test text'} ref={contentRef} />
      <button onClick={getText}>获取文本</button>
      <div>{text}</div>
    </>
  );
}
```
