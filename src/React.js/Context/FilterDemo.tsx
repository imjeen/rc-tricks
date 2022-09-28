import React, { useContext } from 'react';
import { FilterContext } from './FilterContext';

export default function FilterDemo() {
  const [filter, setFilter] = useContext(FilterContext);

  const onToggleEdit = () => setFilter({ editing: !filter.editing });
  return (
    <>
      <span onClick={onToggleEdit}>
        <strong>editing: </strong>{' '}
        {filter.editing ? '🔴 编辑模式' : '🟢 预览模式'}
        (🏈 Click Me!)
      </span>
    </>
  );
}
