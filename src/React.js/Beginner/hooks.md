## hooks

## useState

> 状态变化，更新组件每次都会重新执行当前函数

- 💬 以下示例在 3s 内连续点击 N 次，数值不会 +N，只会 +1。
- 🌴 function component 组件每次更新都是重新执行当前函数，即 `setTimeout` 里（闭包）读取的 count 值，都是函数初始值。

```tsx
import React, { useState } from 'react';
export default function App() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setTimeout(() => {
      setCount(count + 1);
    }, 3000);
  };
  return <h1 onClick={increment}>点击：{count}</h1>;
}
```

## useRef

> useRef 在每次重新渲染后都保持不变，修改 `ref.current` 不会引发组件重新渲染。

- 💬 以下示例在 3s 内连续点击 N 次，数值会 +N
- 🌴 每次组件渲染， `ref.current` 保存之前的值。

```tsx
import React, { useState, useRef } from 'react';
export default function App() {
  const [count, setCount] = useState(0);
  const ref = useRef(0);
  const increment = () => {
    setTimeout(() => {
      setCount((ref.current += 1));
    }, 3000);
  };
  return <h1 onClick={increment}>点击：{count}</h1>;
}
```

## useEffect

> 在一定程度上可以充当 class 组件的 `componentDidMount`、`componentDidUpdate`、`componentWillUnmount` 这三个生命周期

```tsx
import React, { useState, useRef, useEffect } from 'react';
export default function App() {
  return (
    <>
      <OnceInit />
      <DigestEvent />
    </>
  );
}

// 仅执行一次的初始化
function OnceInit() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState('');
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current === true) {
      setText(`已被执行过 ${count} 次`);
      return;
    }
    setText(`第一次执行`);
    ref.current = true;
  }, [count]);
  return (
    <>
      <button onClick={() => setCount((pre) => pre + 1)}>按钮</button>
      {text}
    </>
  );
}

// 绑定/解绑事件 （消除副作用）
function DigestEvent() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    console.log(
      '第一次渲染结束执行，即组件元素已挂载完成 (类似: componentDidMount)',
    );

    const handleScroll = (e) => {
      console.log('scrolling');
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      // 组件卸载之前执行 (类似: componentWillUnmount)
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log('每次渲染结束都会执行 (类似: componentDidUpdate)');
  });

  useEffect(() => {
    console.log('只有在 count 变化后才会执行 (类似: componentDidUpdate)');
  }, [count]);
  return (
    <>
      <button onClick={() => setCount((pre) => pre + 1)}>按钮{count}</button>
      绑定/解绑事件
    </>
  );
}
```

## useEffect V.S. useLayoutEffect

## useMemo

## useCallback

## useReducer

## useContext

## useImperativeHandle、forwardRef

## Custom Hooks

## Hooks 原理
