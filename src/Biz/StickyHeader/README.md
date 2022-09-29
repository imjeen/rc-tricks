# StickyHeader

可伸缩的粘性头部

## 默认设定

```tsx
import React from 'react';
import StickyHeader from './StickyHeader';

export default function App() {
  return (
    <>
      <StickyHeader
        header={({ unfold }) => (
          <div style={unfold}>
            <h2 style={{ margin: 0 }}>#1 生活的本质是什么?</h2>
          </div>
        )}
      >
        {({ fold }) => (
          <div style={fold}>
            <h2 style={{ margin: 0 }}>#2 朋友，你说说！</h2>
          </div>
        )}
      </StickyHeader>

      {Array(5)
        .fill(0)
        .map((_, index) => (
          <section
            style={{
              minHeight: '300px',
              fontSize: '80px',
              textAlign: 'center',
              color: '#fff',
              backgroundColor: 'gray',
              marginBottom: '5px',
            }}
            key={index}
          >
            {index}
          </section>
        ))}
    </>
  );
}
```

## 高级设定

```tsx
import React from 'react';
import DemoStickyHeader from './DemoStickyHeader';

export default function App() {
  return (
    <>
      <DemoStickyHeader />
    </>
  );
}
```
