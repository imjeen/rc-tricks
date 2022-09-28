# Modal

[React: Portals](https://reactjs.org/docs/portals.html)

## 方式一

```tsx
import React, { useState } from 'react';
// import { Modal } from 'rc-tricks';
import Modal, { useModal } from './';

export default function DemoModal() {
  const config = useModal();
  return (
    <>
      <button onClick={() => config.onToggle()}>
        Click me to open a Modal!
      </button>
      <Modal {...config}>Hi, I'm a Modal!</Modal>
    </>
  );
}
```

## 方式二

[useImperativeHandle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)、[forwardRef](https://reactjs.org/docs/react-api.html#reactforwardref)

```tsx
import React, { useRef } from 'react';
import Modal2 from './Modal2';

export default function DemoModal2() {
  const modalRef = useRef(null);

  const onShow = () => {
    modalRef.current?.onToggle();
  };

  return (
    <>
      <button onClick={onShow}>Click me to open a Modal!</button>
      <Modal2 ref={modalRef}>Hi, I'm a Modal2!</Modal2>
    </>
  );
}
```
