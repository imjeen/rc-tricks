/**
 * 获取光标的偏离量坐标
 *
 */
export function getCaretCoordinates() {
  let x = 0,
    y = 0;
  const selection = window.getSelection();

  // Check if there is a selection (i.e. cursor in place)
  if (selection && selection.rangeCount !== 0) {
    // Clone the range
    const range = selection.getRangeAt(0).cloneRange();
    // Collapse the range to the start, so there are not multiple chars selected
    range.collapse(true);
    // getClientRects returns all the positioning information we need
    const rect =
      range.getClientRects()[0] ||
      (range.endContainer as HTMLElement)?.getClientRects()[0]; //fix: blank line

    // fix: empty with padding
    let top = 0,
      left = 0;
    if (
      !range.getClientRects()[0] &&
      !(range.endContainer as HTMLElement)?.lastChild
    ) {
      const { paddingTop, paddingLeft } = window.getComputedStyle(
        range.endContainer as HTMLElement,
      );
      top = parseFloat(paddingTop);
      left = parseFloat(paddingLeft);
    }

    if (rect) {
      x = rect.left + top;
      y = rect.top + left;
    }
  }
  // console.log(`x, y`, x, y);
  return { x, y };
}

/**
 * 获取光标位置
 *
 * @param {(HTMLDivElement | null)} el - 目标元素
 */
export function getCaret(el: HTMLDivElement | null) {
  let caretAt = 0;
  const sel = window.getSelection();

  if (!el || !sel || sel.rangeCount == 0) {
    return caretAt;
  }

  const range = sel.getRangeAt(0);
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
  let sel = window.getSelection();
  let range = document.createRange();

  if (!el || !sel) return;
  // 需考虑 el 值空的情况
  range.setStart(el.childNodes[0] || el, offset);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}
