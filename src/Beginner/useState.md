# useState

### 基础 Hook

```ts
const [state, setState] = useState(initialState);
```

### 惰性初始 state

首次渲染的初始值，需要通过复杂计算获得

```ts
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

### state 更新

调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。

React 使用 [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#description) 比较算法 来比较 state。（Object.is 不会强制转换两边的值；同一对象引用比较结果是 true）

##### 基本的数据更新

```ts
setState(newState);
```

##### 复杂数据更新 （Array、Object 等）

由于 React 使用 `Object.is()` 方法判断两个值是否相等，对应同一对象引用，是相等的。以下需返回一个新的对象引用。

```ts
/* 回调更新对象 */
setState((prevState) => {
  // 也可以使用 Object.assign
  return { ...prevState, ...updatedValues };
});

/* 回调更新数组 */
setState((prevState) => {
  // 更该数组，比如：prevState[0] = 1;

  //注意返回的是新数组
  return prevState.concat();
});
```

`useReducer` 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。
