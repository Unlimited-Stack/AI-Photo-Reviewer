FROM mcr.microsoft.com/devcontainers/javascript-node:20

# 安装常用工具和 Expo 开发所需的依赖
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y \
    git \
    curl \
    wget \
    android-tools-adb \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 全局安装 expo-cli 和 eas-cli
RUN npm install -g expo-cli eas-cli npm-check-updates
