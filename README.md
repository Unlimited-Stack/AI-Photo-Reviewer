# AI 相片锐评家 (AI Photo Reviewer) MVP 

本项目是一个基于大模型视觉能力的“相片智能锐评”应用。采用前沿的 `TypeScript + Next.js + Expo` (基于 Turborepo) 全栈架构，实现 Web 端与移动端 (iOS/Android) 的代码高度复用与多端同构部署。项目专为云原生环境（GitHub Codespaces）设计，无需配置本地 Xcode/Android Studio 即可完成极速跨端开发与真机调试。

## 🎯 核心玩法与产品形态 (MVP 阶段)

应用采用经典的“底部 5 Tab”导航结构，重点验证跨端 UI 渲染性能与 AI 数据流：

1. 💬 **消息/公告 (Tab 1)：** 静态 UI 展示区，用于未来承载系统通知和 AI 锐评完成的推送。
2. 🌊 **灵感瀑布流 (Tab 2)：** 类似小红书的双列图片信息流，展示社区内被公开的精彩相片及点评，重点验证跨端复杂列表的滚动性能。
3. ✨ **AI 锐评核心 (Tab 3 - 居中强视觉)：** 核心交互区。用户上传/拍摄相片，选择“锐评风格”（如：🔥毒舌吐槽、🌈彩虹屁、🧐专业摄影师），调用 AI 多模态大模型输出针对构图、光影、色彩的流式评价。
4. 🃏 **随机神评卡片 (Tab 4)：** 类似探探的卡片滑动或简单的 3-5 张卡片随机展示，验证动画特效与状态管理。
5. 👤 **我的主页 (Tab 5)：** 个人设置、历史锐评记录（本地/云端 Mock 数据）。

## 🛠 技术栈架构 (Turborepo Monorepo)

- **应用层 (`apps/`)**:
  - `apps/web`: 基于 Next.js 14+ (App Router)，负责 Web 端展示与统一的 API 路由（充当后端）。
  - `apps/native`: 基于 Expo (React Native)，负责 iOS/Android 真机渲染。
- **共享层 (`packages/`)**:
  - `packages/ui`: 多端共享的 UI 组件库。
  - `packages/eslint-config-custom`: 统一的代码规范。
- **开发环境**: Docker + GitHub Codespaces (内置 Node.js, Expo CLI, Ngrok 内网穿透)。

## 🚀 快速开始（云原生环境）

### 前置需求
- GitHub Codespaces 或本地 Docker + Dev Container
- （本地）VS Code + Dev Container Extension

### 初次启动流程

1. **打开 Dev Container**（Codespaces 自动，或本地需执行 `Dev Containers: Reopen in Container`）
   - Dockerfile 会自动安装 Node.js、npm、Expo CLI、Git LFS 等工具

2. **安装依赖**
   ```bash
   npm install
   ```
   - 安装根目录、apps、packages 中所有工作区的依赖

3. **启动开发服务（Monorepo）**
   ```bash
   npm run dev
   ```
   - 此命令会并行启动：
     - **Web (Next.js)**: http://localhost:3000
     - **Native Metro (Expo)**: 默认端口 8080（若冲突会自动切到 8081）
     - **UI Package (tsup watch)**: 自动编译共享组件

### 三种预览方式（建议按目的选择）

#### 方式 1: Web 端业务页面（推荐）
1. 运行 `npm run dev`
2. 访问 http://localhost:3000
3. 这里是 Next.js 的业务页面入口

#### 方式 2: Native 的浏览器预览（Expo Web）
1. 进入 Native 应用目录并启动：
   ```bash
   cd apps/native
   npm run web
   ```
2. 通过 Expo Web 预览 React Native 页面（使用 `app/` 路由）

#### 方式 3: 真机预览（Expo Tunnel）
1. 在仓库根目录运行：
   ```bash
   npm run dev:mobile
   ```
   - 若遇到缓存或路由异常，运行：
   ```bash
   npm run dev:mobile:clear
   ```
2. 终端出现二维码后，用 **Expo Go** 扫码进入
3. 默认进入业务 Tabs 页面（`app/index.tsx` 会重定向到 `/(tabs)`）

### 端口与入口说明（避免误判）
- `3000` 是 **Web 业务页面入口**（Next.js）。
- `8080/8081` 是 Expo 开发服务端口（Metro/Expo Web）。  
  访问到哪个页面取决于启动模式，不应将其等同于 Next.js 的 Web 业务入口。
- 当 `8080` 被占用时，Expo 自动切到 `8081` 属正常行为，不代表路由配置失败。
