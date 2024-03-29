import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'rc-tricks',
  mode: 'site',
  // more config: https://d.umijs.org/config
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  base: '/rc-tricks/',
  publicPath: '/rc-tricks/',

  // 加快启动时间， 参考：https://github.com/umijs/umi/issues/6766
  mfsu: {},
});
