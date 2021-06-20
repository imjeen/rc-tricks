## hooks

## useState

> 状态变化，更新组件每次都会重新执行当前函数

- 💬 以下示例在 3s 内连续点击 N 次，数值不会累加到 +N，只会 +1。
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

> useRef 在每次重新渲染后都保持不变

## useEffect

## useEffect V.S. useLayoutEffect

## useMemo

## useCallback

## useReducer

## useContext

## useImperativeHandle、forwardRef

## Custom Hooks

## Hooks 原理
