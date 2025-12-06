# 个人博客（白皮书风格）

一个可静态部署的个人博客站，聚焦金融科普、FRM备考笔记与相关代码项目。支持 Markdown 解析、目录导航、搜索、Sitemap、SEO 优化。基于 React + TypeScript + Vite 构建，适合部署到 Nginx、GitHub Pages、Vercel 等静态托管。

## 快速开始

- 开发：`npm install && npm run dev`
- 构建：`npm run build`
- 预览：`npm run preview`

## 实时编辑与热更新（不重启）

- 启动开发服务：在项目根目录执行 `npm run dev`，打开终端提示的本地地址。
- 编辑内容：在 `content/` 目录新增或修改 `.md` 文件，保存后页面会自动热更新（HMR），无需重启服务。
- 文件命名与路由：文件名（不含扩展名）会作为 `slug`；分类路由支持中文，会自动 `encodeURIComponent`。
- Frontmatter：建议在 Markdown 顶部写入 `title`、`category`、`tags`、`date` 等元信息以便正确展示。

### 常用操作

- 新增文章：在 `content/` 里新增 `*.md`，保存后立即出现在首页与分类页。
- 修改文章：直接编辑并保存，浏览器自动刷新到最新内容。
- 重命名 `slug`：修改文件名即可，对应的文章详情地址同步变化。
- 分类与标签：在 Frontmatter 中设置 `category` 与 `tags`；分类与标签聚合自动完成。
- 热门标签：统一在 `src/services/blog.ts` 的 `getPopularTags()` 中配置，首页与分类页共用。

### Markdown支持

- 数学公式：支持 `$...$` 与 `$$...$$`（MathJax）。
- 列表与表格：列表按圆点/编号样式渲染；表格默认居中、带边框。

## 在哪里编辑 Markdown

支持两种内容来源方式：

- 方式 A（零配置，立即生效）：编辑 `src/services/blog.ts` 中的示例文章，将 `content` 字段替换为你的 Markdown 内容；保存后即时展示。
- 方式 B（推荐，独立 Markdown 文件）：在项目根目录创建或编辑 `content/` 目录下的 `.md` 文件，系统会自动加载并渲染。

### 推荐目录结构

```
content/
  hello-world.md
  react/
    getting-started.md
  css/
    modern-css-techniques.md
```

### Markdown 文件头部信息（Frontmatter）

每篇 `.md` 文件顶部可添加元信息，以便正确展示与分类：

```
---
title: 你好，博客
category: 随笔
tags: [博客, Markdown]
date: 2024-12-01
author: 你
coverImage: /public/icon.svg
---

# 你好，博客

正文内容……
```

- `title`：文章标题，若缺失则取文内第一个 `#` 标题
- `category`：分类名称，默认 `General`
- `tags`：标签数组，可用于搜索与推荐
- `date`：发布日期（`YYYY-MM-DD`）
- `author`：作者名称
- `coverImage`：封面图片路径（可选）

### 路由说明

- 首页：`/`
- 文章详情：`/post/:slug`
- 分类页：`/category/:name`
- 关于页：`/about`
- Sitemap：`/sitemap.xml`

## 部署

- Nginx：将 `dist/` 目录部署到静态站点根目录，参考项目文档中的示例配置
- GitHub Pages：推送构建产物或使用自动化工作流
- Vercel：直接导入仓库即可部署

## 常见问题

- 没看到你新增的 Markdown？确认文件位于 `content/` 目录且扩展名为 `.md`；构建或开发模式会自动扫描并生效。
- 想立即验证？使用方式 A 直接编辑 `src/services/blog.ts` 的示例数据。

## 许可证

MIT

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  extends: [
    // other configs...
    // Enable lint rules for React
    reactX.configs['recommended-typescript'],
    // Enable lint rules for React DOM
    reactDom.configs.recommended,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
