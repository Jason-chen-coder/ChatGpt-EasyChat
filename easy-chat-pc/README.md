# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```
easy-chat-pc/
├── public/                 # 公共资源文件夹
│   ├── index.html          # 入口 HTML 文件
│   ├── favicon.ico         # 网站图标
├── src/                    # 源代码文件夹
│   ├── components/         # 可复用的 UI 组件
│   ├── pages/              # 页面组件
│   ├── styles/             # 样式文件（CSS、Sass、Less 等）
│   ├── utils/              # 工具函数
│   ├── App.js              # 主应用组件
│   ├── index.js            # 入口文件
├── package.json            # 项目配置文件
├── README.md               # 项目文档
├── .gitignore              # Git 忽略文件配置
├── .babelrc                # Babel 配置文件
├── .eslintrc               # ESLint 配置文件
├── .prettierrc             # Prettier 配置文件

```
