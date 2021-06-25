# Caret

## ✅可编辑文本的组件

```tsx
import React, { useState } from 'react';
import ContentEditor from './ContentEditor';
export default function App() {
  const [text, setText] = useState('');
  return (
    <>
      <h3>简易的编辑器：将正在编辑的内容，缓存到 useRef 中，组件重新渲染，其值不发生变化</h3>
      <ContentEditor value={text} onChange={setText} />
      <p>
        <i>实时编辑的内容：</i>
        {text}
      </p>
    </>
  );
}
```

## 🚧可编辑文本的组件 （无法输入中文等非拉丁文字符）

```tsx
import React, { useState } from 'react';
import Editor from './Editor';
export default function App() {
  const [text, setText] = useState('');
  return (
    <>
      <h3>简易的编辑器：组件重新渲染，控制光标，使其恢复期望位置，但导致无非输入中文等字符</h3>
      <Editor
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
import Caret, { CaretTest, CaretTest1 } from './';
export default function App() {
  const [text, setText] = useState('');
  const [testText, setTestText] = useState('编辑文案～');
  return (
    <>
      <h2></h2>
      <Caret
        value={text}
        onChange={(v) => {
          setText(v);
        }}
      />
    </>
  );
}
```

## 🚧组件是否不重新渲染

```tsx
import React, { useState } from 'react';
import Caret, { CaretTest, CaretTest1 } from './';
export default function App() {
  const [text, setText] = useState('');
  const [testText, setTestText] = useState('编辑文案～');
  return (
    <>
      <h3>组件重新渲染，光标被重置为行首</h3>
      <Caret
        value={text}
        onChange={(v) => {
          setText(v);
        }}
      />

      <h3>组件不重新渲染 (实际场景中很少存在这样的组件)</h3>
      <CaretTest />
    </>
  );
}
```

## 🚧点击按钮获取组件内的数据 （组件不重新渲染）

```tsx
import React, { useState, useRef } from 'react';
import { CaretTest1 } from './';

export default function App() {
  const [text, setText] = useState('');
  const contentRef = useRef(null);
  const getText = () => {
    const value = contentRef.current?.getValue?.() || '';
    setText(value);
  };
  return (
    <>
      <h3>组件不重新渲染。实际中不存在这样的组件</h3>
      <CaretTest1 value={'test text'} ref={contentRef} />
      <button onClick={getText}>获取文本</button>
      <div>{text}</div>
    </>
  );
}
```
