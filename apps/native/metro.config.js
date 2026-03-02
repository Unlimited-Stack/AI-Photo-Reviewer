const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// 找到 native 项目目录和 Monorepo 根目录
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. 监控 Monorepo 根目录，使得 UI 包和全局 node_modules 能被识别
config.watchFolders = [workspaceRoot];

// 2. 让 Metro 优先在 native 目录下找依赖，找不到再去根目录找
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. 确保 Expo Router 在 Monorepo 中正常工作
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
