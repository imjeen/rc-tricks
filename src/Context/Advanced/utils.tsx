import React, { createContext, useContext, useState, useReducer } from 'react';

/**
 * 创建读写的上下文
 *
 * @template T
 * @param {T} initialValue - 初始值
 */
export function CreateContext<T>(initialValue: T) {
  const stateContext = createContext<undefined | T>(undefined); // 读
  const dispatchContext =
    createContext<undefined | React.Dispatch<React.SetStateAction<T>>>(
      undefined,
    ); // 写

  // 组合
  function ContextProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState(initialValue);
    return (
      <>
        <dispatchContext.Provider value={setState}>
          <stateContext.Provider value={state}>
            {children}
          </stateContext.Provider>
        </dispatchContext.Provider>
      </>
    );
  }
  // 读 hooks
  function useStore() {
    const context = useContext(stateContext);
    if (context === undefined) {
      throw new Error('hook must be in stateContext');
    }
    return context;
  }
  // 写 hooks
  function useDispatch() {
    const context = useContext(dispatchContext);
    if (context === undefined) {
      throw new Error('hook must be in dispatchContext');
    }
    return context;
  }

  return [ContextProvider, useStore, useDispatch] as const;
}

/**
 * 创建读写的上下文 （reducer）
 *
 * @export
 * @template StateType
 * @template ActionType
 * @param {React.Reducer<StateType, ActionType>} reducer - 形如 (state, action) => newState 的 reducer
 * @param {StateType} initialValue - 初始值
 * @return {*}
 */
export function CreateReducerContext<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialValue: StateType,
) {
  const stateContext = createContext<undefined | StateType>(undefined); // 读
  const dispatchContext =
    createContext<undefined | React.Dispatch<ActionType>>(undefined); // 写

  // 组合
  function ContextProvider({ children }: { children: React.ReactNode }) {
    const [store, dispatch] = useReducer(reducer, initialValue);
    return (
      <>
        <dispatchContext.Provider value={dispatch}>
          <stateContext.Provider value={store}>
            {children}
          </stateContext.Provider>
        </dispatchContext.Provider>
      </>
    );
  }
  // 读 hooks
  function useStore() {
    const context = useContext(stateContext);
    if (context === undefined) {
      throw new Error('hook must be in stateContext');
    }
    return context;
  }
  // 写 hooks
  function useDispatch() {
    const context = useContext(dispatchContext);
    if (context === undefined) {
      throw new Error('hook must be in dispatchContext');
    }
    return context;
  }

  return [ContextProvider, useStore, useDispatch] as const;
}
