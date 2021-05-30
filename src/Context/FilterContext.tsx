import React, { useEffect, useReducer, useMemo, createContext } from 'react';
import { $Values } from 'utility-types';

// 复杂的数据结构
const defaultValue = {
  editing: false,
  base64: '',
  thumbnail: '',
  palette: { id: '', name: '', colors: [] as string[] },
  imageOpacity: 0.5,
  blendMode: '',
  grayscaleType: '',
  colorInterpolationFilters: '',
};

type TYPE_FILTER = [
  typeof defaultValue,
  (payload: Partial<typeof defaultValue>) => void,
];

enum ACTION {
  change = 'Change',
  reset = 'Reset',
}

/**
 * reducer
 *
 * @param {TYPE_FILTER[0]} state - 数据
 * @param {{
 *     type: $Values<typeof ACTION>;
 *     payload: Partial<TYPE_FILTER[0]>;
 *   }} action - 操作类型和传递数据
 */
const reducer = (
  state: TYPE_FILTER[0],
  action: {
    type: $Values<typeof ACTION>;
    payload: Partial<TYPE_FILTER[0]>;
  },
) => {
  switch (action.type) {
    case ACTION.change:
      return { ...state, ...action.payload };
    case ACTION.reset:
      return { ...state, ...defaultValue };
    default:
      return state;
  }
};

export const FilterContext = createContext<TYPE_FILTER>([
  defaultValue,
  () => {},
]);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const {
    palette = { id: '', name: '', colors: [] },
    imageOpacity,
    blendMode,
    grayscaleType,
    colorInterpolationFilters,
  } = defaultValue; // 应从 store 层读取，这里忽略

  const base64 = ''; // 从 localStorage 读取缓存，这里忽略

  const initialData = {
    editing: false,
    base64,
    thumbnail: base64,
    palette,
    imageOpacity,
    blendMode,
    grayscaleType,
    colorInterpolationFilters,
  };

  // 使用 useReducer
  const [state, dispatch] = useReducer(reducer, initialData);
  const setState = (payload: Partial<TYPE_FILTER[0]>) =>
    dispatch({ type: ACTION.change, payload });

  // store 层数据变化，副作用到 context
  useEffect(() => {
    (async () => {
      const data = {
        base64,
        thumbnail: state.thumbnail,
        palette,
        imageOpacity,
        blendMode,
        grayscaleType,
        colorInterpolationFilters,
      };

      setState(data);
    })();
  }, [
    state.base64,
    state.thumbnail,
    base64,
    blendMode,
    colorInterpolationFilters,
    grayscaleType,
    imageOpacity,
    palette,
  ]);

  // 使用 useMemo 规避 context 消费的组件 再次render
  const contextValue = useMemo(() => {
    return [state, setState] as [typeof state, typeof setState];
  }, [state]);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}
