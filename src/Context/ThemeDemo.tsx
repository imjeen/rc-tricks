import React, { useContext } from 'react';
import { ThemeContent } from './ThemeContext';

export default function ThemeDemo() {
  const [theme, setTheme] = useContext(ThemeContent);

  const onToggleDark = () => setTheme({ dark: !theme.dark });
  return (
    <>
      <span onClick={onToggleDark}>
        <strong>Dark Mode: </strong> {theme.dark ? '☀ off' : '🌒 on'} (🏈 Click
        Me!)
      </span>
    </>
  );
}
