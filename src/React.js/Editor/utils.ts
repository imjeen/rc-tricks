/**
 * 获取光标的偏离量坐标
 *
 * @see https://gist.github.com/nothingismagick/642861242050c1d5f3f1cfa7bcd2b3fd
 */
export function getCaretCoordinates() {
  const sel = document.getSelection();
  if (!sel || !sel.rangeCount) return { x: 0, y: 0 };
  const r = sel.getRangeAt(0);
  let rect, r2;
  const node = r.startContainer as HTMLElement;
  const offset = r.startOffset;
  if (offset > 0) {
    // new range, don't influence DOM state
    r2 = document.createRange();
    r2.setStart(node, offset - 1);
    r2.setEnd(node, offset);
    rect = r2.getBoundingClientRect();
    return { x: rect.right, y: rect.top };
  } else if (offset < (node.textContent || '').length) {
    // 非空在行首的情况
    r2 = document.createRange();
    // similar but select next on letter
    r2.setStart(node, offset);
    r2.setEnd(node, offset + 1);
    rect = r2.getBoundingClientRect();
    return { x: rect.left, y: rect.top };
  } else {
    // 为空的情况
    rect = node.getBoundingClientRect();
    const { paddingTop, paddingLeft } = window.getComputedStyle(node);
    return {
      x: rect.left + parseInt(paddingLeft),
      y: rect.top + parseInt(paddingTop),
    };
  }
}

/**
 * 获取光标位置
 *
 * @param {(HTMLDivElement | null)} el - 目标元素
 */
export function getCaret(el: HTMLDivElement | null) {
  let caretAt = 0;
  const selection = window.getSelection();

  if (!el || !selection || selection.rangeCount == 0) {
    return caretAt;
  }

  const range = selection.getRangeAt(0);
  const preRange = range.cloneRange();
  preRange.selectNodeContents(el);
  preRange.setEnd(range.endContainer, range.endOffset);
  caretAt = preRange.toString().length;

  return caretAt;
}

/**
 * 设置光标位置
 *
 * @param {(HTMLDivElement | null)} el - 目标元素
 * @param {number} offset - 光标偏移量
 */
export function setCaret(el: HTMLDivElement | null, offset: number) {
  let selection = window.getSelection();
  let range = document.createRange();

  if (!el || !selection) return;
  // 需考虑 el 值空的情况
  range.setStart(el.childNodes[0] || el, offset);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}
