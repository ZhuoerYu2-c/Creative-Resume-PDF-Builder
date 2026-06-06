# Creative Resume PDF Builder

一个使用原生 JavaScript、Vite、html2canvas 与 jsPDF 构建的前端简历模板。  
它会把结构化简历数据渲染成两页固定版式，并支持在浏览器中直接导出 A4 PDF。

仓库中的默认内容是一份**完全虚构的艺术生演示简历**，姓名、院校、工作室、联系方式、经历、展览和奖项均为示例，不对应真实个人或机构。

## 适合谁使用

- 艺术设计、视觉传达、插画、摄影、策展等方向的学生
- 希望用前端代码管理简历内容的人
- 希望快速生成固定两页 PDF 简历的人
- 想学习“数据、渲染、样式分离”前端结构的初学者

## 功能特点

- 简历内容统一维护在一个数据文件中
- 自动渲染两页固定 A4 比例简历
- 支持头像、院校标识、工作室标识与项目内容
- 支持在浏览器中预览排版
- 使用 html2canvas + jsPDF 逐页导出 PDF
- 不依赖 React，代码结构轻量，适合教学与二次修改

## 项目结构

```text
.
├── index.html
├── package.json
├── public/
│   └── assets/
│       ├── art-avatar.svg       # 演示头像
│       ├── academy-mark.svg     # 演示院校标识
│       ├── studio-mark.svg      # 演示工作室标识
│       ├── culture-mark.svg     # 演示艺术中心标识
│       └── festival-mark.svg    # 演示艺术节标识
└── src/
    ├── main.js                  # 页面渲染与 PDF 导出逻辑
    ├── resume-data.js           # 简历全部内容，最常修改
    └── styles.css               # 页面视觉与两页布局
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动本地开发服务器

```bash
npm run dev -- --host 127.0.0.1
```

终端会显示访问地址，通常是：

```text
http://127.0.0.1:5173/
```

### 3. 构建静态文件

```bash
npm run build
```

构建结果会生成在：

```text
dist/
```

## 如何修改简历内容

绝大多数情况下，只需要编辑：

```text
src/resume-data.js
```

数据文件中的主要区域：

| 字段 | 用途 |
| --- | --- |
| `brand` | 顶部作品集与院校标识 |
| `profile` | 姓名、标题、头像、联系方式、简介 |
| `education` | 教育与工作坊经历 |
| `labs` | 创作方向 |
| `skills` | 视觉设计、插画与创作工具 |
| `labExperience` | 创作、出版与策展经历 |
| `companyExperience` | 实习与实践经历 |
| `projects` | 代表项目 |
| `patents` | 当前模板中用于展览记录 |
| `awards` | 荣誉与奖项 |

例如修改姓名与标题：

```js
profile: {
  name: "你的姓名",
  englishName: "Your Name",
  headline: "视觉传达设计 / 插画 / 品牌设计"
}
```

修改某段经历：

```js
{
  company: "工作室名称",
  role: "品牌视觉设计实习生",
  time: "2025.07 - 2025.10",
  bullets: [
    "描述你完成的设计工作。",
    "说明使用的方法、输出物和最终效果。"
  ]
}
```

## 如何替换头像和 Logo

将图片或 SVG 文件放入：

```text
public/assets/
```

然后在 `src/resume-data.js` 中填写以 `/assets/` 开头的路径：

```js
avatar: "/assets/my-avatar.jpg"
```

```js
logo: "/assets/my-school-logo.svg"
```

推荐：

- 头像使用竖版图片，建议比例接近 `230 × 240`
- Logo 优先使用透明背景 PNG 或 SVG
- 提交到公开仓库前，确认图片没有包含隐私信息或未经授权的品牌素材

## 如何调整视觉样式

编辑：

```text
src/styles.css
```

页面主要颜色集中在文件顶部：

```css
:root {
  --paper: #ffffff;
  --bg: #e9e6e2;
  --ink: #242229;
  --muted: #716a72;
  --line: #ddd6d5;
  --soft: #f7f3f0;
  --accent: #275b5a;
  --gold: #b64f45;
}
```

如果简历内容超过两页，建议优先删减文字，不要先缩小字号。可以按下面顺序处理：

1. 每段经历保留 2 至 3 条重点描述
2. 只保留最能代表个人能力的项目
3. 精简简介和创作方向
4. 最后再微调页面间距与字号

## 如何导出 PDF

启动项目并打开页面后，点击右上角：

```text
导出两页固定 PDF
```

导出逻辑：

1. 获取页面中的两个 `.pdf-page`
2. 使用 html2canvas 分别渲染为图片
3. 使用 jsPDF 按 A4 尺寸逐页写入
4. 下载 `艺术生视觉简历_两页固定版.pdf`

这种方式能够避免不同浏览器打印样式导致布局变化。

## 如何修改页面结构

编辑：

```text
src/main.js
```

主要函数：

- `renderHeader()`：顶部身份信息
- `renderEducation()`：教育背景
- `renderLabs()`：创作方向
- `renderSkills()`：专业技能
- `renderExperience()`：经历列表
- `renderProjects()`：项目作品
- `renderPatentsAwards()`：展览与荣誉
- `exportFixedPagesPdf()`：PDF 导出

如果只是替换个人简历内容，不建议修改这些渲染函数。

## 部署

该项目构建后是纯静态页面，可以部署到：

- GitHub Pages
- Vercel
- Netlify
- 任意静态文件服务器

部署前运行：

```bash
npm run build
```

## 隐私检查清单

公开自己的简历模板前，建议检查：

- 姓名、邮箱、电话、住址是否需要公开
- GitHub、作品集、社交平台链接是否属于本人
- 头像是否允许公开
- 院校、公司和客户 Logo 是否允许使用
- 项目描述中是否包含保密信息
- PDF 文件名中是否包含真实姓名
- Git 历史中是否曾经提交过敏感信息

本仓库的演示数据全部为虚构内容，可直接作为教学模板使用。

## License

MIT
