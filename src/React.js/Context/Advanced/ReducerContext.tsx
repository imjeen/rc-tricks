import React, { createContext, useContext, useReducer } from 'react';

// 计数示例

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

// 值 context
const CounterContext = createContext<number | undefined>(undefined);
// 操作 context
const CounterDispatchContext = createContext<
  undefined | React.Dispatch<CounterActionTypes>
>(undefined);

// provider
export default function CounterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store, dispatch] = useReducer(reducer, 0);
  // 读/写 分离成两个context
  return (
    <>
      <CounterDispatchContext.Provider value={dispatch}>
        <CounterContext.Provider value={store}>
          {children}
        </CounterContext.Provider>
      </CounterDispatchContext.Provider>
    </>
  );
}

// 操作 hooks
export function useCountDispatch() {
  const context = useContext(CounterDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useCountDispatch must be in CounterDispatchContext.Provider ',
    );
  }

  return context;
}
// 值 hooks
export function useCount() {
  const context = useContext(CounterContext);

  if (context === undefined) {
    throw new Error('useCount must be in CounterContext.Provider ');
  }

  return context;
}
