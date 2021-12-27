import React from 'react';

import { CreateContext, CreateReducerContext } from './utils';

type CounterActionTypes = { type: 'increment' } | { type: 'decrement' };

function reducer(state = 0, action: CounterActionTypes) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
}

const [ReducerCounterProvider, useReducerCount, useReducerCountDispatch] =
  CreateReducerContext(reducer, 0);

export { ReducerCounterProvider, useReducerCount, useReducerCountDispatch };

//-------------------------
// 再封装成 业务钩子

export function useIncrement() {
  const setCount = useReducerCountDispatch();
  return () => setCount({ type: 'increment' });
}

export function useDecrement() {
  const setCount = useReducerCountDispatch();
  return () => setCount({ type: 'decrement' });
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
