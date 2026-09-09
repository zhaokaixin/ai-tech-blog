# 向量之间：AI 技术个人博客

这是一个为 GitHub Pages 准备的纯静态中文个人博客，不需要数据库、服务器或构建工具。

## 本地预览

直接双击 `index.html` 即可预览。也可以在当前目录运行：

```bash
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 部署到 GitHub Pages

1. 在 GitHub 新建一个公开仓库，例如 `ai-tech-blog`。
2. 把本目录下的所有文件上传或推送到仓库的 `main` 分支。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 中选择 **Deploy from a branch**。
5. Branch 选择 `main`，目录选择 `/(root)`，点击 **Save**。
6. 稍等一两分钟后，站点会发布到 `https://你的用户名.github.io/ai-tech-blog/`。

如果希望博客直接显示在 `https://你的用户名.github.io/`，仓库名应设为 `你的用户名.github.io`。

## 修改内容

- 站点名称、作者资料和导航：编辑 `index.html`。
- 文章、分类和正文：编辑 `assets/app.js` 中的 `articles` 数组。
- 配色、字体和布局：编辑 `assets/styles.css`。
- GitHub 与邮箱链接：在 `index.html` 搜索 `github.com` 和 `hello@example.com` 后替换。

每篇文章需要唯一的 `slug`。正文 `content` 支持普通 HTML，例如 `<p>`、`<h2>`、`<ul>` 和 `<pre><code>`。

## 目录结构

```text
ai-tech-blog/
├── index.html
├── README.md
├── .nojekyll
└── assets/
    ├── app.js
    ├── favicon.svg
    └── styles.css
```

## 自定义域名（可选）

在仓库的 Pages 设置中填写域名，并在域名服务商处添加 GitHub Pages 要求的 DNS 记录。也可以在项目根目录新建 `CNAME` 文件，文件内容只写域名，例如 `blog.example.com`。
