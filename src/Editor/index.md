# ContentEditor

## ✅ 可编辑文本的组件 (Basic)

```tsx
import React, { useState } from 'react';
import ContentEditor from './ContentEditor';
export default function App() {
  const [text, setText] = useState('');
  return (
    <>
      <h5>
        简易的编辑器：将正在编辑的内容，缓存到 useRef
        中，组件重新渲染，其值不发生变化
      </h5>
      <ContentEditor value={text} onChange={setText} />
      <p>
        <i>实时编辑的内容：</i>
        {text}
      </p>
    </>
  );
}
```

## ✅ 可编辑文本的组件 (Advanced)

```tsx
import React, { useState } from 'react';
import { AdvancedEditor } from './ContentEditor';

export default function App() {
  const [text, setText] = useState(
    'Hello, I am a Container with a lot of interesting things inside.Finding the cursor must be hard, right?',
  );
  return (
    <>
      <h5>提示框 </h5>
      <AdvancedEditor
        value={text}
        onChange={setText}
        tips={<div className="tips"> Hey ✌️</div>}
      />

      <p>
        <i>实时编辑的内容：</i>
        <br />
        {text}
      </p>
    </>
  );
}
```

```tsx
import React, { useState } from 'react';
import { AdvancedEditor } from './ContentEditor';

export default function App() {
  const [text, setText] = useState(
    'Hello, I am a Container with a lot of interesting things inside.Finding the cursor must be hard, right?',
  );
  return (
    <>
      <h5>模拟光标 (待完善) </h5>
      <style>{`
        .demo-caret{font-size: 30px;}
        .demo-caret [contentEditable]{caret-color:transparent;}
        .caret-blink{font-size: 30px;}
      `}</style>
      <div className="demo-caret">
        <AdvancedEditor
          key="caret"
          value={text}
          onChange={setText}
          tips={<div className="caret-blink"></div>}
        />
      </div>
      <p>
        <i>实时编辑的内容：</i>
        <br />
        {text}
      </p>
    </>
  );
}
```
