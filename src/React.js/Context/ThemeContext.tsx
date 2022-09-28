import React, { useState, createContext } from 'react';

const defaultTheme = {
  dark:
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches,
};

// 类型
type TYPE_THEME = [
  typeof defaultTheme, // 数据
  (v: Partial<typeof defaultTheme>) => void, // 更新方法
];

export const ThemeContent = createContext<TYPE_THEME>([defaultTheme, () => {}]);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TYPE_THEME>([
    defaultTheme,
    (value) => {
      // 仅更新数据部分
      setState((preState) => [{ ...preState[0], ...value }, preState[1]]);
    },
  ]);

  return (
    <ThemeContent.Provider value={state}>{children}</ThemeContent.Provider>
  );
}
