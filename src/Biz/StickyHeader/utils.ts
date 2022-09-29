/**
 * 防抖(debounce)
 *
 * @param {Function} fn - 目标函数
 * @param {number} delay - 延迟执行毫秒数
 * @return {*} {(this: any) => void}
 */
export function debounce(fn: (...e: any[]) => any, delay = 0) {
  let timer: number;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn.apply(null, args), delay);
  };
}

/**
 * 是否支持 Sticky 样式定位
 *
 */
export function hasSupportSticky() {
  const testNode = document.createElement('div');

  let support = true;

  const prefixList = ['', '-webkit-', '-moz-', '-ms-'];

  for (let i = 0; i < prefixList.length; i++) {
    const prefix = prefixList[i];
    try {
      testNode.style.position = prefix + 'sticky';
    } catch (e) {}

    if (testNode.style.position !== '') {
      support = true;
      break;
    }

    support = false;
  }

  return support;
}
