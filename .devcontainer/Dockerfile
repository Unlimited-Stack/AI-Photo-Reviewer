FROM mcr.microsoft.com/devcontainers/base:alpine

# 安装常用工具与前端构建所需依赖（Alpine）
RUN apk add --no-cache \
    git \
    git-lfs \
    curl \
    wget \
    lsof \
    psmisc \
    nodejs \
    npm \
    android-tools \
    && git lfs install --system

# 全局安装 Expo / EAS / 工具
RUN npm install -g expo-cli eas-cli npm-check-updates
