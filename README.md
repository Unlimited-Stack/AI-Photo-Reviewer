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

3. **启动开发服务**
   ```bash
   npm run dev
   ```
   - 此命令会并行启动：
     - **Web** (Next.js 16) → http://localhost:3000
   - **Native** (Expo Web Preview) → http://localhost:8080
     - **UI Package** (tsup watch) → 自动编译

### 三种应用预览方式

#### 方式 1: Web 端预览（推荐用于快速调试）
1. `npm run dev` 启动后，访问 http://localhost:3000
2. 在浏览器中看到完整的 Web 界面与 5 个 Tab

#### 方式 2: Expo Web 预览（测试移动端 UI）
1. `npm run dev` 启动后，访问 http://localhost:8080
2. 在浏览器的 Expo Web 模拟器中查看 React Native 组件渲染效果
3. 修改代码自动热更新

#### 方式 3: 真实移动设备预览（需要校园网/手机热点）
1. 运行（替代 `npm run dev`）：
   ```bash
   npm run dev:mobile
   ```
   - 或直接进 native 目录：
   ```bash
   cd apps/native && npm run dev:tunnel
   ```

2. 等待终端显示二维码（Expo Tunnel 公网地址）

3. 安装 **Expo Go** App（iOS App Store 或 Android Google Play）

4. 扫码进入，实时预览原生 5 Tab 界面
   - 支持热更新（修改代码自动同步到手机）
npm install
   
提示：端口策略已固定为 Web=3000、Native(Web/Tunnel)=8080。之前为了避免与 Expo Web Preview (8080) 的冲突，脚本曾改用 8082，但实际上你不需要多个并行运行，所以端口已改回 8080。Expo 在启动时会询问占用情况，如果你同时用 `npm run dev`，会提示是否切换端口——那就是为什么它“老是改为 8081”，因为 Metro 检测到 8080 被占用了。现在只要不要同时启动两个实例即可保持使用 8080。容器不会自动启动开发服务；启动请手动运行 `npm run dev`（Web）或 `npm run dev:mobile`（移动真机）。