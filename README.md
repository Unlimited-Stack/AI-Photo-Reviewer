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

## 🚀 运行与真机预览方式 (云原生环境)

1. 在 Codespaces 中启动容器。
2. 运行 `npm install`。
3. 运行 `npm run dev` 启动 Turborepo。
4. **Web 预览：** 点击 Codespaces 提供的端口链接（默认 3000）直接在浏览器查看。
5. **App 真机预览：** 在 Codespaces 终端使用 `npx expo start --tunnel` 生成公网二维码，使用手机下载 **Expo Go** App 扫码，即可在物理真机（iOS/Android）上实时热更新预览原生的 5 Tab 界面与 AI 交互逻辑。