# Creative Resume & Portfolio

中英文简历与工程作品集模板。包含固定两页 A4 简历、PDF 导出、独立个人主页、项目详情弹窗、项目分类筛选、日夜主题及同页语言切换。

所有姓名、单位、履历、联系方式和项目均为虚构示例。头像、标志和项目图为通用 SVG 占位素材，不包含原作者个人照片、研究截图或服务器配置。

## 本地运行

使用 Node.js 22.12+ 或 Node.js 24 LTS。

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

终端会给出本地地址，默认端口为 5173。

| 页面 | 路径 |
| --- | --- |
| 中文简历 | `/` |
| English resume | `/en/` |
| 中文个人主页 | `/portfolio/` |
| English portfolio | `/en/portfolio/` |

## 修改内容

| 内容 | 编辑文件 |
| --- | --- |
| 中文简历 | `src/resume-data.js` |
| 英文简历 | `src/en-resume-data.js` |
| 中文主页和项目详情 | `public/portfolio/portfolio-content.js` |
| 英文主页和项目详情 | `public/en/portfolio/portfolio-content.js` |
| 简历排版 | `src/styles.css` |
| 主页样式 | `public/portfolio/portfolio.css` 与英文目录中的同名文件 |
| 通用图片 | `public/assets/` |

两个语言版本分别编辑，不会自动翻译。当前图片路径与链接按站点根目录部署设计。GitHub 示例链接也出现在两个 `portfolio.js` 中，发布自己的版本时一并替换。

开发环境修改源码会自动更新。生产环境必须重新构建并重新部署整个 `dist/`，仅修改服务器上的 `src/resume-data.js` 不会更新已经构建的页面。

```sh
npm run build
npm run preview -- --host 127.0.0.1
```

将 `dist/` 作为静态网站根目录发布。个人主页的数据模块属于公开资源，不可填写 API 密钥、密码或其他保密信息。静态托管的 JS 缓存可能导致旧内容继续显示；部署时更新资源缓存策略或内容版本参数。

## PDF 与排版

点击“导出 PDF”或“Export PDF”生成两页 A4 PDF。导出只包含 `.pdf-page`，操作按钮不进入文件；浏览器打印另有打印样式。简历保留桌面固定版面，手机可以横向查看，个人主页支持响应式布局。

增删经历或改写长段落后，分别检查中英文两页内容是否超出页边界，并实际导出 PDF。当前 PDF 采用画布截图，正文不是可选择文本；需要 ATS 文本识别时另备文字版本。

## 发布前检查

查看 `SANITIZATION.md`。本仓库不含生产 Nginx、SSH、Jupyter、FRP、域名备案配置或历史备份，部署这些服务需按自己的环境配置。

## English Quick Start

Run `npm ci` and `npm run dev`. Edit the four content modules listed above. Build with `npm run build` and deploy `dist/` at the website root. Both languages are maintained independently. All sample biographies and projects are fictional; replace them with your own verified information. PDF export produces two image-based A4 pages; check overflow after editing.

MIT licensed. Third-party libraries retain their own licenses.
