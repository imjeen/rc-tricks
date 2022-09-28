import React, { createContext, useContext, useState } from 'react';

// 值 context
const CounterContext = createContext<number | undefined>(undefined);
// 操作 context
const CounterDispatchContext = createContext<
  undefined | React.Dispatch<React.SetStateAction<number>>
>(undefined);

// provider
export default function CounterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  // 读/写 分离成两个context
  return (
    <>
      <CounterDispatchContext.Provider value={setCount}>
        <CounterContext.Provider value={count}>
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
