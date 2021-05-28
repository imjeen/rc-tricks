## Modal

Basic Example

```tsx
import React, { useState } from 'react';
// import { Modal } from 'rc-tricks';
import Modal, { useModal } from './';

export default function DemoModal() {
  const [visible, setVisible] = useState(false);
  const options = useModal();
  return (
    <>
      <button onClick={() => options.onToggle()}>Modal</button>
      <Modal {...options}>Hi, I'm a Modal!</Modal>
    </>
  );
}
```
