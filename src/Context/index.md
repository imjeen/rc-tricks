# Context

[useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)

## 案例一

主题：包括暗黑等

```tsx
import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemeDemo from './ThemeDemo.tsx';

export default () => (
  <ThemeProvider>
    <ThemeDemo />
  </ThemeProvider>
);
```

## 案例二

过滤器：包含复杂的数据。

[useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)、[useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)

```tsx
import React from 'react';
import { FilterProvider } from './FilterContext';
import FilterDemo from './FilterDemo.tsx';

export default () => (
  <FilterProvider>
    <FilterDemo />
  </FilterProvider>
);
```
