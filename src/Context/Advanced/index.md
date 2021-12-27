# Advanced

[useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)

## State

### useState

计数

```tsx
import React from 'react';
import BaseProvider, { useCount, useCountDispatch } from './BaseContext';

function CounterDisplay() {
  const count = useCount();
  return <p>展示值：{count}</p>;
}

function CounterDispatch() {
  const setCount = useCountDispatch();
  const Increment = () => setCount((pre) => pre + 1);
  const Decrement = () => setCount((pre) => pre - 1);
  return (
    <>
      <span>操作：</span>
      &nbsp;
      <button onClick={Increment}>Increment (+1)</button>
      &nbsp;
      <button onClick={Decrement}>Decrement (-1)</button>
    </>
  );
}

export default () => (
  <BaseProvider>
    <CounterDisplay />
    <CounterDispatch />
  </BaseProvider>
);
```

## 提取 CreateContext 方法

计数

```tsx
import React from 'react';
import {
  CounterProvider,
  useCount,
  useIncrement,
  useDecrement,
} from './BaseDemo.tsx';

function CounterDisplay() {
  const count = useCount();
  return <p>展示值：{count}</p>;
}

function CounterDispatch() {
  const Increment = useIncrement();
  const Decrement = useDecrement();
  return (
    <>
      <span>操作：</span>
      &nbsp;
      <button onClick={Increment}>Increment (+1)</button>
      &nbsp;
      <button onClick={Decrement}>Decrement (-1)</button>
    </>
  );
}

export default () => (
  <CounterProvider>
    <CounterDisplay />
    <CounterDispatch />
  </CounterProvider>
);
```

## Reducer

### useReducer

计数

```tsx
import React from 'react';
import ReducerContext, { useCount, useCountDispatch } from './ReducerContext';

function CounterDisplay() {
  const count = useCount();
  return <p>展示值：{count}</p>;
}

function CounterDispatch() {
  const setCount = useCountDispatch();
  const Increment = () => setCount({ type: 'increment' });
  const Decrement = () => setCount({ type: 'decrement' });
  return (
    <>
      <span>操作：</span>
      &nbsp;
      <button onClick={Increment}>Increment (+1)</button>
      &nbsp;
      <button onClick={Decrement}>Decrement (-1)</button>
    </>
  );
}

export default () => (
  <ReducerContext>
    <CounterDisplay />
    <CounterDispatch />
  </ReducerContext>
);
```

### 提取 CreateReducerContext 方法

计数

```tsx
import React from 'react';
import {
  ReducerCounterProvider,
  useReducerCount,
  useIncrement,
  useDecrement,
} from './ReducerDemo.tsx';

function CounterDisplay() {
  const count = useReducerCount();
  return <p>展示值：{count}</p>;
}

function CounterDispatch() {
  const Increment = useIncrement();
  const Decrement = useDecrement();
  return (
    <>
      <span>操作：</span>
      &nbsp;
      <button onClick={Increment}>Increment (+1)</button>
      &nbsp;
      <button onClick={Decrement}>Decrement (-1)</button>
    </>
  );
}

export default () => (
  <ReducerCounterProvider>
    <CounterDisplay />
    <CounterDispatch />
  </ReducerCounterProvider>
);
```

## 参考

- [context + hooks = 真香](https://segmentfault.com/a/1190000041141083)
