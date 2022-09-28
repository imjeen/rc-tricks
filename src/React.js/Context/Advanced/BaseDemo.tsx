import React from 'react';

import { CreateContext } from './utils';

const [CounterProvider, useCount, useCountDispatch] = CreateContext(0);

export { CounterProvider, useCount, useCountDispatch };

//-------------------------
// 再封装成 业务钩子

export function useIncrement() {
  const setCount = useCountDispatch();
  return () => setCount((pre) => pre + 1);
}

export function useDecrement() {
  const setCount = useCountDispatch();
  return () => setCount((pre) => pre - 1);
}

export function useAsyncIncrement() {
  const increment = useIncrement();

  return () =>
    new Promise((resolve) =>
      setTimeout(() => {
        increment();
        resolve(true);
      }, 1000),
    );
}
